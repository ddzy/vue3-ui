import 'vitepress-theme-demoblock/dist/theme/styles/index.css';
import DefaultTheme from 'vitepress/theme';

import './index.scss';

export default {
	...DefaultTheme,
	async enhanceApp(ctx) {
		DefaultTheme.enhanceApp(ctx);
		// @ts-ignore
		if (!import.meta.env.SSR) {
			const { default: Demo } = await import(
				'vitepress-theme-demoblock/dist/client/components/Demo.vue'
			);
			const { default: DemoBlock } = await import(
				'vitepress-theme-demoblock/dist/client/components/DemoBlock.vue'
			);
			const { default: Vue3UI } = await import(
				'../../../packages/components/main'
			);

			ctx.app.component('Demo', Demo);
			ctx.app.component('DemoBlock', DemoBlock);
			ctx.app.use(Vue3UI);
		}
	},
};
