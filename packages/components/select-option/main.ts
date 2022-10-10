import { App } from 'vue';
import SelectOption from '../select/lib/components/SelectOption.vue';

const install = function(app: App) {
	app.component(SelectOption.name, SelectOption);
};

export default Object.assign(SelectOption, { install });
