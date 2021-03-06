import { App } from 'vue';
import Slider from './src/components/Slider.vue';

const install = function(app: App) {
	app.component(Slider.name, Slider);
};

export default Object.assign(Slider, { install });
