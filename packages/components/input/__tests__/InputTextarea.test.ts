import { mount } from '@vue/test-utils';
import V3InputTextarea from '../src/components/InputTextarea.vue';

describe('InputTextarea 组件测试：', () => {
	test('InputTextarea 组件应该正常进行双向绑定', async () => {
		const wrapper1 = mount(V3InputTextarea, {
			props: {
				modelValue: '初始值',
			},
		});
		expect(wrapper1.find('textarea').element.value).toBe('初始值');

		await wrapper1.setProps({
			modelValue: '第一次改变值',
		});
		expect(wrapper1.find('textarea').element.value).toBe('第一次改变值');

		await wrapper1.setValue('第二次改变值');
		expect(wrapper1.find('textarea').element.value).toBe('第二次改变值');
		expect(wrapper1.vm.modelValue).toBe('第二次改变值');
	});

	test('InputTextarea 组件应该正常接收【disabled、readonly】并进入【禁用、只读】状态', async () => {
		const wrapper1 = mount(V3InputTextarea);

		await wrapper1.setProps({
			modelValue: '',
			disabled: true,
		});
		expect(wrapper1.find('textarea').attributes.hasOwnProperty('disabled'));

		await wrapper1.setProps({
			modelValue: '解除禁用状态',
			disabled: false,
		});
		expect(wrapper1.find('textarea').element.value).toBe('解除禁用状态');

		await wrapper1.setProps({
			readonly: true,
		});
		expect(wrapper1.find('textarea').element.value).toBe('解除禁用状态');

		await wrapper1.setProps({
			readonly: false,
			modelValue: '解除只读状态',
		});
		expect(wrapper1.find('textarea').element.value).toBe('解除只读状态');
	});
});
