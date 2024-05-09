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
		config: md => {
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