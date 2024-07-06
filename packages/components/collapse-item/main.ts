import { App } from 'vue';

import CollapseItem from './lib/CollapseItem.vue';

function install(app: App) {
	app.component(CollapseItem.name!, CollapseItem);
}

export default Object.assign(CollapseItem, { install });
