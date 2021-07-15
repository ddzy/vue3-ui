import { App } from 'vue';
import Popover from './src/components/Popover.vue';

const install = function(app: App) {
	app.component(Popover.name, Popover);
};

export default Object.assign(Popover, { install });
