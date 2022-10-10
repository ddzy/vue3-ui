import { App } from 'vue';
import CheckboxGroup from '../checkbox/lib/components/CheckboxGroup.vue';

const install = function(app: App) {
	app.component(CheckboxGroup.name, CheckboxGroup);
};

export default Object.assign(CheckboxGroup, { install });
