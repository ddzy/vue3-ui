import { App } from 'vue';
import DemoBlock from './src/components/DemoBlock.vue';

const install = function(app: App) {
	app.component(DemoBlock.name, DemoBlock);
};

export { DemoBlock };

export default install;
