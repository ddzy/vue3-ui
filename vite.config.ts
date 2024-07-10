/// <reference types="vitest" />
import * as path from 'node:path';
import vuePlugin from '@vitejs/plugin-vue';
import vueJsxPlugin from '@vitejs/plugin-vue-jsx';
import { InlineConfig, defineConfig, mergeConfig } from 'vite';

// 组件库打包、组件文档、组件单元测试共用
export const baseConfig: InlineConfig = {
	resolve: {
		alias: [
			{
				find: '@common',
				replacement: path.resolve(__dirname, './packages/common'),
			},
			{
				find: '@components',
				replacement: path.resolve(__dirname, './packages/components'),
			},
			{
				find: '@hooks',
				replacement: path.resolve(__dirname, './packages/hooks'),
			},
			{
				find: '@typings',
				replacement: path.resolve(__dirname, './public/lib/typings'),
			},
		],
	},
	css: {
		preprocessorOptions: {
			/** 配置 scss 全局变量的引入方式 */
			scss: {
				additionalData: `@import "@common/styles/variable.scss";\n@import "@common/styles/reset.scss";`,
			},
		},
	},
};

// https://vitejs.dev/config/
export default defineConfig(
	mergeConfig(baseConfig, {
		server: {
			port: 5174,
		},
		// 单元测试相关配置
		test: {
			environment: 'jsdom',
			include: ['**/*.{test,spec}.?(c|m)[jt]s?(x)'],
			// include: ['**/*/__tests__/Collapse.test.ts'],
			exclude: [
				'**/*/__tests__/Select.test.ts',
				'**/node_modules/**',
				'**/dist/**',
				'**/cypress/**',
				'**/.{idea,git,cache,output,temp}/**',
				'**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*',
			],
		},
		plugins: [vuePlugin(), vueJsxPlugin()],
	} as InlineConfig),
);
