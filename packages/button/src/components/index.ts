import { App, Component } from 'vue';
import V3Button from './Button.vue';
import V3ButtonGroup from './ButtonGroup.vue';

interface ICompoent {
	name: string;
	component: Component;
}

/**
 * 全局组件列表
 */
const globalComponentList: ICompoent[] = [
	{
		name: 'v3-button',
		component: V3Button
	},
	{
		name: 'v3-button-group',
		component: V3ButtonGroup
	}
];

const install = function(app: App) {
	globalComponentList.forEach(v => {
		app.component(v.name, v.component);
	});
};

export default install;
