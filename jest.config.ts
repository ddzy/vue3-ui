import type { Config } from 'jest';

export default {
	testEnvironment: 'jsdom',
	transform: {
		'^.+\\.vue$': [
			// 不直接引入 @vue/vue3-jest
			// 解决 defineProps 无法引入外部类型导致的错误
			'./vue3JestHack.js',
			{
				tsConfig: `./tsconfig.json`,
			},
		],
		'^.+\\.ts$': [
			'ts-jest',
			{
				tsconfig: `./tsconfig.json`,
				// 禁用 ts 类型检查
				diagnostics: {
					exclude: ['**'],
				},
			},
		],
	},
	// testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(js|ts)$',
	testRegex: '/__tests__/Dialog\\.test\\.ts$',
	testPathIgnorePatterns: ['Select\\.test\\.ts'],
	moduleFileExtensions: ['vue', 'js', 'ts'],
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/$1',
		'^@common/(.*)$': '<rootDir>/packages/common/$1',
		'^@components/(.*)$': '<rootDir>/packages/components/$1',
		'^@typings/(.*)$': '<rootDir>/public/typings/$1',
		'\\.(css|scss)$': 'identity-obj-proxy',
	},
	testEnvironmentOptions: {
		customExportConditions: ['node', 'node-addons'],
	},
	testRunner: 'jest-jasmine2',
} as Config;
