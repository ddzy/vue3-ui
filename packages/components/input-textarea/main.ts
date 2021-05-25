import { App } from 'vue';
import InputTextarea from '../input/src/components/InputTextarea.vue';

const install = function(app: App) {
	app.component(InputTextarea.name, InputTextarea);
};

export default Object.assign(InputTextarea, { install });
