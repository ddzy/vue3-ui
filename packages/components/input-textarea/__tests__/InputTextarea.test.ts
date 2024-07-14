import { V3InputTextarea } from '@components/main';
import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, test } from 'vitest';

describe('InputTextarea 组件测试：', () => {
	// 自动清理 DOM
	afterEach(() => {
		document.getElementsByTagName('html')[0].innerHTML = '';
	});

	test('InputTextarea 组件使用【v-model】双向绑定', async () => {
		const wrapper = mount(V3InputTextarea, {
			props: {
				modelValue: '默认值',
				'onUpdate:modelValue': (e: string) =>
					wrapper.setProps({ modelValue: e }),
			},
		});

		// 默认值
		expect(wrapper.find('textarea').element.value).toBe('默认值');

		// 手动更改输入框的值
		await wrapper.find('textarea').setValue('1');
		expect(wrapper.props('modelValue')).toBe('1');
	});

	test('InputTextarea 组件接收【disabled、readonly】并进入【禁用、只读】状态', async () => {
		const wrapper = mount(V3InputTextarea);

		await wrapper.setProps({
			modelValue: '',
			disabled: true,
		});
		expect(wrapper.find('textarea').attributes.hasOwnProperty('disabled'));

		await wrapper.setProps({
			modelValue: '解除禁用状态',
			disabled: false,
		});
		expect(wrapper.find('textarea').element.value).toBe('解除禁用状态');

		await wrapper.setProps({
			readonly: true,
		});
		expect(wrapper.find('textarea').element.value).toBe('解除禁用状态');

		await wrapper.setProps({
			readonly: false,
			modelValue: '解除只读状态',
		});
		expect(wrapper.find('textarea').element.value).toBe('解除只读状态');
	});
});
