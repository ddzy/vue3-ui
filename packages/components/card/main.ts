import { App } from 'vue';

import Card from './lib/Card.vue';

function install(app: App) {
	app.component(Card.name!, Card);
}

export default Object.assign(Card, { install });
