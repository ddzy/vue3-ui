import { mount } from '@vue/test-utils';
import { nextTick, reactive } from 'vue';
import { V3Input, V3Icon } from '@components/main';

describe('V3Input 组件测试：', () => {
	test('V3Input 组件接收【type】，指定输入框类型：', async () => {
		const wrapper = mount(V3Input, {
			props: {
				type: 'text',
			},
		});

		expect(wrapper.find('input').exists()).toBeTruthy();
		expect(wrapper.find('input').attributes().type).toBe('text');
		await wrapper.setProps({
			type: 'password',
		});
		expect(wrapper.find('input').exists()).toBeTruthy();
		expect(wrapper.find('input').attributes().type).toBe('password');
	});

	test('V3Input接收【v-model】，进行双向绑定：', async () => {
		const wrapper = mount(V3Input, {
			props: {
				modelValue: '默认值',
				'onUpdate:modelValue': (e: string) =>
					wrapper.setProps({ modelValue: e }),
			},
		});

		// 默认值
		expect(wrapper.find('input').element.value).toBe('默认值');

		// 更改输入框
		await wrapper.find('input').setValue('test');
		expect(wrapper.props('modelValue')).toBe('test');

		// 更改 modelValue
		await wrapper.setProps({
			modelValue: 'test2',
		});
		expect(wrapper.find('input').element.value).toBe('test2');

		// 触发 change 事件
		expect(wrapper.emitted()).toHaveProperty('change');
	});

	test('V3Input 接收【prefixIcon、suffixIcon、prependIcon、appendIcon】，自定义前缀、后缀、前置、后置图标：', () => {
		const wrapper = mount(V3Input, {
			props: {
				suffixIcon: 'Search',
				prefixIcon: 'Search',
				prependIcon: 'Search',
				appendIcon: 'Search',
			},
		});

		expect(
			wrapper.find('.v3-input__suffix .v3-icon-search').exists(),
		).toBeTruthy();
		expect(
			wrapper.find('.v3-input__prefix .v3-icon-search').exists(),
		).toBeTruthy();
		expect(
			wrapper.find('.v3-input__prepend .v3-icon-search').exists(),
		).toBeTruthy();
		expect(
			wrapper.find('.v3-input__append .v3-icon-search').exists(),
		).toBeTruthy();
	});

	test('V3Input 组件接收【disabled】，禁用', async () => {
		const wrapper = mount(V3Input, {
			props: {
				disabled: true,
			},
		});

		expect(wrapper.find('input').attributes('disabled')).toBe('');
	});

	test('V3Input 组件接收【readonly】，只读', async () => {
		const wrapper = mount(V3Input, {
			props: {
				readonly: true,
			},
		});

		expect(wrapper.find('input').attributes('readonly')).toBe('');
	});

	test('V3Input 组件接收【showWordLimit、maxlength】，显示字符统计', async () => {
		const wrapper = mount(V3Input);

		// showWordLimit 和 maxlength 两者必须同时存在，才能显示字符统计
		await wrapper.setProps({
			showWordLimit: true,
			maxlength: -1,
		});
		expect(wrapper.find('.v3-input__limit').exists()).toBeFalsy();

		await wrapper.setProps({
			showWordLimit: false,
			maxlength: 10,
		});
		expect(wrapper.find('.v3-input__limit').exists()).toBeFalsy();

		// 当前输入的字符数统计是否正常
		await wrapper.setProps({
			showWordLimit: true,
			maxlength: 10,
			modelValue: '测试值',
		});
		expect(wrapper.find('.v3-input__limit').exists()).toBeTruthy();
		expect(wrapper.vm.state.currentWordCount).toBe(3);

		// 输入字符的数目超过最大值的时候，输入框应该处于【验证失败】状态
		await wrapper.setProps({
			modelValue: '测试值123456789',
		});
		expect(wrapper.vm.state.currentWordCount).toBe(12);
		expect(wrapper.find('.is-invalid').exists()).toBeTruthy();
	});

	test('V3Input 组件接收【showPassword】，可以手动切换输入框中值的可见状态', async () => {
		const wrapper = mount(V3Input, {
			props: {
				modelValue: '初始值',
				showPassword: true,
			},
		});
		expect(wrapper.find('input').element.value).toBe('初始值');

		await wrapper.find('.v3-icon-preview-open').trigger('click');
		expect(wrapper.find('input').element.value).toBe('初始值');
	});

	test('V3Input 组件可以接收【size】配置项，用来控制输入框的尺寸', async () => {
		const wrapper = mount({
			components: {
				V3Input,
			},
			template: `
				<v3-input
					size="large"
					v-model="inputValue"
					:type="'text'"
					:maxlength="10"
					:showWordLimit="true"
				>
				</v3-input>

				<v3-input
					size="medium"
					v-model="inputValue"
					:type="'text'"
					:appendIcon="'v3-icon-pin'"
				>
					<template #prepend>
						<span style="padding: 0 12px;">前置元素</span>
					</template>
					<template #append>
						<span style="padding: 0 12px;">后置元素</span>
					</template>
				</v3-input>

				<v3-input size="small" v-model="inputValue" :type="'text'">
				</v3-input>
			`,
			data() {
				return {
					inputValue: '',
				};
			},
		});

		expect(wrapper.findAll('.v3-input.is-size--small').length).toBe(1);
		expect(wrapper.findAll('.v3-input.is-size--medium').length).toBe(1);
		expect(wrapper.findAll('.v3-input.is-size--large').length).toBe(1);
	});
});
