import { defineConfig, mergeConfig, UserConfigExport, loadEnv } from 'vite';
import * as path from 'path';
import docsBuildConfig from './build/docs.build';

const buildTarget = process.env.BUILD_TARGET as string;
const buildConfig = buildTarget === 'docs' ? docsBuildConfig : {};

export const commonConfig: UserConfigExport = {
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
				additionalData: `@import "./packages/common/styles/global-reset"; \n @import "./packages/common/styles/global-variable"; \n @import "./packages/common/styles/global-style"; \n @import "./packages/common/styles/global-animation";`,
			},
		},
	},
};

// https://vitejs.dev/config/
export default defineConfig(mergeConfig(commonConfig, buildConfig));
