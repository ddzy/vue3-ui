import { App } from 'vue';
import Checkbox from './lib/components/Checkbox.vue';

const install = function(app: App) {
	app.component(Checkbox.name, Checkbox);
};

export default Object.assign(Checkbox, { install });
