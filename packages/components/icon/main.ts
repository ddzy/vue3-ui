import { App } from 'vue';
import Icon from './lib/Icon.vue';

function install(app: App) {
	app.component(Icon.name!, Icon);
}

export default Object.assign(Icon, {
	install,
});
