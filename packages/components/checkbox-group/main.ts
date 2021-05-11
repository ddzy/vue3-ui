import { App } from 'vue';
import CheckboxGroup from '../checkbox/src/components/CheckboxGroup.vue';

const install = function(app: App) {
	app.component(CheckboxGroup.name, CheckboxGroup);
};

export { CheckboxGroup };

export default install;
