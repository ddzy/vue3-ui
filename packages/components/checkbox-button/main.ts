import { App } from 'vue';
import CheckboxButton from '../checkbox/src/components/CheckboxButton.vue';

const install = function(app: App) {
	app.component(CheckboxButton.name, CheckboxButton);
};

export default Object.assign(CheckboxButton, { install });
