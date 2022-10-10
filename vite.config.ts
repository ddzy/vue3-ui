import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import * as path from 'path';
import vitePluginVuedoc, { vueDocFiles } from 'vite-plugin-vuedoc';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vitePluginVuedoc({
			wrapperClass: 'custom-markdown-container',
			highlight: {
				theme: 'one-light'
			},
			previewComponent: 'V3DemoBlock',
		}),
		vue({
			include: [...vueDocFiles],
		}),
	],
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
				additionalData: `@import "./packages/common/styles/global-reset"; \n @import "./packages/common/styles/global-variable"; \n @import "./packages/common/styles/global-style"; \n @import "./packages/common/styles/global-animation"; \n @import "./packages/common/styles/custom-markdown";`,
			},
		},
	},
	build: {
		lib: {
			entry: path.resolve(__dirname, 'packages/components/main.ts'),
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
});
