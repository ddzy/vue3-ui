import * as path from 'node:path';
import * as fse from 'fs-extra';
import { type InlineConfig, build, mergeConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
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

async function buildAll() {
	const baseBuildOptions: InlineConfig = {
		publicDir: 'public',
		build: {
			outDir: 'dist',
			lib: {
				entry: path.resolve(__dirname, '../packages/components/main.ts'),
				name: 'Vue3UI',
			},
		},
		plugins: [vue()],
	};

	// index.full.js
	const buildOptionsOfFull = mergeConfig(
		commonConfig,
		mergeConfig(baseBuildOptions, {
			build: {
				// 是否清空 dist 文件夹
				emptyOutDir: true,
				lib: {
					fileName: 'index.full',
				},
				minify: false,
			},
		} as InlineConfig),
	);

	// index.min.js
	const buildOptionsOfMin = mergeConfig(
		commonConfig,
		mergeConfig(baseBuildOptions, {
			build: {
				// 是否清空 dist 文件夹
				emptyOutDir: false,
				lib: {
					fileName: 'index.min',
				},
				minify: 'esbuild',
			},
		} as InlineConfig),
	);

	await build(buildOptionsOfFull);
	await build(buildOptionsOfMin);
}

async function buildEach() {
	const componentPath = path.resolve(__dirname, '../packages/components');
	const components = (
		await fse.readdir(componentPath, { withFileTypes: true })
	).filter((v) => v.isDirectory());
	const buildTasks: Promise<any>[] = [];
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

	for (const component of components) {
		const buildOptions = mergeConfig(commonConfig, {
			publicDir: false,
			plugins: [vue(), cssInjectedByJsPlugin()],
			build: {
				minify: 'esbuild',
				cssCodeSplit: false,
				emptyOutDir: true,
				lib: {
					entry: path.resolve(componentPath, component.name, 'main.ts'),
					name: component.name.replace(/^.{1}/, ($1) => {
						return $1.toUpperCase();
					}),
					fileName: 'index',
				},
				outDir: `dist/packages/${component.name}`,
			},
		} as InlineConfig);
		buildTasks.push(buildTask(buildOptions));
	}

	try {
		await Promise.all(buildTasks);
	} catch (error) {
		console.log('error :>> ', error);
	}
}

buildAll();
buildEach();
