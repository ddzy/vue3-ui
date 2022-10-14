import * as path from 'path';
import { build, mergeConfig } from 'vite';
import { commonConfig } from '../vite.config';
import vue from '@vitejs/plugin-vue';

const libName = 'vue3-ui';
const buildOptions = mergeConfig(commonConfig, {
	// 由于采用手动打包，所以禁止自动寻找 vite.config.ts 配置文件，避免打包失败
	configFile: false,
	publicDir: 'public/lib',
	build: {
		// 无需清空 dist 文件夹
		emptyOutDir: false,
		lib: {
			entry: path.resolve(__dirname, '../packages/components/main.lib.ts'),
			fileName: libName,
			name: libName,
		},
		outDir: `dist`,
		rollupOptions: {
			external: ['vue'],
			output: {
				// 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
				globals: {
					vue: 'Vue',
				},
				assetFileNames(chunkInfo: any) {
					if (chunkInfo.name === 'style.css') {
						return `${libName}.css`;
					}
					return chunkInfo.name;
				},
			},
		},
	},
	plugins: [
		vue(),
	],
});

build(buildOptions);
