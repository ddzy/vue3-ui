import { App } from 'vue';
import Back from './src/components/Back.vue';

const install = function(app: App) {
	app.component(Back.name, Back);
};

export default Object.assign(Back, { install });
