import { App } from 'vue';

import Popconfirm from './lib/Popconfirm.vue';

const install = function (app: App) {
	app.component(Popconfirm.name!, Popconfirm);
};

export default Object.assign(Popconfirm, { install });
