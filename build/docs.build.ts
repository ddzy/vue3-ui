import vitePluginVuedoc, { vueDocFiles } from 'vite-plugin-vuedoc';
import vue from '@vitejs/plugin-vue';

const buildConfig = {
	base: '/vue3-ui/',
	publicDir: 'public/docs',
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
	build: {
		outDir: 'docs',
	},
	css: {
		preprocessorOptions: {
			/** 配置 scss 全局变量的引入方式 */
			scss: {
			},
		},
	},
};

export default buildConfig;
