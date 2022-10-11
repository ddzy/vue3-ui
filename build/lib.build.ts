import * as path from 'path';

export default {
	build: {
		lib: {
			entry: path.resolve(__dirname, '../packages/components/main.ts'),
			name: 'vue3-ui',
		},
		rollupOptions: {
			external: ['vue'],
			output: {
				// 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
				globals: {
					vue: 'Vue',
				},
			},
		},
	},
};
