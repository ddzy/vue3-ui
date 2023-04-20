import { App } from 'vue';
import InputNumber from './lib/InputNumber.vue';

const install = function (app: App) {
	app.component(InputNumber.name, InputNumber);
};

export default Object.assign(InputNumber, { install });
