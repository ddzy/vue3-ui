import { App } from 'vue';

import CarouselItem from './lib/CarouselItem.vue';

const install = function (app: App) {
	app.component(CarouselItem.name!, CarouselItem);
};

export default Object.assign(CarouselItem, { install });
