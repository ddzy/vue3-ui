import * as path from 'path';
import { UserConfigExport } from 'vite';

const LIB_NAME = 'vue3-ui';

export default {
	build: {
		outDir: 'dist/lib',
		lib: {
			entry: path.resolve(__dirname, '../packages/components/main.ts'),
			name: LIB_NAME,
		},
		rollupOptions: {
			external: ['vue'],
			output: {
				// 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
				globals: {
					vue: 'Vue',
				},
				assetFileNames(chunkInfo) {
					if (chunkInfo.name === 'style.css') {
						return `${LIB_NAME}.css`;
					}
					return chunkInfo.name;
				},
			},
		},
	},
} as UserConfigExport;
