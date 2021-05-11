import {
	defineUserConfig,
	DefaultThemeOptions,
	WebpackBundlerOptions,
} from 'vuepress';
import * as path from 'path';

export default defineUserConfig<DefaultThemeOptions, WebpackBundlerOptions>({
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
		repo: 'https://github.com/ddzy/vue3-ui',
		themePlugins: {
			activeHeaderLinks: true,
			backToTop: true,
			nprogress: true,
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
					children: [],
				},
			],
			'/components/': [
				{
					isGroup: true,
					text: '基础组件',
					children: ['/components/button.md', '/components/icon.md'],
				},
			],
		},
	},
	open: true,
	host: '127.0.0.1',
	port: 4000,
	alias: {
		'@common': path.resolve(__dirname, '../../packages/common'),
		'@components': path.resolve(__dirname, '../../packages/components'),
	},
	// bundlerConfig: {
	// 	scss: {
	// 		additionalData: async (content, loaderContext) => {
	// 			// const newContent = `@import "${path.resolve(
	// 			// 	__dirname,
	// 			// 	'../../packages/common/styles/global-variable'
	// 			// )}"; ${content}`;

	// 			// console.log('newContent :>> ', newContent);

	// 			// return newContent;

	// 			const { resourcePath, rootContext } = loaderContext;
	// 			const relativePath = path.relative(rootContext, resourcePath);

	// 			if (relativePath === 'styles/foo.scss') {
	// 				return '$value: 100px;' + content;
	// 			}

	// 			return '$value: 200px;' + content;
	// 		},
	// 	},
	// },
});
