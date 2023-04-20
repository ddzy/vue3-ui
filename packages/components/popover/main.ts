import { App } from 'vue';
import Popover from './lib/Popover.vue';

const install = function (app: App) {
	app.component(Popover.name, Popover);
};

export default Object.assign(Popover, { install });
