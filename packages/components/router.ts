import { createRouter, RouteRecordRaw, createWebHistory } from 'vue-router';
import Home from './home.vue';
import V3ButtonDemo from './button/src/App.vue';
import V3ButtonGroupDemo from './button/src/App.vue';
import V3CheckboxDemo from './checkbox/src/App.vue';
import V3CheckboxButtonDemo from './checkbox/src/App.vue';
import V3CheckboxGroupDemo from './checkbox/src/App.vue';
import V3InputDemo from './input/src/App.vue';
import V3InputNumberDemo from './input/src/App.vue';
import V3InputTextareaDemo from './input/src/App.vue';
import V3RadioDemo from './radio/src/App.vue';
import V3RadioButtonDemo from './radio/src/App.vue';
import V3RadioGroupDemo from './radio/src/App.vue';
import V3DemoBlockDemo from './demo-block/src/App.vue';
import V3RowDemo from './row/src/App.vue';
import V3ColDemo from './row/src/App.vue';
import V3MessageDemo from './message/src/App.vue';
import V3SelectDemo from './select/src/App.vue';
import V3SelectOptionDemo from './select/src/App.vue';
import V3TagDemo from './tag/src/App.vue';
import V3BackdropDemo from './backdrop/src/App.vue';
import V3DialogDemo from './dialog/src/App.vue';
import V3SwitchDemo from './switch/src/App.vue';
import V3TooltipDemo from './tooltip/src/App.vue';
import V3PopoverDemo from './popover/src/App.vue';
import V3DividerDemo from './divider/src/App.vue';
import V3SpaceDemo from './space/src/App.vue';
import V3BadgeDemo from './badge/src/App.vue';

export const dynamcRoutes: RouteRecordRaw[] = [
	{
		path: '/button',
		name: 'V3Button',
		component: V3ButtonDemo,
		meta: {
			title: '按钮',
		},
	},
	{
		path: '/button-group',
		name: 'V3ButtonGroup',
		component: V3ButtonGroupDemo,
		meta: {
			title: '按钮组',
		},
	},
	{
		path: '/checkbox',
		name: 'V3Checkbox',
		component: V3CheckboxDemo,
		meta: {
			title: '复选框',
		},
	},
	{
		path: '/checkbox-button',
		name: 'V3CheckboxButton',
		component: V3CheckboxButtonDemo,
		meta: {
			title: '复选按钮',
		},
	},
	{
		path: '/checkbox-group',
		name: 'V3CheckboxGroup',
		component: V3CheckboxGroupDemo,
		meta: {
			title: '复选框组',
		},
	},
	{
		path: '/input',
		name: 'V3Input',
		component: V3InputDemo,
		meta: {
			title: '输入框',
		},
	},
	{
		path: '/input-number',
		name: 'V3InputNumber',
		component: V3InputNumberDemo,
		meta: {
			title: '数字输入框',
		},
	},
	{
		path: '/input-textarea',
		name: 'V3InputTextarea',
		component: V3InputTextareaDemo,
		meta: {
			title: '多行文本输入框',
		},
	},
	{
		path: '/radio',
		name: 'V3Radio',
		component: V3RadioDemo,
		meta: {
			title: '单选框',
		},
	},
	{
		path: '/radio-button',
		name: 'V3RadioButton',
		component: V3RadioButtonDemo,
		meta: {
			title: '单选按钮',
		},
	},
	{
		path: '/radio-group',
		name: 'V3RadioGroup',
		component: V3RadioGroupDemo,
		meta: {
			title: '单选框组',
		},
	},
	{
		path: '/demo-block',
		name: 'V3DemoBlock',
		component: V3DemoBlockDemo,
		meta: {
			title: '复杂案例框',
		},
	},
	{
		path: '/row',
		name: 'V3Row',
		component: V3RowDemo,
		meta: {
			title: '栅格系统-行',
		},
	},
	{
		path: '/col',
		name: 'V3Col',
		component: V3ColDemo,
		meta: {
			title: '栅格系统-列',
		},
	},
	{
		path: '/message',
		name: 'V3Message',
		component: V3MessageDemo,
		meta: {
			title: '消息提示',
		},
	},
	{
		path: '/select',
		name: 'V3Select',
		component: V3SelectDemo,
		meta: {
			title: '下拉框',
		},
	},
	{
		path: '/select-option',
		name: 'V3SelectOption',
		component: V3SelectOptionDemo,
		meta: {
			title: '下拉选项',
		},
	},
	{
		path: '/tag',
		name: 'V3Tag',
		component: V3TagDemo,
		meta: {
			title: '标签',
		},
	},
	{
		path: '/backdrop',
		name: 'V3Backdrop',
		component: V3BackdropDemo,
		meta: {
			title: '遮罩层',
		},
	},
	{
		path: '/dialog',
		name: 'V3Dialog',
		component: V3DialogDemo,
		meta: {
			title: '弹窗',
		},
	},
	{
		path: '/switch',
		name: 'V3Switch',
		component: V3SwitchDemo,
		meta: {
			title: '开关',
		},
	},
	{
		path: '/tooltip',
		name: 'V3Tooltip',
		component: V3TooltipDemo,
		meta: {
			title: '工具提示',
		},
	},
	{
		path: '/popover',
		name: 'V3Popover',
		component: V3PopoverDemo,
		meta: {
			title: '弹出消息',
		},
	},
	{
		path: '/divider',
		name: 'V3Divider',
		component: V3DividerDemo,
		meta: {
			title: '分割线',
		},
	},
	{
		path: '/space',
		name: 'V3Space',
		component: V3SpaceDemo,
		meta: {
			title: '间距',
		},
	},
	{
		path: '/badge',
		name: 'V3Badge',
		component: V3BadgeDemo,
		meta: {
			title: '徽标',
		},
	},
];
const routes: RouteRecordRaw[] = [
	{
		path: '/',
		component: Home,
		children: [...dynamcRoutes],
	},
];

export default createRouter({
	routes,
	history: createWebHistory(),
});
