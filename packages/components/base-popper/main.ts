import { App } from 'vue';
import BasePopper from './src/components/BasePopper.vue';

const install = function(app: App) {
	app.component(BasePopper.name, BasePopper);
};

export default Object.assign(BasePopper, { install });
