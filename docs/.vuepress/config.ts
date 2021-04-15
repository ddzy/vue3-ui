import { defineUserConfig, DefaultThemeOptions } from 'vuepress';

export default defineUserConfig<DefaultThemeOptions>({
	title: 'vue3-ui',
	markdown: {
		code: {
			lineNumbers: true,
		},
		toc: {
			level: [1, 2, 3, 4],
		},
	},
	themeConfig: {
		repo: "https://github.com/ddzy/vue3-ui",
		themePlugins: {
			activeHeaderLinks: true,
			backToTop: true,
			nprogress: true
		},
		navbar: [
			{ text: '首页', link: '/' },
			{ text: '指南', link: '/guide/' },
			{ text: '组件', link: '/components/' },
		],
		sidebar: {
			'/guide/': [
				{
					text: '快速开始',
					link: '/guide/quick-start/',
					children: []
				},
			],
			'/components/': [
				{
					isGroup: true,
					text: "基础组件",
					children: [
						'/components/button.md',
						'/components/icon.md',
					]
				},
			],
		},
	},

})
