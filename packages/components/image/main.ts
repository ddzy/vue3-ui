import { type App } from 'vue';
import Image from './lib/Image.vue';

function install(app: App) {
	app.component(Image.name!, Image);
}

export default Object.assign(Image, install);
