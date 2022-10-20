import { createRouter, RouteRecordRaw, createWebHistory } from 'vue-router';
import Home from './home.vue';

export const dynamcRoutes: RouteRecordRaw[] = [
	{
		path: '/button',
		name: 'V3Button',
		component: () => import('./button/button.md'),
		meta: {
			title: '按钮',
		},
	},
	{
		path: '/checkbox',
		name: 'V3Checkbox',
		component: () => import('./checkbox/checkbox.md'),
		meta: {
			title: '复选框',
		},
	},
	{
		path: '/input',
		name: 'V3Input',
		component: () => import('./input/input.md'),
		meta: {
			title: '输入框',
		},
	},
	{
		path: '/input-number',
		name: 'V3InputNumber',
		component: () => import('./input-number/input-number.md'),
		meta: {
			title: '数字输入框',
		},
	},
	{
		path: '/input-textarea',
		name: 'V3InputTextarea',
		component: () => import('./input-textarea/input-textarea.md'),
		meta: {
			title: '多行文本输入框',
		},
	},
	{
		path: '/radio',
		name: 'V3Radio',
		component: () => import('./radio/radio.md'),
		meta: {
			title: '单选框',
		},
	},
	{
		path: '/demo-block',
		name: 'V3DemoBlock',
		component: () => import('./demo-block/demo-block.md'),
		meta: {
			title: '案例展示框',
		},
	},
	{
		path: '/row',
		name: 'V3Row',
		component: () => import('./row/row.md'),
		meta: {
			title: '栅格系统',
		},
	},
	{
		path: '/message',
		name: 'V3Message',
		component: () => import('./message/message.md'),
		meta: {
			title: '消息提示',
		},
	},
	{
		path: '/select',
		name: 'V3Select',
		component: () => import('./select/select.md'),
		meta: {
			title: '下拉选项',
		},
	},
	{
		path: '/tag',
		name: 'V3Tag',
		component: () => import('./tag/tag.md'),
		meta: {
			title: '标签',
		},
	},
	{
		path: '/backdrop',
		name: 'V3Backdrop',
		component: () => import('./backdrop/backdrop.md'),
		meta: {
			title: '遮罩层',
		},
	},
	{
		path: '/dialog',
		name: 'V3Dialog',
		component: () => import('./dialog/dialog.md'),
		meta: {
			title: '弹窗',
		},
	},
	{
		path: '/switch',
		name: 'V3Switch',
		component: () => import('./switch/switch.md'),
		meta: {
			title: '开关',
		},
	},
	{
		path: '/tooltip',
		name: 'V3Tooltip',
		component: () => import('./tooltip/tooltip.md'),
		meta: {
			title: '工具提示',
		},
	},
	{
		path: '/popover',
		name: 'V3Popover',
		component: () => import('./popover/popover.md'),
		meta: {
			title: '弹出消息',
		},
	},
	{
		path: '/divider',
		name: 'V3Divider',
		component: () => import('./divider/divider.md'),
		meta: {
			title: '分割线',
		},
	},
	{
		path: '/space',
		name: 'V3Space',
		component: () => import('./space/space.md'),
		meta: {
			title: '间距',
		},
	},
	{
		path: '/badge',
		name: 'V3Badge',
		component: () => import('./badge/badge.md'),
		meta: {
			title: '徽标',
		},
	},
	{
		path: '/loading',
		name: 'V3Loading',
		component: () => import('./loading/loading.md'),
		meta: {
			title: '加载中',
		},
	},
	{
		path: '/card',
		name: 'V3Card',
		component: () => import('./card/card.md'),
		meta: {
			title: '卡片',
		},
	},
	{
		path: '/base-popper',
		name: 'V3BasePopper',
		component: () => import('./base-popper/base-popper.md'),
		meta: {
			title: '基础的浮窗',
		},
	},
	{
		path: '/popconfirm',
		name: 'V3Popconfirm',
		component: () => import('./popconfirm/popconfirm.md'),
		meta: {
			title: '气泡确认框',
		},
	},
	{
		path: '/slider',
		name: 'V3Slider',
		component: () => import('./slider/slider.md'),
		meta: {
			title: '滑块',
		},
	},
	{
		path: '/progress',
		name: 'V3Progress',
		component: () => import('./progress/progress.md'),
		meta: {
			title: '进度条',
		},
	},
	{
		path: '/carousel',
		name: 'V3Carousel',
		component: () => import('./carousel/carousel.md'),
		meta: {
			title: '轮播图',
		},
	},
	{
		path: '/drawer',
		name: 'V3Drawer',
		component: () => import('./drawer/drawer.md'),
		meta: {
			title: '抽屉',
		},
	},
	{
		path: '/back',
		name: 'V3Back',
		component: () => import('./back/back.md'),
		meta: {
			title: '返回',
		},
	},
];
const routes: RouteRecordRaw[] = [
	{
		path: '/',
		redirect: dynamcRoutes[0].path,
		component: Home,
		children: [...dynamcRoutes],
	},
];

export default createRouter({
	routes,
	history: createWebHistory('/vue3-ui/'),
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
