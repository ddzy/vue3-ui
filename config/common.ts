import * as path from 'path';
import { UserConfigExport } from "vite";

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
				additionalData: `@import "./packages/common/styles/global-reset"; \n @import "./packages/common/styles/global-variable"; \n @import "./packages/common/styles/global-style";`,
			},
		},
	},
} as UserConfigExport