import type { Config } from 'jest';

export default {
	testEnvironment: 'jsdom',
	transform: {
		'^.+\\.vue$': './vue3JestHack.js',
		// '^.+\\.vue$': '@vue/vue3-jest',
		'^.+\\.ts$': ['ts-jest', { tsconfig: `./tsconfig.json` }],
	},
	// testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(js|ts)$',
	testRegex: 'BasePopper\\.test\\.ts$',
	testPathIgnorePatterns: ['Select\\.test\\.ts'],
	moduleFileExtensions: ['vue', 'js', 'ts'],
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/$1',
		'^@common/(.*)$': '<rootDir>/packages/common/$1',
		'^@components/(.*)$': '<rootDir>/packages/components/$1',
		'^@typings/(.*)$': '<rootDir>/public/lib/typings/$1',
		'\\.(css|scss)$': 'identity-obj-proxy',
	},
	testEnvironmentOptions: {
		customExportConditions: ['node', 'node-addons'],
	},
	globals: {
		'vue-jest': {
			tsConfig: `./tsconfig.json`,
		},
	},
} as Config;
