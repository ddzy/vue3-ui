import { App } from 'vue';
import Backdrop from './lib/Backdrop.vue';

const install = function (app: App) {
	app.component(Backdrop.name, Backdrop);
};

export default Object.assign(Backdrop, { install });
