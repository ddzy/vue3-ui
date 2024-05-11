import { App } from 'vue';
import BasePopper from './lib/BasePopper.vue';

const install = function (app: App) {
	app.component(BasePopper.name!, BasePopper);
};

export default Object.assign(BasePopper, { install });
