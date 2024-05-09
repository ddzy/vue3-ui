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
			md.use(demoblockPlugin, {
				// 添加 .vp-raw，配合 postcssIsolateStyles，避免 vitepress 影响示例组件内部的样式
				customClass: 'demoblock vp-raw',
			});
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
					postcssIsolateStyles({
						includeFiles: [/vp-doc\.css/],
					}),
				],
			},
		},
	},
});
