import { App } from 'vue';
import Tooltip from './lib/components/Tooltip.vue';

const install = function(app: App) {
	app.component(Tooltip.name, Tooltip);
};

export default Object.assign(Tooltip, { install });
