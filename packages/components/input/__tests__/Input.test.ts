import { mount } from '@vue/test-utils';
import { nextTick, reactive } from 'vue';
import V3Input from '../src/components/Input.vue';

describe('V3Input 组件测试：', () => {
	test('V3Input 组件应该正常接收 type，即输入框的类型必须为【text】或【password】', () => {
		const wrapper1 = mount(V3Input, {
			props: {
				type: 'text',
			},
		});
		const wrapper2 = mount(V3Input, {
			props: {
				type: 'password',
			},
		});

		expect(wrapper1.find('input').exists());
		expect(wrapper2.find('input').exists());
		expect(wrapper1.find('input').attributes().type).toBe('text');
		expect(wrapper2.find('input').attributes().type).toBe('password');
	});

	test('V3Input 组件应该正常进行双向绑定', async () => {
		const wrapper1 = mount({
			template: `
        <div>
          <v3-input
            v-model="state.inputValue"
            @change="handleChange"
          ></v3-input
          >
        </div>
      `,
			components: {
				V3Input,
			},
			emits: ['change'],
			setup(props, context) {
				const state = reactive({
					inputValue: '初始值',
				});

				function handleChange(v: MouseEvent) {
					context.emit('change', v);
				}

				return {
					state,
					handleChange,
				};
			},
		});

		// 默认值
		expect(wrapper1.find('input').element.value).toBe('初始值');

		// 改变 data 中的值
		wrapper1.vm.state.inputValue = '第一次改变值';
		await nextTick();
		expect(wrapper1.find('input').element.value).toBe('第一次改变值');

		// 手动输入
		await wrapper1.find('input').setValue('第二次改变值');
		expect(wrapper1.vm.state.inputValue).toBe('第二次改变值');

		// 触发 change 事件
		expect(wrapper1.emitted()).toHaveProperty('change');
	});

	test('V3Input 组件应该正常接收【前置、后置、前缀、后缀】图标', () => {
		const wrapper1 = mount(V3Input, {
			props: {
				suffixIcon: 'v3-icon-search',
				prefixIcon: 'v3-icon-plus',
				prependIcon: 'v3-icon-editor',
				appendIcon: 'v3-icon-success',
			},
		});

		expect(
			wrapper1
				.find('.v3-input__suffix')
				.find('i')
				.classes()
				.includes('v3-icon-search')
		).toBeTruthy();
		expect(
			wrapper1
				.find('.v3-input__prefix')
				.find('i')
				.classes()
				.includes('v3-icon-plus')
		).toBeTruthy();
		expect(
			wrapper1
				.find('.v3-input__prepend')
				.find('i')
				.classes()
				.includes('v3-icon-editor')
		).toBeTruthy();
		expect(
			wrapper1
				.find('.v3-input__append')
				.find('i')
				.classes()
				.includes('v3-icon-success')
		).toBeTruthy();
	});

	test('V3Input 组件应该正常接收【disabled、readonly】并进入【禁用、只读】状态', async () => {
		const wrapper1 = mount(V3Input);

		await wrapper1.setProps({
			modelValue: '',
			disabled: true,
		});
		expect(wrapper1.find('input').attributes.hasOwnProperty('disabled'));

		await wrapper1.setProps({
			modelValue: '解除禁用状态',
			disabled: false,
		});
		expect(wrapper1.find('input').element.value).toBe('解除禁用状态');

		await wrapper1.setProps({
			readonly: true,
		});
		expect(wrapper1.find('input').element.value).toBe('解除禁用状态');

		await wrapper1.setProps({
			readonly: false,
			modelValue: '解除只读状态',
		});
		expect(wrapper1.find('input').element.value).toBe('解除只读状态');
	});

	test('V3Input 组件应该接收【showWordLimit、maxlength】并显示字符统计', async () => {
		const wrapper1 = mount(V3Input);

		// showWordLimit 和 maxlength 两者必须同时存在，才能显示字符统计
		await wrapper1.setProps({
			showWordLimit: true,
			maxlength: -1,
		});
		expect(wrapper1.find('.v3-input__limit').exists()).toBeFalsy();

		await wrapper1.setProps({
			showWordLimit: false,
			maxlength: 10,
		});
		expect(wrapper1.find('.v3-input__limit').exists()).toBeFalsy();

		// 当前输入的字符数统计是否正常
		await wrapper1.setProps({
			showWordLimit: true,
			maxlength: 10,
			modelValue: '测试值',
		});
		expect(wrapper1.find('.v3-input__limit').exists()).toBeTruthy();
		expect(wrapper1.vm.state.currentWordCount).toBe(3);

		// 输入字符的数目超过最大值的时候，输入框应该处于【验证失败】状态
		await wrapper1.setProps({
			modelValue: '测试值123456789',
		});
		expect(wrapper1.vm.state.currentWordCount).toBe(12);
		expect(wrapper1.find('.is-invalid').exists()).toBeTruthy();
	});

	test('V3Input 组件应该接收【clearable】，可以点击【清除按钮】并清空输入框中的值', async () => {
		const wrapper1 = mount({
			template: `
        <div>
          <v3-input
            v-model="state.inputValue"
						:clearable="true"
            @change="handleChange"
          ></v3-input>
        </div>
      `,
			components: {
				V3Input,
			},
			emits: ['change'],
			setup(props, context) {
				const state = reactive({
					inputValue: '初始值',
				});

				function handleChange(v: MouseEvent) {
					context.emit('change', v);
				}

				return {
					state,
					handleChange,
				};
			},
		});
	});

	test('V3Input 组件应该接收【showPassword】，可以手动切换输入框中值的可见状态', async () => {
		const wrapper1 = mount(V3Input, {
			props: {
				modelValue: '初始值',
				showPassword: true,
			},
		});
		expect(wrapper1.find('input').element.value).toBe('初始值');

		await wrapper1.find('.v3-icon-browse').trigger('click');
		expect(wrapper1.find('input').element.value).toBe('初始值');
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
