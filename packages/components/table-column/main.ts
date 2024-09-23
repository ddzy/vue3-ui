import { App } from 'vue';

import TableColumn from './lib/TableColumn.vue';

function install(app: App) {
	app.component(TableColumn.name!, TableColumn);
}

export default Object.assign(TableColumn, { install });
