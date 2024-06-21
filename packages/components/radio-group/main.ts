import { App } from 'vue';

import RadioGroup from './lib/RadioGroup.vue';

const install = function (app: App) {
	app.component(RadioGroup.name!, RadioGroup);
};

export default Object.assign(RadioGroup, { install });
