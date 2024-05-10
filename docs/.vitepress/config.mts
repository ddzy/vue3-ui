import * as path from 'path';
import { defineConfig, postcssIsolateStyles } from 'vitepress';
import {
	demoblockPlugin,
	demoblockVitePlugin,
} from 'vitepress-theme-demoblock';

// https://vitepress.dev/reference/site-config
export default defineConfig({
	lastUpdated: true,
	cleanUrls: true,

	themeConfig: {
		// https://vitepress.dev/reference/default-theme-config
		nav: [
			{ text: '首页', link: '/' },
			{
				text: '组件',
				link: '/components/button',
				activeMatch: '^/components/',
			},
		],

		sidebar: {
			'/components/': [
				{
					text: '基础组件',
					items: [
						{
							text: 'Button 按钮',
							link: '/components/button',
						},
						{
							text: 'Back 返回',
							link: '/components/back',
						},
						{
							text: 'Backdrop 遮罩层',
							link: '/components/backdrop',
						},
						{
							text: 'Badge 徽标',
							link: '/components/badge',
						},
						{
							text: 'BasePopper 基础浮窗',
							link: '/components/base-popper',
						},
						{
							text: 'Card 卡片',
							link: '/components/card',
						},
						{
							text: 'Carousel 轮播',
							link: '/components/carousel',
						},
						{
							text: 'Checkbox 复选框',
							link: '/components/checkbox',
						},
						{
							text: 'Layout 布局',
							link: '/components/layout',
						},
						{
							text: 'DemoBlock 示例框',
							link: '/components/demo-block',
						},
						{
							text: 'Dialog 弹窗',
							link: '/components/dialog',
						},
						{
							text: 'Divider 分割线',
							link: '/components/divider',
						},
						{
							text: 'Drawer 抽屉',
							link: '/components/drawer',
						},
						{
							text: 'Input 输入框',
							link: '/components/input',
						},
						{
							text: 'InputNumber 数字输入框',
							link: '/components/input-number',
						},
						{
							text: 'InputTextarea 多行文本输入框',
							link: '/components/input-textarea',
						},
						{
							text: 'Loading 加载中',
							link: '/components/loading',
						},
						{
							text: 'Message 消息提示',
							link: '/components/message',
						},
						{
							text: 'Popconfirm 气泡确认框',
							link: '/components/popconfirm',
						},
						{
							text: 'Popover 弹出消息',
							link: '/components/popover',
						},
						{
							text: 'Progress 进度',
							link: '/components/progress',
						},
						{
							text: 'Radio 单选框',
							link: '/components/radio',
						},
						{
							text: 'Select 下拉选项',
							link: '/components/select',
						},
						{
							text: 'Slider 滑块',
							link: '/components/slider',
						},
						{
							text: 'Space 间隔',
							link: '/components/space',
						},
					],
				},
			],
		},
		outline: {
			level: 'deep',
		},

		socialLinks: [{ icon: 'github', link: 'https://github.com/ddzy/vue3-ui' }],
	},
	markdown: {
		config: (md) => {
			md.use(demoblockPlugin, {});
		},
	},
	vite: {
		server: {
			host: true,
			open: true,
		},
		plugins: [demoblockVitePlugin() as any],
		resolve: {
			alias: [
				{
					find: '@common',
					replacement: path.resolve(__dirname, '../../packages/common'),
				},
				{
					find: '@components',
					replacement: path.resolve(__dirname, '../../packages/components'),
				},
				{
					find: '@typings',
					replacement: path.resolve(__dirname, '../../public/lib/typings'),
				},
			],
		},
		css: {
			preprocessorOptions: {
				/** 配置 scss 全局变量的引入方式 */
				scss: {
					additionalData: `@import "@common/styles/variable.scss";\n@import "@common/styles/reset.scss";`,
				},
			},
			postcss: {
				plugins: [
					// 避免vitepress的样式(.vp-doc)影响 demo-block 内的样式
					// vitepress-theme-demoblock 已通过 pnpm patch 添加了 .vp-raw 类名
					postcssIsolateStyles({
						includeFiles: [/vp-doc\.css/],
					}),
				],
			},
		},
	},
});
