module.exports = {
	eslintIntegration: true,
	// 是否加分号
	semi: true,
	endOfLine: 'auto',
	// Tab 缩进的长度
	tabWidth: 2,
	// 是否使用 Tab 缩进
	useTabs: true,
	// 箭头函数只有一个参数时，是否书写括号
	arrowParens: 'always',
	// https://prettier.io/docs/en/options#bracket-line
	// jsx 开标签的闭合符号是否与属性写在同一行
	bracketSameLine: false,
	// 是否采用单引号
	singleQuote: true,
	// HTML 元素的换行处理
	htmlWhitespaceSensitivity: 'css',
	// 尾随逗号
	trailingComma: 'all',
	plugins: ['@trivago/prettier-plugin-sort-imports'],
	importOrder: ['^(vue)(.*)', '<THIRD_PARTY_MODULES>', '@/(.*)', '^[./]'],
	importOrderSeparation: true,
	importOrderSortSpecifiers: true,
	importOrderGroupNamespaceSpecifiers: true,
};
