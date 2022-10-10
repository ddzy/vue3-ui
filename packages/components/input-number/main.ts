import { App } from 'vue';
import InputNumber from '../input/lib/components/InputNumber.vue';

const install = function(app: App) {
	app.component(InputNumber.name, InputNumber);
};

export default Object.assign(InputNumber, { install });
