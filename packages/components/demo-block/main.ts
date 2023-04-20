import { App } from 'vue';
import DemoBlock from './lib/DemoBlock.vue';

const install = function (app: App) {
	app.component(DemoBlock.name, DemoBlock);
};

export default Object.assign(DemoBlock, { install });
