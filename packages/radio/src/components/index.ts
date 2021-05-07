import { App, Component } from 'vue';
import V3Radio from './Radio.vue';
import V3RadioButton from './RadioButton.vue';
import V3RadioGroup from './RadioGroup.vue';

interface ICompoent {
	name: string;
	component: Component;
}

/**
 * 全局组件列表
 */
const globalComponentList: ICompoent[] = [
	{
		name: 'v3-radio',
		component: V3Radio,
	},
	{
		name: 'v3-radio-button',
		component: V3RadioButton,
	},
	{
		name: 'v3-radio-group',
		component: V3RadioGroup,
	},
];

const install = function(app: App) {
	globalComponentList.forEach(v => {
		app.component(v.name, v.component);
	});
};

export default install;
