import { App } from 'vue';

import Upload from './lib/Upload.vue';

function install(app: App) {
	app.component(Upload.name!, Upload);
}

export default Object.assign(Upload, { install });
