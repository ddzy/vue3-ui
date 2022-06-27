import { createRouter, RouteRecordRaw, createWebHistory } from 'vue-router';

import Home from './home.vue';
import V3ButtonDemo from './button/button.md';
import V3CheckboxDemo from './checkbox/checkbox.md';
import V3InputDemo from './input/input.md';
import V3InputTextareaDemo from './input-textarea/input-textarea.md';
import V3InputNumberDemo from './input-number/input-number.md';
import V3RadioDemo from './radio/radio.md';
import V3DemoBlockDemo from './demo-block/demo-block.md';
import V3RowDemo from './row/row.md';
import V3MessageDemo from './message/message.md';
import V3SelectDemo from './select/select.md';

import V3TagDemo from './tag/tag.md';
import V3BackdropDemo from './backdrop/backdrop.md';
import V3DialogDemo from './dialog/dialog.md';
import V3SwitchDemo from './switch/switch.md';
import V3TooltipDemo from './tooltip/tooltip.md';
import V3PopoverDemo from './popover/popover.md';
import V3DividerDemo from './divider/divider.md';
import V3SpaceDemo from './space/space.md';
import V3BadgeDemo from './badge/badge.md';
import V3LoadingDemo from './loading/loading.md';
import V3CardDemo from './card/card.md';
import V3BasePopperDemo from './base-popper/base-popper.md';
import V3PopconfirmDemo from './popconfirm/src/App.vue';
import V3SliderDemo from './slider/slider.md';
import V3ProgressDemo from './progress/src/App.vue';
import V3CarouselDemo from './carousel/src/App.vue';
import V3DrawerDemo from './drawer/drawer.md';

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
		path: '/checkbox',
		name: 'V3Checkbox',
		component: V3CheckboxDemo,
		meta: {
			title: '复选框',
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
		path: '/demo-block',
		name: 'V3DemoBlock',
		component: V3DemoBlockDemo,
		meta: {
			title: '案例展示框',
		},
	},
	{
		path: '/row',
		name: 'V3Row',
		component: V3RowDemo,
		meta: {
			title: '栅格系统',
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
	{
		path: '/loading',
		name: 'V3Loading',
		component: V3LoadingDemo,
		meta: {
			title: '加载中',
		},
	},
	{
		path: '/card',
		name: 'V3Card',
		component: V3CardDemo,
		meta: {
			title: '卡片',
		},
	},
	{
		path: '/base-popper',
		name: 'V3BasePopper',
		component: V3BasePopperDemo,
		meta: {
			title: '基础的浮窗',
		},
	},
	{
		path: '/popconfirm',
		name: 'V3Popconfirm',
		component: V3PopconfirmDemo,
		meta: {
			title: '气泡确认框',
		},
	},
	{
		path: '/slider',
		name: 'V3Slider',
		component: V3SliderDemo,
		meta: {
			title: '滑块',
		},
	},
	{
		path: '/progress',
		name: 'V3Progress',
		component: V3ProgressDemo,
		meta: {
			title: '进度条',
		},
	},
	{
		path: '/carousel',
		name: 'V3Carousel',
		component: V3CarouselDemo,
		meta: {
			title: '轮播图',
		},
	},
	{
		path: '/drawer',
		name: 'V3Drawer',
		component: V3DrawerDemo,
		meta: {
			title: '抽屉',
		},
	},
];
const routes: RouteRecordRaw[] = [
	{
		path: '/',
		redirect: '/button',
		component: Home,
		children: [...dynamcRoutes],
	},
];

export default createRouter({
	routes,
	history: createWebHistory(),
	scrollBehavior(to) {
		let position: any = {};

		if (to.hash) {
			position = {
				el: to.hash,
				behavior: 'smooth',
			};
		} else {
			position = {
				top: 0,
				left: 0,
			};
		}

		return position;
	},
});
