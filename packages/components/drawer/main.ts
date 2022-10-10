import { App } from 'vue';
import Drawer from './lib/components/Drawer.vue';

const install = function(app: App) {
	app.component(Drawer.name, Drawer);
};

export default Object.assign(Drawer, { install });
