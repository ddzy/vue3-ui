import { App } from 'vue';
import Input from './lib/Input.vue';

const install = function (app: App) {
	app.component(Input.name, Input);
};

export default Object.assign(Input, { install });
