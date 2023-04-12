module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	transform: {
		'^.+\\.vue$': 'vue-jest',
		'^.+\\.ts$': 'ts-jest',
	},
	testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(js|ts)$',
	testPathIgnorePatterns: ['Select\\.test\\.ts'],
	moduleFileExtensions: ['vue', 'js', 'ts'],
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/$1',
		'^@common/(.*)$': '<rootDir>/packages/common/$1',
		'^@components/(.*)$': '<rootDir>/packages/components/$1',
		"^@typings/(.*)$": "<rootDir>/public/lib/typings/$1",
		'\\.(css|scss)$': 'identity-obj-proxy',
	},
};
