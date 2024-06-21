import { App } from 'vue';

import Select from './lib/Select.vue';

const install = function (app: App) {
	app.component(Select.name!, Select);
};

export default Object.assign(Select, { install });
