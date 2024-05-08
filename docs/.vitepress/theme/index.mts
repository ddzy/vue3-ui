import DefaultTheme from 'vitepress/theme';
import 'vitepress-theme-demoblock/dist/theme/styles/index.css';
import Demo from 'vitepress-theme-demoblock/dist/client/components/Demo.vue';
import DemoBlock from 'vitepress-theme-demoblock/dist/client/components/DemoBlock.vue';

import Vue3Ui from '../../../packages/components/main';

export default {
	...DefaultTheme,
	enhanceApp(ctx) {
		DefaultTheme.enhanceApp(ctx);
		ctx.app.component('Demo', Demo);
		ctx.app.component('DemoBlock', DemoBlock);
		ctx.app.use(Vue3Ui);
	},
};
