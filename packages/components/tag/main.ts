import { App } from 'vue';
import Tag from './src/components/Tag.vue';

const install = function(app: App) {
	app.component(Tag.name, Tag);
};

export default Object.assign(Tag, { install });
