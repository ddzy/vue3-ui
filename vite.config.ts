import { defineConfig, mergeConfig, UserConfigExport } from 'vite';
import vue from '@vitejs/plugin-vue';
import * as path from 'path';
import vitePluginVuedoc, { vueDocFiles } from 'vite-plugin-vuedoc';
import libBuildConfig from './build/lib.build';
import docsBuildConfig from './build/docs.build';

const buildTarget = process.env.BUILD_TARGET as string;
const buildConfig =
	buildTarget === 'lib'
		? libBuildConfig
		: buildTarget === 'docs'
		? docsBuildConfig
		: {};

export const commonConfig: UserConfigExport = {
	plugins: [
		vitePluginVuedoc({
			wrapperClass: 'custom-markdown-container',
			highlight: {
				theme: 'one-light',
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
};

// https://vitejs.dev/config/
export default defineConfig(mergeConfig(commonConfig, buildConfig));
