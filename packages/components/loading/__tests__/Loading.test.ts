// @ts-nocheck

import { mount, config } from '@vue/test-utils';
import V3Loading, { LoadingDirective, useLoading } from '../main';
import V3Button from '@components/button/main';
import { nextTick, h } from 'vue';

jest.useFakeTimers();

config.plugins.VueWrapper.install(() => {
	return {
		$loading: V3Loading,
	};
});

describe('V3Loading 组件测试：', () => {
	test('V3Loading 组件基本用法', async () => {
		const wrapper = mount({
			template: `
        <div></div>
      `,
		});

		expect(document.body.querySelector('.v3-loading')).toBeFalsy();

		const instance = wrapper.$loading({
			fullscreen: true,
			content: '加载中。。。',
		});

		await nextTick();
		expect(document.body.querySelector('.v3-loading')).toBeTruthy();
		expect(
			(document.body.querySelector('.v3-loading') as HTMLElement).classList,
		).toContain('is-fullscreen');
		expect(
			(document.body.querySelector('.v3-loading') as HTMLElement).classList,
		).toContain('is-fixed');
		expect(
			document.body.querySelector('.v3-loading .v3-loading__content span')
				.innerHTML,
		).toContain('加载中。。。');

		setTimeout(async () => {
			instance.close();
			await nextTick();

			expect(document.body.querySelector('.v3-loading')).toBeFalsy();
		}, 3000);
		jest.advanceTimersByTime(3000);
	});

	test('V3Loading 组件可以接收 VNode，用来自定义内容', async () => {
		const wrapper = mount({
			template: `
        <div></div>
      `,
		});

		const instance = wrapper.$loading({
			fullscreen: true,
			content: h(
				V3Button,
				{
					onClick: () => {
						instance.close();
					},
				},
				() => '关闭',
			),
		});

		await nextTick();
		document.body.querySelector('.v3-button').click();
		await nextTick();
		expect(document.body.querySelector('.v3-loading')).toBeFalsy();
	});

	test('V3Loading 组件可以以自定义指令的方式在容器中使用：', async () => {
		const wrapper = mount({
			template: `
        <div class="loading-wrapper" v-loading="loading"></div>
      `,
			props: {
				loading: {
					type: Boolean,
					default: false,
				},
			},
			directives: {
				[LoadingDirective.name]: LoadingDirective.directive,
			},
		});

		expect(document.querySelector('.v3-loading')).toBeFalsy();

		await wrapper.setProps({
			loading: true,
		});
		expect(wrapper.find('.loading-wrapper').classes()).toContain(
			'v3-loading-parent--relative',
		);
		expect(wrapper.find('.loading-wrapper .v3-loading').exists()).toBeTruthy();

		await wrapper.setProps({
			loading: false,
		});
		expect(wrapper.find('.loading-wrapper .v3-loading').exists()).toBeFalsy();
	});

	test('V3Loading 组件可以通过自定义指令传递多个值：', async () => {
		const wrapper = mount({
			template: `
        <div class="loading-wrapper" v-loading="{
					loading,
					content: '加载中...',
					color: '#fff',
				}"></div>
      `,
			props: {
				loading: {
					type: Boolean,
					default: false,
				},
			},
			directives: {
				[LoadingDirective.name]: LoadingDirective.directive,
			},
		});

		expect(document.querySelector('.v3-loading')).toBeFalsy();

		await wrapper.setProps({
			loading: true,
		});
		expect(wrapper.find('.loading-wrapper .v3-loading').exists()).toBeTruthy();
		expect(wrapper.find('.loading-wrapper .v3-loading__content').text()).toBe(
			'加载中...',
		);
		expect(
			wrapper.find('.loading-wrapper .v3-loading').attributes().style,
		).toContain('color: rgb(255, 255, 255)');
	});

	test('V3Loading 组件可以通过 Composition API 的方式调用：', async () => {
		const wrapper = mount({
			template: `
        <div></div>
      `,
		});

		expect(document.querySelector('.v3-loading')).toBeFalsy();

		const { instance } = useLoading({
			fullscreen: true,
			content: h(
				V3Button,
				{
					onClick: () => {
						instance.close();
					},
				},
				() => '取消',
			),
		});

		expect(document.querySelector('.v3-loading')).toBeTruthy();

		await nextTick();
		document.body.querySelector('.v3-button').click();
		await nextTick();
		expect(document.body.querySelector('.v3-loading')).toBeFalsy();
	});
});
