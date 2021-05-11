import { App } from 'vue';
import ButtonGroup from '../button/src/components/ButtonGroup.vue';

const install = function(app: App) {
	app.component(ButtonGroup.name, ButtonGroup);
};

export { ButtonGroup };

export default install;
