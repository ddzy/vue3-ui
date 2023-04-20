import { App } from 'vue';
import Radio from './lib/Radio.vue';

const install = function (app: App) {
	app.component(Radio.name, Radio);
};

export default Object.assign(Radio, { install });
