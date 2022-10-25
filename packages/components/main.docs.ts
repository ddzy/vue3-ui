import { createApp, h } from 'vue';
import 'vite-plugin-vuedoc/style.css';
import Vue3UI from '../../dist/vue3-ui.es';
import '../../dist/vue3-ui.css';
import './main.docs.scss';
import Main from './main.vue';
import router from './router';

router.beforeEach(to => {
	if (to.meta && to.meta.title) {
		document.title = `vue3-ui--${to.meta.title}`;
	}
});
const app = createApp({
	render: () => h(Main),
});
app.use(Vue3UI);
app.use(router);
app.mount('#app');

export default app;
