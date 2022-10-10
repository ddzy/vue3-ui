import { App } from 'vue';
import Badge from './lib/components/Badge.vue';

const install = function(app: App) {
	app.component(Badge.name, Badge);
};

export default Object.assign(Badge, { install });
