import { App } from 'vue';
import Input from './src/components/Input.vue';

const install = function(app: App) {
	app.component(Input.name, Input);
};

export { Input };

export default install;
