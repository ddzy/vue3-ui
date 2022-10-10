import { App } from 'vue';
import SelectOption from './lib/SelectOption.vue';

const install = function(app: App) {
	app.component(SelectOption.name, SelectOption);
};

export default Object.assign(SelectOption, { install });
