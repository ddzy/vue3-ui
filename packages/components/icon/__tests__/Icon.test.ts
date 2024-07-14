import { V3Icon } from '@components/main';
import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, test } from 'vitest';

describe('V3Icon组件单元测试：', () => {
	// 自动清理 DOM
	afterEach(() => {
		document.getElementsByTagName('html')[0].innerHTML = '';
	});

	test('V3Icon 组件接收【type】，指定图标类型：', async () => {
		const wrapper = mount(V3Icon, {
			props: {
				type: 'Search',
			},
		});
		expect(wrapper.find('.v3-icon.v3-icon-search').exists()).toBeTruthy();
	});
});
