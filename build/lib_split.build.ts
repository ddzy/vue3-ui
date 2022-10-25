import * as path from 'path';
import * as fse from 'fs-extra';
import { build, mergeConfig } from 'vite';
import commonConfig from '../config/common';
import vue from '@vitejs/plugin-vue';

/**
 * https://github.com/vitejs/vite/discussions/1736
 */

const packagePath = path.resolve(__dirname, '../packages/components');
const packageList = fse
	.readdirSync(packagePath, {
		withFileTypes: true,
	})
	.filter(fileInfo => fileInfo.isDirectory())
	.map(fileInfo => {
		return {
			packageName: fileInfo.name,
			lib: {
				entry: path.resolve(packagePath, fileInfo.name, 'main.ts'),
				fileName: 'index',
				name: fileInfo.name.replace(/^.{1}/, $1 => {
					return $1.toUpperCase();
				}),
			},
			outDir: `dist/packages/${fileInfo.name}`,
		};
	});
packageList.forEach(async v => {
	const buildOptions = mergeConfig(commonConfig, {
		// 由于采用手动打包，所以禁止自动寻找 vite.config.ts 配置文件，避免打包失败
		configFile: false,
		publicDir: 'public/lib_split',
		build: {
			lib: v.lib,
			outDir: v.outDir,
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
		plugins: [vue()],
		css: {
			preprocessorOptions: {
				/** 配置 scss 全局变量的引入方式 */
				scss: {
					additionalData: `@import "./packages/common/styles/variable";\n@import "./packages/common/styles/reset";`,
				},
			},
		},
	});

	await build(buildOptions);
	// 打包之后将各个包的源码复制到输出目录中
	try {
		fse.copySync(
			path.resolve(packagePath, v.packageName, 'lib'),
			path.resolve(__dirname, `../dist/packages/${v.packageName}/lib`),
			{ overwrite: true }
		);
	} catch (error) {}
});
