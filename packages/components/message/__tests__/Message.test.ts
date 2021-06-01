// @ts-nocheck

import { nextTick } from '@vue/runtime-core';
import { mount, config } from '@vue/test-utils';
import V3Message from '../src/components/MessageConstructor';

jest.useFakeTimers();

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
	};
});

describe('Message 组件测试：', () => {
	test('Message 组件可接收【type、message、duration】等配置项，并通过【this.$message】来直接使用', async () => {
		generateWrapper();

		const wrapper1 = mount({
			attachTo: document.getElementById('app'),
			template: `
        <div></div>
      `,
		});

		wrapper1.$message({
			type: 'success',
			message: '成功消息！',
			duration: 0,
		});
		wrapper1.$message({
			type: 'danger',
			message: '失败消息！',
			duration: 0,
		});

		await nextTick();

		expect(document.body.querySelectorAll('.v3-message').length).toBe(2);
		expect(
			document.body.querySelector('.v3-message--success')?.textContent
		).toBe('成功消息！');
		expect(
			document.body.querySelector('.v3-message--danger')?.textContent
		).toBe('失败消息！');
	});

	test('Message 组件可接收【dangerouslyUseHTMLString】配置项，用来控制是否将【message】显示为 HTML', async () => {
		generateWrapper();

		const wrapper1 = mount({
			attachTo: document.getElementById('app'),
			template: `
        <div></div>
      `,
		});

		wrapper1.$message({
			type: 'success',
			message: '<span class="test-text">测试文本</span>',
			duration: 0,
			dangerouslyUseHTMLString: true,
		});

		await nextTick();

		expect(document.body.querySelectorAll('.v3-message').length).toBe(1);
		expect(document.body.querySelector('.test-text')).toBeTruthy();
		expect(
			document.body.querySelector('.v3-message--success')?.textContent
		).toBe('测试文本');
	});

	test('Message 组件可接收【customClass】配置项，用来自定义类名', async () => {
		generateWrapper();

		const wrapper1 = mount({
			attachTo: document.getElementById('app'),
			template: `
        <div></div>
      `,
		});

		wrapper1.$message({
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
				?.classList.contains('test-message-wrapper')
		).toBeTruthy();
	});

	test('Message 组件可接收【showClose】配置项，用来控制是否显示关闭按钮', async () => {
		generateWrapper();

		const wrapper1 = mount({
			attachTo: document.getElementById('app'),
			template: `
        <div></div>
      `,
		});

		const message1 = wrapper1.$message({
			type: 'success',
			message: '测试文本',
			duration: 0,
			showClose: true,
		});

		await nextTick();

		expect(document.body.querySelector('.v3-message__close')).toBeTruthy();
	});

	test('Message 可以被手动关闭', async () => {
		generateWrapper();

		const wrapper1 = mount({
			attachTo: document.getElementById('app'),
			template: `
        <div></div>
      `,
		});

		const message1 = wrapper1.$message({
			type: 'success',
			message: '测试文本',
			duration: 0,
			showClose: true,
		});

		expect(document.body.querySelector('.v3-message')).toBeTruthy();

		// 手动关闭消息框
		await message1.close();
		await nextTick();

		expect(document.body.querySelector('.v3-message')).toBeFalsy();
	});
});
