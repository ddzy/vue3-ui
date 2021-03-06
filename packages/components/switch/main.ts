import { App } from 'vue';
import Switch from './src/components/Switch.vue';

const install = function(app: App) {
	app.component(Switch.name, Switch);
};

export default Object.assign(Switch, { install });
