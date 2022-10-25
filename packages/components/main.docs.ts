import { createApp, h } from 'vue';
import 'vite-plugin-vuedoc/style.css';
import Vue3UI from '../../dist/index.es';
import '../../dist/index.css';
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
