import { App } from 'vue';

import Table from './lib/Table.vue';

function install(app: App) {
	app.component(Table.name!, Table);
}

export default Object.assign(Table, { install });
