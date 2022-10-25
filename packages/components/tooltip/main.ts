import { App } from 'vue';
import Tooltip from './lib/Tooltip.vue';

const install = function(app: App) {
	app.component(Tooltip.name, Tooltip);
};

export default Object.assign(Tooltip, { install });
