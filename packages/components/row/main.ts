import { App } from 'vue';
import Row from './lib/Row.vue';

const install = function (app: App) {
	app.component(Row.name, Row);
};

export default Object.assign(Row, { install });
