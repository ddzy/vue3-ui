import { App } from 'vue';
import Slider from './lib/Slider.vue';

const install = function(app: App) {
	app.component(Slider.name, Slider);
};

export default Object.assign(Slider, { install });
