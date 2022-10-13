import * as path from 'path';
import * as fs from 'fs';
import { BuildOptions, build, mergeConfig } from 'vite';
import { commonConfig } from '../vite.config';

const packagePath = path.resolve(__dirname, '../packages/components');
const packageList = fs
	.readdirSync(packagePath, {
		withFileTypes: true,
	})
	.filter(fileInfo => fileInfo.isDirectory())
	.map(fileInfo => {
		return {
			lib: {
				entry: path.resolve(packagePath, fileInfo.name),
				fileName: 'index',
				name: fileInfo.name,
			},
			outDir: `dist/components/${fileInfo.name}`,
		};
	});
packageList.forEach(async v => {
	const buildOptions = mergeConfig(commonConfig, {
		build: {
			...v,
			assetsDir: `../`,
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
	}) as BuildOptions;

	await build(buildOptions);
});
