import * as fse from 'fs-extra';
import * as path from 'node:path';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { type InlineConfig, build, mergeConfig } from 'vite';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

const commonConfig: InlineConfig = {
	resolve: {
		alias: [
			{
				find: '@common',
				replacement: path.resolve(__dirname, '/packages/common'),
			},
			{
				find: '@components',
				replacement: path.resolve(__dirname, '/packages/components'),
			},
			{
				find: '@hooks',
				replacement: path.resolve(__dirname, '/packages/hooks'),
			},
			{
				find: '@typings',
				replacement: path.resolve(__dirname, '/public/typings'),
			},
		],
	},
	css: {
		preprocessorOptions: {
			/** 配置 scss 全局变量的引入方式 */
			scss: {
				additionalData: `@import "./packages/common/styles/variable";\n@import "./packages/common/styles/reset";`,
			},
		},
	},
	// 由于采用手动打包，所以禁止自动寻找 vite.config.ts 配置文件，避免打包失败
	configFile: false,
	build: {
		sourcemap: false,
		rollupOptions: {
			external: ['vue'],
			output: {
				// 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
				globals: {
					vue: 'Vue',
				},
				assetFileNames(chunkInfo: any) {
					if (chunkInfo.name === 'style.css') {
						return `index.css`;
					}
					return chunkInfo.name;
				},
				exports: 'named',
			},
		},
	},
};

async function buildAllComponents() {
	return new Promise(async (resolve, reject) => {
		const buildOptions = mergeConfig(commonConfig, {
			plugins: [vueJsx()],
			publicDir: 'public',
			build: {
				emptyOutDir: true,
				outDir: 'dist',
				lib: {
					entry: path.resolve(__dirname, '../packages/components/main.ts'),
					name: 'Vue3UI',
					fileName: 'index',
				},
			},
		} as InlineConfig);

		try {
			await build(buildOptions);
			resolve(undefined);
		} catch (error) {
			reject(error);
		}
	});
}

async function buildEachComponent() {
	const componentPath = path.resolve(__dirname, '../packages/components');
	let components = (
		await fse.readdir(componentPath, { withFileTypes: true })
	).filter((v) => v.isDirectory());
	const tasks: Promise<any>[] = [];

	const buildTask = (config: InlineConfig) => {
		return new Promise(async (resolve, reject) => {
			try {
				await build(config);
				resolve(undefined);
			} catch (error) {
				reject();
			}
		});
	};
	const buildOptions = mergeConfig(commonConfig, {
		publicDir: false,
		plugins: [vueJsx(), cssInjectedByJsPlugin()],
		build: {
			minify: 'esbuild',
			cssCodeSplit: false,
			emptyOutDir: true,
			lib: {
				fileName: 'index',
			},
		},
	} as InlineConfig);

	for (const component of components) {
		// esmodule 输出到 dist/components/es
		const buildOptionsOfESModule = mergeConfig(buildOptions, {
			build: {
				lib: {
					entry: path.resolve(componentPath, component.name, 'main.ts'),
					name: component.name.replace(/^.{1}/, ($1) => {
						return $1.toUpperCase();
					}),
					formats: ['es'],
				},
				outDir: `dist/components/es/${component.name}`,
			},
		} as InlineConfig);
		// commonjs 输出到 dist/components/lib
		const buildOptionsOfCjs = mergeConfig(buildOptions, {
			build: {
				lib: {
					entry: path.resolve(componentPath, component.name, 'main.ts'),
					name: component.name.replace(/^.{1}/, ($1) => {
						return $1.toUpperCase();
					}),
					formats: ['cjs'],
				},
				outDir: path.resolve(
					__dirname,
					`../dist/components/lib/${component.name}`,
				),
			},
		} as InlineConfig);

		tasks.push(buildTask(buildOptionsOfESModule), buildTask(buildOptionsOfCjs));
	}

	try {
		await Promise.all(tasks);
	} catch (error) {
		console.log('error :>> ', error);
	}
}

async function buildAllHooks() {
	const hooksPath = path.resolve(__dirname, '../packages/hooks');
	const buildOptions = mergeConfig(commonConfig, {
		publicDir: false,
		build: {
			minify: 'esbuild',
			emptyOutDir: true,
			lib: {
				fileName: 'index',
				entry: path.resolve(hooksPath, 'index.ts'),
				formats: ['es', 'cjs'],
			},
			outDir: `dist/hooks`,
		},
	} as InlineConfig);

	await build(buildOptions);
}

async function buildEachHook() {
	const hooksPath = path.resolve(__dirname, '../packages/hooks');
	const hooks = await fse.readdir(hooksPath, { withFileTypes: true });

	hooks
		.filter((v) => v.name.startsWith('use'))
		.forEach(async (v) => {
			const buildOptionsOfESModule = mergeConfig(commonConfig, {
				publicDir: false,
				build: {
					minify: 'esbuild',
					emptyOutDir: false,
					lib: {
						fileName: v.name.replace(/\.\w+$/, ''),
						entry: path.resolve(hooksPath, v.name),
						formats: ['es'],
					},
					outDir: `dist/hooks/es`,
				},
			} as InlineConfig);
			const buildOptionsOfCjs = mergeConfig(commonConfig, {
				publicDir: false,
				build: {
					minify: 'esbuild',
					emptyOutDir: false,
					lib: {
						fileName: v.name.replace(/\.\w+$/, ''),
						entry: path.resolve(hooksPath, v.name),
						formats: ['cjs'],
					},
					outDir: `dist/hooks/lib`,
				},
			} as InlineConfig);

			await build(buildOptionsOfESModule);
			await build(buildOptionsOfCjs);
		});
}

async function startBuild() {
	await buildAllComponents();
	await buildEachComponent();
	await buildAllHooks();
	await buildEachHook();
}
startBuild();
