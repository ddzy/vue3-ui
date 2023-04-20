import { App } from 'vue';
import Tag from './lib/Tag.vue';

const install = function (app: App) {
	app.component(Tag.name, Tag);
};

export default Object.assign(Tag, { install });
