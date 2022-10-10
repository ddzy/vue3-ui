import { App } from 'vue';
import Row from './lib/components/Row.vue';

const install = function(app: App) {
	app.component(Row.name, Row);
};

export default Object.assign(Row, { install });
