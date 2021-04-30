import { App, Component } from 'vue';
import V3Input from './Input.vue';
import V3InputTextarea from './InputTextarea.vue';
import V3InputNumber from './InputNumber.vue';

interface ICompoent {
	name: string;
	component: Component;
}

/**
 * 全局组件列表
 */
const globalComponentList: ICompoent[] = [
	{
		name: 'v3-input',
		component: V3Input,
	},
	{
		name: 'v3-button-textarea',
		component: V3InputTextarea,
	},
	{
		name: 'v3-button-number',
		component: V3InputNumber,
	},
];

const install = function(app: App) {
	globalComponentList.forEach(v => {
		app.component(v.name, v.component);
	});
};

export default install;
