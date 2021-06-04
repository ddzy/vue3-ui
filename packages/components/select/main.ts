import { App } from 'vue';
import Select from './src/components/Select.vue';

const install = function(app: App) {
	app.component(Select.name, Select);
};

export default Object.assign(Select, { install });
