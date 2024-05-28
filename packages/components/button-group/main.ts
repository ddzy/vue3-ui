import { App } from 'vue';
import ButtonGroup from './lib/ButtonGroup.vue';

const install = function (app: App) {
	app.component(ButtonGroup.name!, ButtonGroup);
};

export default Object.assign(ButtonGroup, { install });
