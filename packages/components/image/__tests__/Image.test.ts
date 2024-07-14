import { V3Image } from '@components/main';
import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, test } from 'vitest';

describe('V3Image 组件测试：', () => {
	const src =
		'data:image/png;base64,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';

	// 自动清理 DOM
	afterEach(() => {
		document.getElementsByTagName('html')[0].innerHTML = '';
	});

	test('V3Image 组件应该正常渲染', async () => {
		const wrapper = mount(V3Image, {
			props: {
				src,
			},
		});

		expect(wrapper.find('.v3-image').exists()).toBeTruthy();
	});

	test('V3Image 组件接收【rounded】，可显示为圆形头像', async () => {
		const wrapper = mount(V3Image, {
			props: {
				src,
				rounded: true,
			},
		});

		expect(wrapper.find('.v3-image').classes()).toContain('is-rounded');
	});

	test('V3Image 组件接收【showToolbar】，自定义是否显示预览工具栏', async () => {
		const wrapper = mount(V3Image, {
			props: {
				src,
				showToolbar: true,
			},
		});

		expect(wrapper.find('.v3-image').classes()).toContain('has-toolbar');
	});

	test('V3Image 组件接收【animation】，控制图片是否有淡入淡出效果', async () => {
		const wrapper = mount(V3Image, {
			props: {
				src,
				animated: true,
			},
		});

		expect(wrapper.find('.v3-image').classes()).toContain('has-animation');
	});

	test('V3Image 组件接收【showLoading】，控制图片是否有loading效果', async () => {
		const wrapper = mount(V3Image, {
			props: {
				src,
				showLoading: true,
			},
		});

		expect(wrapper.find('.v3-image').classes()).toContain('has-loading');
	});

	test('V3Image 组件接收【preview】，控制是否开启点击预览', async () => {
		const wrapper = mount(V3Image, {
			props: {
				src,
				preview: true,
			},
		});

		expect(wrapper.find('.v3-image').classes()).toContain('can-preview');
	});
});
