import { App } from 'vue';
import ProgressLinear from '../progress/lib/components/ProgressLinear.vue';

const install = function(app: App) {
	app.component(ProgressLinear.name, ProgressLinear);
};

export default Object.assign(ProgressLinear, { install });
