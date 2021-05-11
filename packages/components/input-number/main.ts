import { App } from 'vue';
import InputNumber from '../input/src/components/InputNumber.vue';

const install = function(app: App) {
	app.component(InputNumber.name, InputNumber);
};

export { InputNumber };

export default install;
