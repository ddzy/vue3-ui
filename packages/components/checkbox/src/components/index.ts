import { App, Component } from 'vue';
import V3Checkbox from './Checkbox.vue';
import V3CheckboxButton from './CheckboxButton.vue';
import V3CheckboxGroup from './CheckboxGroup.vue';

interface ICompoent {
	name: string;
	component: Component;
}

/**
 * 全局组件列表
 */
const globalComponentList: ICompoent[] = [
	{
		name: 'v3-checkbox',
		component: V3Checkbox,
	},
	{
		name: 'v3-checkbox-button',
		component: V3CheckboxButton,
	},
	{
		name: 'v3-checkbox-group',
		component: V3CheckboxGroup,
	},
];

const install = function(app: App) {
	globalComponentList.forEach(v => {
		app.component(v.name, v.component);
	});
};

export default install;
