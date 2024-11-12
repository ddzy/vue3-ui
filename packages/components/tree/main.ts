import { App } from 'vue';

import Tree from './lib/Tree.vue';

function install(app: App) {
	app.component(Tree.name!, Tree);
}

export default Object.assign(Tree, install);
