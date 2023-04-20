import { App } from 'vue';
import CheckboxGroup from './lib/CheckboxGroup.vue';

const install = function (app: App) {
	app.component(CheckboxGroup.name, CheckboxGroup);
};

export default Object.assign(CheckboxGroup, { install });
