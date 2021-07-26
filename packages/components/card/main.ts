import { App } from 'vue';
import Card from './src/components/Card.vue';

function install(app: App) {
	app.component(Card.name, Card);
}

export default Object.assign(Card, { install });
