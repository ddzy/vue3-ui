import { mount } from '@vue/test-utils';
import V3InputNumber from '../src/components/InputNumber.vue';

describe('InputNumber 组件测试：', () => {
	test('InputNumber 应该正常接收【step】，并按照指定的步长来递增或递减', async () => {
		const wrapper1 = mount(V3InputNumber, {
			props: {
				modelValue: 0,
				step: 2,
				controlsPosition: 'both',
			},
		});

		await wrapper1.find('.v3-number__plus-wrapper').trigger('click');
		expect(wrapper1.find('input').element.value).toBe('2');
		expect(wrapper1.vm.modelValue).toBe(2);

		await wrapper1.find('.v3-number__minus-wrapper').trigger('click');
		expect(wrapper1.find('input').element.value).toBe('0');
		expect(wrapper1.vm.modelValue).toBe(0);
	});

	test('InputNumber 应该正常接收【stepStrictly】，限制输入值只能是步数（step）的倍数', async () => {
		const wrapper1 = mount(V3InputNumber, {
			props: {
				modelValue: 2,
				step: 2,
				controlsPosition: 'both',
				stepStrictly: true,
			},
		});

		await wrapper1.find('.v3-number__plus-wrapper').trigger('click');
		expect(wrapper1.find('input').element.value).toBe('4');
		expect(wrapper1.vm.modelValue).toBe(4);

		await wrapper1.find('.v3-number__minus-wrapper').trigger('click');
		expect(wrapper1.find('input').element.value).toBe('2');
		expect(wrapper1.vm.modelValue).toBe(2);

		await wrapper1.find('input').setValue('3.333');
		await wrapper1.find('input').trigger('change');
		expect(wrapper1.find('input').element.value).toBe('4');
		expect(wrapper1.vm.modelValue).toBe(4);

		await wrapper1.find('input').setValue('2.333');
		await wrapper1.find('input').trigger('change');
		expect(wrapper1.find('input').element.value).toBe('2');
		expect(wrapper1.vm.modelValue).toBe(2);
	});

	test('InputNumber 应该正常接收【precision】参数，即限制最终值需要保留的位数', async () => {
		const wrapper1 = mount(V3InputNumber, {
			props: {
				modelValue: 0,
				controlsPosition: 'both',
				precision: 2,
			},
		});

		await wrapper1.find('.v3-number__plus-wrapper').trigger('click');
		expect(wrapper1.find('input').element.value).toBe('1');
		expect(wrapper1.vm.modelValue).toBe(1);

		await wrapper1.find('.v3-number__minus-wrapper').trigger('click');
		expect(wrapper1.find('input').element.value).toBe('0');
		expect(wrapper1.vm.modelValue).toBe(0);

		await wrapper1.find('input').setValue('3.333');
		await wrapper1.find('input').trigger('change');
		expect(wrapper1.find('input').element.value).toBe('3.33');
		expect(wrapper1.vm.modelValue).toBe(3.33);

		await wrapper1.find('input').setValue('2.356');
		await wrapper1.find('input').trigger('change');
		expect(wrapper1.find('input').element.value).toBe('2.36');
		expect(wrapper1.vm.modelValue).toBe(2.36);
	});

	test('InputNumber 组件应该正常接收【disabled、readonly】并进入【禁用、只读】状态', async () => {
		const wrapper1 = mount(V3InputNumber);

		await wrapper1.setProps({
			modelValue: 0,
			disabled: true,
		});
		expect(wrapper1.find('input').attributes.hasOwnProperty('disabled'));

		await wrapper1.find('.v3-number__plus-wrapper').trigger('click');
		expect(wrapper1.find('input').element.value).toBe('0');
		expect(wrapper1.vm.modelValue).toBe(0);

		await wrapper1.setProps({
			readonly: true,
			disabled: false,
		});
		await wrapper1.find('.v3-number__plus-wrapper').trigger('click');
		expect(wrapper1.find('input').element.value).toBe('0');
		expect(wrapper1.vm.modelValue).toBe(0);
	});

	test('InputNumber 组件应该正常接收【min、max】参数，在值变化的时候禁用控制按钮并且重置输入框中的值', async () => {
		const wrapper1 = mount(V3InputNumber, {
			props: {
				modelValue: 0,
				step: 10,
				min: 0,
				max: 10,
			},
		});

		// 递增一次，如果大于或等于最大值，则禁用【递增】控制按钮
		await wrapper1.find('.v3-number__plus-wrapper').trigger('click');
		await wrapper1.find('.v3-number__plus-wrapper').trigger('click');
		expect(wrapper1.find('input').element.value).toBe('10');
		expect(wrapper1.vm.modelValue).toBe(10);

		// 递减一次，如果小于或等于最小值，则禁用【递减】控制按钮
		await wrapper1.find('.v3-number__minus-wrapper').trigger('click');
		await wrapper1.find('.v3-number__minus-wrapper').trigger('click');
		expect(wrapper1.find('input').element.value).toBe('0');
		expect(wrapper1.vm.modelValue).toBe(0);

		// 如果初始值大于或小于最小值，那么将其重置为最大值或最小值
		await wrapper1.setProps({
			modelValue: 12,
		});
		expect(wrapper1.find('input').element.value).toBe('10');
		expect(wrapper1.vm.modelValue).toBe(10);

		await wrapper1.setProps({
			modelValue: -2,
		});
		expect(wrapper1.find('input').element.value).toBe('0');
		expect(wrapper1.vm.modelValue).toBe(0);
	});
});
