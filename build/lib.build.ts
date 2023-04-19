import * as path from 'path';
import { InlineConfig, build, mergeConfig } from 'vite';
import commonConfig from '../config/common';
import vue from '@vitejs/plugin-vue';

const baseBuildOptions: InlineConfig = {
	// 由于采用手动打包，所以禁止自动寻找 vite.config.ts 配置文件，避免打包失败
	configFile: false,
	publicDir: 'public/lib',
	build: {
		lib: {
			entry: path.resolve(__dirname, '../packages/components/main.lib.ts'),
			name: 'Vue3UI',
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
						return `index.css`;
					}
					return chunkInfo.name;
				},
			},
		},
	},
	plugins: [
		vue(),
	],
};
  
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

async function buildHelper() {
	await build(buildOptionsOfFull);
	await build(buildOptionsOfMin);
}

buildHelper();
