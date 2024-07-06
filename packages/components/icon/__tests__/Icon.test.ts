import { V3Icon } from '@components/main';
import { mount } from '@vue/test-utils';

describe('V3Icon组件单元测试：', () => {
	test('V3Icon 组件接收【type】，指定图标类型：', async () => {
		const wrapper = mount(V3Icon, {
			props: {
				type: 'Search',
			},
		});
		expect(wrapper.find('.v3-icon.v3-icon-search').exists()).toBeTruthy();
	});
});
