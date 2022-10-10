import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import V3Tag from '../main';

describe('Tag 组件测试：', () => {
	test('Tag 组件有五种内置的【type】类型', async () => {
		const wrapper = mount({
			template: `
        <div>
          <v3-tag type="primary">标签1</v3-tag>
          <v3-tag type="success">标签2</v3-tag>
          <v3-tag type="danger">标签3</v3-tag>
          <v3-tag type="warning">标签4</v3-tag>
          <v3-tag type="info">标签5</v3-tag>
        </div>
      `,
			components: {
				V3Tag,
			},
		});

		expect(wrapper.findAll('.v3-tag').length).toBe(5);
		expect(wrapper.find('.v3-tag--primary').exists()).toBeTruthy();
		expect(wrapper.find('.v3-tag--success').exists()).toBeTruthy();
		expect(wrapper.find('.v3-tag--danger').exists()).toBeTruthy();
		expect(wrapper.find('.v3-tag--warning').exists()).toBeTruthy();
		expect(wrapper.find('.v3-tag--info').exists()).toBeTruthy();

		expect(wrapper.find('.v3-tag--primary').text()).toBe('标签1');
		expect(wrapper.find('.v3-tag--success').text()).toBe('标签2');
		expect(wrapper.find('.v3-tag--danger').text()).toBe('标签3');
		expect(wrapper.find('.v3-tag--warning').text()).toBe('标签4');
		expect(wrapper.find('.v3-tag--info').text()).toBe('标签5');
	});

	test('Tag 组件有三种内置的尺寸，并且可以通过传递【size】属性来自定义尺寸', async () => {
		const wrapper = mount({
			template: `
        <div>
          <v3-tag size="small" type="primary">小号</v3-tag>
          <v3-tag size="medium" type="primary">中等</v3-tag>
          <v3-tag size="large" type="primary">大号</v3-tag>
        </div>
      `,
			components: {
				V3Tag,
			},
		});

		expect(wrapper.findAll('.v3-tag').length).toBe(3);
		expect(wrapper.findAll('.v3-tag--primary').length).toBe(3);
		expect(wrapper.find('.is-size--small').text()).toBe('小号');
		expect(wrapper.find('.is-size--medium').text()).toBe('中等');
		expect(wrapper.find('.is-size--large').text()).toBe('大号');
	});

	test('Tag 组件可以接收【plain】，自定义是否开启朴素状态', async () => {
		const wrapper = mount({
			template: `
        <div>
          <v3-tag type="primary" :plain="true">标签1</v3-tag>
          <v3-tag type="success" :plain="true">标签2</v3-tag>
          <v3-tag type="danger" :plain="true">标签3</v3-tag>
          <v3-tag type="warning" :plain="true">标签4</v3-tag>
          <v3-tag type="info" :plain="true">标签5</v3-tag>
        </div>
      `,
			components: {
				V3Tag,
			},
		});

		expect(wrapper.findAll('.v3-tag').length).toBe(5);
		expect(wrapper.findAll('.is-plain').length).toBe(5);
	});

	test('Tag 组件可以接收【closeable】配置项，可决定是否可关闭', async () => {
		const wrapper = mount({
			template: `
        <div>
          <v3-tag type="primary" :plain="false" :closeable="true">标签1</v3-tag>
          <v3-tag type="success" :plain="false" :closeable="true">标签2</v3-tag>
          <v3-tag type="danger" :plain="false" :closeable="true">标签3</v3-tag>
          <v3-tag type="warning" :plain="false" :closeable="true">标签4</v3-tag>
          <v3-tag type="info" :plain="false":closeable="true">标签5</v3-tag>
        </div>
      `,
			components: {
				V3Tag,
			},
		});

		expect(wrapper.findAll('.v3-tag').length).toBe(5);
		expect(wrapper.findAll('.is-closeable').length).toBe(5);

		await wrapper.find('.v3-tag .v3-icon').trigger('click');
		await nextTick();
		expect(wrapper.find('.v3-tag').text()).toBe('标签2');
		expect(wrapper.emitted()).toHaveProperty('click');
	});

	test('Tag 组件可以接收【animation】配置项，可决定是否开启动画效果', async () => {
		const wrapper = mount({
			template: `
        <div>
          <v3-tag type="primary" :plain="false" :closeable="true" :animation="true">标签1</v3-tag>
          <v3-tag type="success" :plain="false" :closeable="true" :animation="true">标签2</v3-tag>
          <v3-tag type="danger" :plain="false" :closeable="true" :animation="true">标签3</v3-tag>
          <v3-tag type="warning" :plain="false" :closeable="true" :animation="true">标签4</v3-tag>
          <v3-tag type="info" :plain="false":closeable="true" :animation="true">标签5</v3-tag>
        </div>
      `,
			components: {
				V3Tag,
			},
		});

		expect(wrapper.findAll('.v3-tag').length).toBe(5);
		expect(wrapper.findAll('.is-closeable').length).toBe(5);
		expect(wrapper.findAll('.is-animation').length).toBe(5);

		await wrapper.find('.v3-tag .v3-icon').trigger('click');
		await nextTick();
		expect(wrapper.find('.v3-tag').text()).toBe('标签2');
		expect(wrapper.emitted()).toHaveProperty('click');
	});

	test('Tag 组件可以接收【color、backgroundColor、borderColor】配置项，可自定义标签的颜色', async () => {
		const wrapper = mount({
			template: `
        <div>
          <v3-tag
            color="#fff"
            backgroundColor="rgba(218, 112, 214, .5)"
            borderColor="rgba(218, 112, 214, 1)"
            >标签2</v3-tag
          >
        </div>
      `,
			components: {
				V3Tag,
			},
		});

		expect(wrapper.find('.v3-tag').attributes().style).toBe(
			'background-color: rgba(218, 112, 214, 0.5); color: rgb(255, 255, 255); border-color: rgba(218, 112, 214, 1);'
		);
	});
});
