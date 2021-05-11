import { App } from 'vue';
import Radio from './src/components/Radio.vue';

const install = function(app: App) {
	app.component(Radio.name, Radio);
};

export { Radio };

export default install;
