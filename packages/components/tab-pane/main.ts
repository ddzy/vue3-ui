import { App } from 'vue';

import TabPane from './lib/TabPane.vue';

function install(app: App) {
	app.component(TabPane.name as string, TabPane);
}

export default Object.assign(TabPane, { install });
