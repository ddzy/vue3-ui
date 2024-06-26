import { App } from 'vue';

import RadioButton from './lib/RadioButton.vue';

const install = function (app: App) {
	app.component(RadioButton.name!, RadioButton);
};

export default Object.assign(RadioButton, { install });
