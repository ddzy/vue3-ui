import { App } from 'vue';
import Button from './src/components/Button.vue';

const install = function(app: App) {
	app.component(Button.name, Button);
};

export { Button };

export default install;
