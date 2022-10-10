import { App } from 'vue';
import Button from './lib/components/Button.vue';

function install(app: App) {
	app.component(Button.name, Button);
}

export default Object.assign(Button, { install });
