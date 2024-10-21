import { App } from 'vue';

import Watermark from './lib/Watermark.vue';

function install(app: App) {
	app.component(Watermark.name!, Watermark);
}

export default Object.assign(Watermark, { install });
