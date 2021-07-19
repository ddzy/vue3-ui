import { App } from 'vue';
import Space from './src/components/Space.vue';

const install = function(app: App) {
	app.component(Space.name, Space);
};

export default Object.assign(Space, { install });
