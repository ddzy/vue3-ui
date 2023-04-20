import * as path from 'path';
import * as fse from 'fs-extra';
import { InlineConfig, build, mergeConfig } from 'vite';
// import commonConfig from '../config/common';
import vue from '@vitejs/plugin-vue';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

const commonConfig = {
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
				replacement: path.resolve(__dirname, '/public/lib/typings'),
			},
		],
	},
	server: {
		open: true,
		port: 8886,
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
			},
		},
	},
}

async function buildAll() {
	const baseBuildOptions: InlineConfig = {
		publicDir: 'public/lib',
		build: {
			sourcemap: true,
			outDir: 'dist',
			lib: {
				entry: path.resolve(__dirname, '../packages/components/main.lib.ts'),
				name: 'Vue3UI',
			},
		},
		plugins: [
			vue(),
		],
	}

	// index.full.js
	const buildOptionsOfFull = mergeConfig(commonConfig, mergeConfig(baseBuildOptions, {
		build: {
			// 是否清空 dist 文件夹
			emptyOutDir: true,
			lib: {
				fileName: 'index.full',
			},
			minify: false,
		},
	} as InlineConfig));

	// index.min.js
	const buildOptionsOfMin = mergeConfig(commonConfig, mergeConfig(baseBuildOptions, {
		build: {
			// 是否清空 dist 文件夹
			emptyOutDir: false,
			lib: {
				fileName: 'index.min',
			},
			minify: 'esbuild',
		},
	} as InlineConfig));

	await build(buildOptionsOfFull);
	await build(buildOptionsOfMin);
}
async function buildEach() {
	/**
 * https://github.com/vitejs/vite/discussions/1736
 */
	const packagePath = path.resolve(__dirname, '../packages/components');

	fse.readdirSync(packagePath, {
		withFileTypes: true,
	})
		.filter(v => v.isDirectory())
		.forEach(async v => {
			const baseBuildOptions: InlineConfig = {
				publicDir: false,
				plugins: [vue(), cssInjectedByJsPlugin()],
				build: {
					sourcemap: false,
					lib: {
						entry: path.resolve(packagePath, v.name, 'main.ts'),
						name: v.name.replace(/^.{1}/, $1 => {
							return $1.toUpperCase();
						}),
					},
					outDir: `dist/packages/${v.name}`,
					cssCodeSplit: false,
				},
			};

			const buildOptions = mergeConfig(commonConfig, mergeConfig(baseBuildOptions, {
				build: {
					minify: false,
					emptyOutDir: true,
					lib: {
						fileName: 'index',
					},
				},
			} as InlineConfig))

			await build(buildOptions);

			// 打包之后将各个包的源码复制到输出目录中
			try {
				fse.copySync(
					path.resolve(packagePath, v.name, 'lib'),
					path.resolve(__dirname, `../dist/packages/${v.name}/lib`),
					{ overwrite: true }
				);
			} catch (error) { }
		});

}

buildAll();
buildEach();