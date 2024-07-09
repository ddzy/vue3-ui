import { nextTick } from 'vue';

import { V3InputNumber } from '@components/main';
import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, test } from 'vitest';

describe('V3InputNumber 组件测试：', () => {
	// 自动清理 DOM
	afterEach(() => {
		document.getElementsByTagName('html')[0].innerHTML = '';
	});

	test('V3InputNumber 接收【step】，并按照指定的步长来递增或递减', async () => {
		const wrapper = mount(V3InputNumber, {
			props: {
				modelValue: 0,
				'onUpdate:modelValue': (e: number) =>
					wrapper.setProps({ modelValue: e }),
				step: 2,
				controlsPosition: 'both',
			},
		});

		// 手动点击【递增】按钮
		await wrapper.find('.v3-number__plus-wrapper').trigger('click');
		expect(wrapper.find('input').element.value).toBe('2');
		expect(wrapper.props('modelValue')).toBe(2);

		// 手动点击【递减】按钮
		await wrapper.find('.v3-number__minus-wrapper').trigger('click');
		expect(wrapper.find('input').element.value).toBe('0');
		expect(wrapper.props('modelValue')).toBe(0);
	});

	test('V3InputNumber 接收【stepStrictly】，限制输入值只能是步数【step】的倍数', async () => {
		const wrapper = mount(V3InputNumber, {
			props: {
				modelValue: 2,
				'onUpdate:modelValue': (e: number) =>
					wrapper.setProps({ modelValue: e }),
				step: 2,
				stepStrictly: true,
				controlsPosition: 'both',
			},
		});

		// 初始值是 2
		expect(wrapper.find('input').element.value).toBe('2');

		// 手动点击【递增】按钮
		await wrapper.find('.v3-number__plus-wrapper').trigger('click');
		expect(wrapper.find('input').element.value).toBe('4');
		expect(wrapper.props('modelValue')).toBe(4);

		// 手动点击【递减】按钮
		await wrapper.find('.v3-number__minus-wrapper').trigger('click');
		expect(wrapper.find('input').element.value).toBe('2');
		expect(wrapper.props('modelValue')).toBe(2);

		// 输入一个小数值
		await wrapper.find('input').setValue('3.333');
		await wrapper.find('input').trigger('change');
		expect(wrapper.find('input').element.value).toBe('4');
		expect(wrapper.props('modelValue')).toBe(4);

		await wrapper.find('input').setValue('2.333');
		await wrapper.find('input').trigger('change');
		expect(wrapper.find('input').element.value).toBe('2');
		expect(wrapper.props('modelValue')).toBe(2);
	});

	test('V3InputNumber 接收【precision】参数，限制最终值需要保留的位数', async () => {
		const wrapper = mount(V3InputNumber, {
			props: {
				modelValue: 0,
				'onUpdate:modelValue': (e: number) =>
					wrapper.setProps({ modelValue: e }),
				precision: 2,
				controlsPosition: 'both',
			},
		});

		// 第一次【递增】
		await wrapper.find('.v3-number__plus-wrapper').trigger('click');
		expect(wrapper.find('input').element.value).toBe('1');
		expect(wrapper.props('modelValue')).toBe(1);

		// 第一次【递减】
		await wrapper.find('.v3-number__minus-wrapper').trigger('click');
		expect(wrapper.find('input').element.value).toBe('0');
		expect(wrapper.props('modelValue')).toBe(0);

		// 第一次手动输入小数
		await wrapper.find('input').setValue('3.333');
		await wrapper.find('input').trigger('change');
		expect(wrapper.find('input').element.value).toBe('3.33');
		expect(wrapper.props('modelValue')).toBe(3.33);

		// 第二次手动输入小数
		await wrapper.find('input').setValue('2.356');
		await wrapper.find('input').trigger('change');
		expect(wrapper.find('input').element.value).toBe('2.36');
		expect(wrapper.props('modelValue')).toBe(2.36);
	});

	test('V3InputNumber 接收【disabled、readonly】并进入【禁用、只读】状态', async () => {
		const wrapper = mount(V3InputNumber);

		await wrapper.setProps({
			modelValue: 0,
			disabled: true,
		});
		expect(wrapper.find('input').attributes.hasOwnProperty('disabled'));
		// 禁用状态下，点击递增按钮
		await wrapper.find('.v3-number__plus-wrapper').trigger('click');
		expect(wrapper.find('input').element.value).toBe('0');
		expect(wrapper.props('modelValue')).toBe(0);

		await wrapper.setProps({
			readonly: true,
			disabled: false,
		});
		// 只读状态下，点击递增按钮
		await wrapper.find('.v3-number__plus-wrapper').trigger('click');
		expect(wrapper.find('input').element.value).toBe('0');
		expect(wrapper.props('modelValue')).toBe(0);
	});

	test('V3InputNumber 接收【min、max】参数，在值变化的时候禁用控制按钮并且重置输入框中的值', async () => {
		const wrapper = mount(V3InputNumber, {
			props: {
				modelValue: 0,
				'onUpdate:modelValue': (e: number) =>
					wrapper.setProps({ modelValue: e }),
				min: 0,
				max: 10,
				step: 10,
			},
		});

		// 递增一次，如果大于或等于最大值，则禁用【递增】控制按钮
		await wrapper.find('.v3-number__plus-wrapper').trigger('click');
		await wrapper.find('.v3-number__plus-wrapper').trigger('click');
		expect(wrapper.find('input').element.value).toBe('10');
		expect(wrapper.props('modelValue')).toBe(10);

		// 递减一次，如果小于或等于最小值，则禁用【递减】控制按钮
		await wrapper.find('.v3-number__minus-wrapper').trigger('click');
		await wrapper.find('.v3-number__minus-wrapper').trigger('click');
		expect(wrapper.find('input').element.value).toBe('0');
		expect(wrapper.props('modelValue')).toBe(0);

		// 如果初始值大于或小于最小值，那么将其重置为最大值或最小值
		await wrapper.setProps({
			modelValue: 20,
		});
		await nextTick();
		expect(wrapper.find('input').element.value).toBe('10');
		expect(wrapper.props('modelValue')).toBe(10);

		await wrapper.setProps({
			modelValue: -20,
		});
		await nextTick();
		expect(wrapper.find('input').element.value).toBe('0');
		expect(wrapper.props('modelValue')).toBe(0);
	});

	test('V3InputNumber 接收【size】配置项，用来控制输入框的尺寸', async () => {
		const wrapper = mount({
			components: {
				V3InputNumber,
			},
			template: `
				<v3-input-number
					v-model="inputValue"
					size="small"
				></v3-input-number>

				<v3-input-number
					v-model="inputValue"
					size="medium"
				></v3-input-number>

				<v3-input-number
					v-model="inputValue"
					size="large"
				></v3-input-number>
			`,
			data() {
				return {
					inputValue: 0,
				};
			},
		});

		expect(
			wrapper.findAll('.v3-input-number .v3-input.is-size--small').length,
		).toBe(1);
		expect(
			wrapper.findAll('.v3-input-number .v3-input.is-size--medium').length,
		).toBe(1);
		expect(
			wrapper.findAll('.v3-input-number .v3-input.is-size--large').length,
		).toBe(1);
	});
});
