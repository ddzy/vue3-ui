import { App } from 'vue';
import Carousel from './src/components/Carousel.vue';

const install = function(app: App) {
	app.component(Carousel.name, Carousel);
};

export default Object.assign(Carousel, { install });
