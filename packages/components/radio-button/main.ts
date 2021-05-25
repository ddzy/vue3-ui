import { App } from 'vue';
import RadioButton from '../radio/src/components/RadioButton.vue';

const install = function(app: App) {
	app.component(RadioButton.name, RadioButton);
};

export default Object.assign(RadioButton, { install });
