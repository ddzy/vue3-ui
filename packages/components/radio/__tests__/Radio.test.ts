import { V3Radio } from '@components/main';
import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, test } from 'vitest';

describe('V3Radio 组件测试：', () => {
	// 自动清理 DOM
	afterEach(() => {
		document.getElementsByTagName('html')[0].innerHTML = '';
	});

	test('V3Radio 组件应该正常接收【border】属性，并展示为带有边框的单选按钮', async () => {
		const wrapper = mount(V3Radio);

		// 默认状态下，不带有边框
		expect(wrapper.find('.is-bordered').exists()).toBeFalsy();

		// 手动设置 border
		await wrapper.setProps({
			border: true,
		});
		expect(wrapper.find('.is-bordered').exists()).toBeTruthy();
	});

	test('V3Radio 组件应该正常接收【disabled】属性，并禁用特定的单选按钮', async () => {
		const wrapper = mount(V3Radio);

		// 默认状态下，都是可用的
		expect(wrapper.findAll('.is-disabled').length).toBe(0);

		// 手动禁用单选按钮
		await wrapper.setProps({
			disabled: true,
		});
		expect(wrapper.find('.is-disabled').exists()).toBeTruthy();
	});

	test('V3Radio 组件可以接收【size】配置项，用来控制单选框的尺寸', async () => {
		const wrapper = mount({
			components: {
				V3Radio,
			},
			template: `
				<v3-radio
					size="small"
					v-model="radioValue1"
					:label="1"
					:border="true"
					>小尺寸</v3-radio
				>
				<v3-radio
					size="medium"
					v-model="radioValue1"
					:label="2"
					:border="true"
					>默认尺寸</v3-radio
				>
				<v3-radio
					size="large"
					v-model="radioValue1"
					:label="3"
					:border="true"
					>大尺寸</v3-radio
				>

				<v3-radio size="small" v-model="radioValue2" :label="1"
					>小尺寸</v3-radio
				>
				<v3-radio size="medium" v-model="radioValue2" :label="2"
					>默认尺寸</v3-radio
				>
				<v3-radio size="large" v-model="radioValue2" :label="3"
					>大尺寸</v3-radio
				>
			`,
			data() {
				return {
					radioValue1: 1,
					radioValue2: 2,
				};
			},
		});

		expect(wrapper.findAll('.v3-radio').length).toBe(6);
		expect(wrapper.findAll('.v3-radio.is-size--small').length).toBe(2);
		expect(wrapper.findAll('.v3-radio.is-size--medium').length).toBe(2);
		expect(wrapper.findAll('.v3-radio.is-size--large').length).toBe(2);
		expect(
			wrapper.findAll('.v3-radio')[0].classes().includes('is-size--small'),
		).toBeTruthy();
		expect(
			wrapper.findAll('.v3-radio')[1].classes().includes('is-size--medium'),
		).toBeTruthy();
		expect(
			wrapper.findAll('.v3-radio')[2].classes().includes('is-size--large'),
		).toBeTruthy();
		expect(
			wrapper.findAll('.v3-radio')[3].classes().includes('is-size--small'),
		).toBeTruthy();
		expect(
			wrapper.findAll('.v3-radio')[4].classes().includes('is-size--medium'),
		).toBeTruthy();
		expect(
			wrapper.findAll('.v3-radio')[5].classes().includes('is-size--large'),
		).toBeTruthy();
	});
});
