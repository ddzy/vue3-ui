import * as path from 'path';
import { InlineConfig } from 'vite';

export default {
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
	server: {
		open: true,
		port: 8886,
	},
	css: {
		preprocessorOptions: {
			/** 配置 scss 全局变量的引入方式 */
			scss: {
				additionalData: `@import "./packages/common/styles/variable";`,
			},
		},
	},
	build: {
		sourcemap: true,
	},
} as InlineConfig;
