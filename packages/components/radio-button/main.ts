import { App } from 'vue';
import RadioButton from '../radio/src/components/RadioButton.vue';

const install = function(app: App) {
	app.component(RadioButton.name, RadioButton);
};

export { RadioButton };

export default install;
