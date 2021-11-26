import { App } from 'vue';
import ProgressCircular from '../progress/src/components/ProgressCircular.vue';

const install = function(app: App) {
	app.component(ProgressCircular.name, ProgressCircular);
};

export default Object.assign(ProgressCircular, { install });
