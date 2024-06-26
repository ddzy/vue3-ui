import { App } from 'vue';

import Dialog from './lib/Dialog.vue';

const install = function (app: App) {
	app.component(Dialog.name!, Dialog);
};

export default Object.assign(Dialog, { install });
