import { h, nextTick } from 'vue';

import { V3Message, useMessage } from '@components/main';
import { config, mount } from '@vue/test-utils';
import { afterEach, describe, expect, test, vi } from 'vitest';

vi.useFakeTimers();

function generateWrapper() {
	document.body.innerHTML = `
    <div>
      <h1>vue3-ui</h1>
      <div id="app"></div>
    </div>
  `;
}

config.plugins.VueWrapper.install(() => {
	return {
		$message: V3Message,
		useMessage,
	};
});

describe('V3Message 组件测试：', () => {
	// 自动清理 DOM
	afterEach(() => {
		document.getElementsByTagName('html')[0].innerHTML = '';
	});

	test('V3Message 组件可接收【type、message、duration】等配置项，并通过【this.$message】来直接使用', async () => {
		generateWrapper();

		const wrapper = mount({
			attachTo: document.getElementById('app'),
			template: `
        <div></div>
      `,
		});

		wrapper.$message({
			type: 'success',
			message: '成功消息！',
			duration: 0,
		});
		wrapper.$message({
			type: 'danger',
			message: '失败消息！',
			duration: 0,
		});

		await nextTick();

		expect(document.body.querySelectorAll('.v3-message').length).toBe(2);
		expect(
			document.body.querySelector('.v3-message--success').textContent,
		).toBe('成功消息！');
		expect(document.body.querySelector('.v3-message--danger').textContent).toBe(
			'失败消息！',
		);
	});

	test('V3Message 组件可接收【dangerouslyUseHTMLString】配置项，用来控制是否将【message】显示为 HTML', async () => {
		generateWrapper();

		const wrapper = mount({
			attachTo: document.getElementById('app'),
			template: `
        <div></div>
      `,
		});

		wrapper.$message({
			type: 'success',
			message: '<span class="test-text">测试文本</span>',
			duration: 0,
			dangerouslyUseHTMLString: true,
		});

		await nextTick();

		expect(document.body.querySelectorAll('.v3-message').length).toBe(1);
		expect(document.body.querySelector('.test-text')).toBeTruthy();
		expect(
			document.body.querySelector('.v3-message--success').textContent,
		).toBe('测试文本');
	});

	test('V3Message 组件可接收【customClass】配置项，用来自定义类名', async () => {
		generateWrapper();

		const wrapper = mount({
			attachTo: document.getElementById('app'),
			template: `
        <div></div>
      `,
		});

		wrapper.$message({
			type: 'success',
			message: '测试文本',
			duration: 0,
			customClass: 'test-message-wrapper',
		});

		await nextTick();

		expect(document.body.querySelectorAll('.v3-message').length).toBe(1);
		expect(document.body.querySelector('.test-message-wrapper')).toBeTruthy();
		expect(
			document.body
				.querySelector('.v3-message--success')
				.classList.contains('test-message-wrapper'),
		).toBeTruthy();
	});

	test('V3Message 组件可接收【showClose】配置项，用来控制是否显示关闭按钮', async () => {
		generateWrapper();

		const wrapper = mount({
			attachTo: document.getElementById('app'),
			template: `
        <div></div>
      `,
		});

		const message = wrapper.$message({
			type: 'success',
			message: '测试文本',
			duration: 0,
			showClose: true,
		});

		await nextTick();

		expect(document.body.querySelector('.v3-message__close')).toBeTruthy();
		expect(
			document.body
				.querySelector('.v3-message')
				.classList.contains('is-closeable'),
		).toBeTruthy();
	});

	test('V3Message 可以被手动关闭', async () => {
		generateWrapper();

		const wrapper = mount({
			attachTo: document.getElementById('app'),
			template: `
        <div></div>
      `,
		});

		const message = wrapper.$message({
			type: 'success',
			message: '测试文本',
			duration: 0,
			showClose: true,
		});

		expect(document.body.querySelector('.v3-message')).toBeTruthy();

		// 手动关闭消息框
		await message.close();
		await nextTick();

		expect(document.body.querySelector('.v3-message')).toBeFalsy();
	});

	test('V3Message 可以接收【icon】配置项，用来自定义消息框的图标', async () => {
		generateWrapper();

		const wrapper = mount({
			attachTo: document.getElementById('app'),
			template: `
        <div></div>
      `,
		});

		wrapper.$message({
			type: 'success',
			message: '测试文本',
			icon: 'CloseSmall',
			duration: 0,
		});

		expect(
			document.body.querySelector(
				'.v3-message .v3-message__icon .v3-icon-close-small',
			),
		).toBeInstanceOf(HTMLElement);
	});

	test('V3Message 的【message】的值可以为 VNode', async () => {
		generateWrapper();

		const wrapper = mount({
			attachTo: document.getElementById('app'),
			template: `
        <div></div>
      `,
		});

		wrapper.$message({
			type: 'success',
			message: h('span', 'vnode内容'),
			icon: 'CloseSmall',
			duration: 0,
		});

		expect(
			document.body.querySelector('.v3-message .v3-message__content')
				.textContent,
		).toBe('vnode内容');
	});

	test('V3Message 可以接收【center】配置项，用来居中文本内容', async () => {
		generateWrapper();

		const wrapper = mount({
			attachTo: document.getElementById('app'),
			template: `
        <div></div>
      `,
		});

		wrapper.$message({
			type: 'success',
			message: `测试内容`,
			duration: 0,
			center: true,
		});

		expect(
			document.querySelector('.v3-message').classList.contains('is-center'),
		).toBeTruthy();
	});

	test('V3Message 可以接收【onClose】配置项，用来阻止消息框的关闭', async () => {
		generateWrapper();

		const wrapper = mount({
			attachTo: document.getElementById('app'),
			template: `
        <div></div>
      `,
		});

		wrapper.$message({
			type: 'success',
			message: `测试内容1`,
			onClose(done) {},
		});
		wrapper.$message({
			type: 'success',
			message: `测试内容2`,
			onClose(done) {
				done();
			},
		});

		setTimeout(async () => {
			await nextTick();

			expect(document.querySelectorAll('.v3-message').length).toBe(1);
			expect(
				document.querySelector('.v3-message .v3-message__content').textContent,
			).toBe('测试内容1');
		}, 4000);

		vi.advanceTimersByTime(4000);
	});

	test('V3Message 组件可以通过 Composition 的形式使用', async () => {
		generateWrapper();

		const wrapper = mount({
			attachTo: document.getElementById('app'),
			template: `
        <div></div>
      `,
		});

		wrapper.useMessage({
			type: 'success',
			message: '成功消息！',
			duration: 0,
		});
		wrapper.useMessage({
			type: 'danger',
			message: '失败消息！',
			duration: 0,
		});

		await nextTick();

		expect(document.body.querySelectorAll('.v3-message').length).toBe(2);
		expect(
			document.body.querySelector('.v3-message--success').textContent,
		).toBe('成功消息！');
		expect(document.body.querySelector('.v3-message--danger').textContent).toBe(
			'失败消息！',
		);
	});
});
