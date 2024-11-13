import { App } from 'vue';

import Pagination from './lib/Pagination.vue';

function install(app: App) {
	app.component(Pagination.name!, Pagination);
}

export default Object.assign(Pagination, { install });
