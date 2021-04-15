module.exports = {
	title: 'vue3-ui',
	markdown: {
		lineNumbers: true,
		toc: {
			includeLevel: [1, 2, 3, 4],
		},
	},
	home: true,
	plugins: [
		'@vuepress/active-header-links',
		'@vuepress/back-to-top',
		'@vuepress/last-updated',
		'@vuepress/nprogress',
		'@vuepress/register-components',
	],
	themeConfig: {
		nav: [
			{ text: '首页', link: '/' },
			{ text: '指南', link: '/guide/' },
			{ text: '组件', link: '/components/' },
			{ text: 'Github', link: 'https://github.com/ddzy/vue3-ui' },
		],
		sidebar: {
			'/guide/': [
				{
					title: '快速开始',
					path: '/guide/quick-start/',
				},
			],
			'/components/': [
				{
					title: 'Button',
					path: '/components/button/',
				},
				{
					title: 'Icon',
					path: '/components/icon/',
				},
			],
		},
	},
};
