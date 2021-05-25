import { App } from 'vue';
import RadioGroup from '../radio/src/components/RadioGroup.vue';

const install = function(app: App) {
	app.component(RadioGroup.name, RadioGroup);
};

export default Object.assign(RadioGroup, { install });
