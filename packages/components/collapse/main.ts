import { App } from 'vue';

import Collapse from './lib/Collapse.vue';

function install(app: App) {
	app.component(Collapse.name!, Collapse);
}

export default Object.assign(Collapse, { install });
