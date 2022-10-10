import { App } from 'vue';
import Popconfirm from './lib/components/Popconfirm.vue';

const install = function(app: App) {
	app.component(Popconfirm.name, Popconfirm);
};

export default Object.assign(Popconfirm, { install });
