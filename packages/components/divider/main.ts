import { App } from 'vue';
import Divider from './lib/components/Divider.vue';

const install = function(app: App) {
	app.component(Divider.name, Divider);
};

export default Object.assign(Divider, { install });
