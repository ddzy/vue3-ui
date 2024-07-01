import { App } from 'vue';

import Tab from './lib/Tab.vue';

function install(app: App) {
	app.component(Tab.name as string, Tab);
}

export default Object.assign(Tab, { install });
