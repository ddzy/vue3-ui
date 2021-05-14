import { App } from 'vue';
import Row from './src/components/Row.vue';

const install = function(app: App) {
	app.component(Row.name, Row);
};

export { Row };

export default install;
