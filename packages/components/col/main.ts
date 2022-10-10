import { App } from 'vue';
import Col from '../row/lib/components/Col.vue';

const install = function(app: App) {
	app.component(Col.name, Col);
};

export default Object.assign(Col, { install });
