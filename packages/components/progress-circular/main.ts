import { App } from 'vue';
import ProgressCircular from './lib/ProgressCircular.vue';

const install = function(app: App) {
	app.component(ProgressCircular.name, ProgressCircular);
};

export default Object.assign(ProgressCircular, { install });
