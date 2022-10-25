import { mount } from '@vue/test-utils';
import { nextTick, reactive } from 'vue';
import V3InputNumber from '../main';

describe('V3InputNumber 组件测试：', () => {
	test('V3InputNumber 应该正常接收【step】，并按照指定的步长来递增或递减', async () => {
		const wrapper1 = mount({
			template: `
        <div>
          <v3-input-number
            v-model="state.inputValue"
						:step="props.step"
						:controlsPosition="props.controlsPosition"
          ></v3-input-number
          >
        </div>
      `,
			components: {
				V3InputNumber,
			},
			props: {
				step: Number,
				controlsPosition: String,
			},
			emits: ['change'],
			setup(props, context) {
				const state = reactive({
					inputValue: 0,
				});

				return {
					state,
					props,
				};
			},
		});

		// 设置【步长】为 2
		await wrapper1.setProps({
			step: 2,
			controlsPosition: 'both',
		});

		// 手动点击【递增】按钮
		await wrapper1.find('.v3-number__plus-wrapper').trigger('click');
		expect(wrapper1.find('input').element.value).toBe('2');
		expect(wrapper1.vm.state.inputValue).toBe(2);

		// 手动点击【递减】按钮
		await wrapper1.find('.v3-number__minus-wrapper').trigger('click');
		expect(wrapper1.find('input').element.value).toBe('0');
		expect(wrapper1.vm.state.inputValue).toBe(0);
	});

	test('V3InputNumber 应该正常接收【stepStrictly】，限制输入值只能是步数（step）的倍数', async () => {
		const wrapper1 = mount({
			template: `
        <div>
          <v3-input-number
            v-model="state.inputValue"
						:step="2"
						:stepStrictly="true"
						:controlsPosition="'both'"
          ></v3-input-number
          >
        </div>
      `,
			components: {
				V3InputNumber,
			},
			emits: ['change'],
			setup(props, context) {
				const state = reactive({
					inputValue: 2,
				});

				return {
					state,
					props,
				};
			},
		});

		// 初始值是 2
		expect(wrapper1.find('input').element.value).toBe('2');

		// 手动点击【递增】按钮
		await wrapper1.find('.v3-number__plus-wrapper').trigger('click');
		expect(wrapper1.find('input').element.value).toBe('4');
		expect(wrapper1.vm.state.inputValue).toBe(4);

		// 手动点击【递减】按钮
		await wrapper1.find('.v3-number__minus-wrapper').trigger('click');
		expect(wrapper1.find('input').element.value).toBe('2');
		expect(wrapper1.vm.state.inputValue).toBe(2);

		// 输入一个小数值
		await wrapper1.find('input').setValue('3.333');
		await wrapper1.find('input').trigger('change');
		expect(wrapper1.find('input').element.value).toBe('4');
		expect(wrapper1.vm.state.inputValue).toBe(4);

		await wrapper1.find('input').setValue('2.333');
		await wrapper1.find('input').trigger('change');
		expect(wrapper1.find('input').element.value).toBe('2');
		expect(wrapper1.vm.state.inputValue).toBe(2);
	});

	test('V3InputNumber 应该正常接收【precision】参数，即限制最终值需要保留的位数', async () => {
		const wrapper1 = mount({
			template: `
        <div>
          <v3-input-number
            v-model="state.inputValue"
						:precision="2"
						:controlsPosition="'both'"
          ></v3-input-number
          >
        </div>
      `,
			components: {
				V3InputNumber,
			},
			emits: ['change'],
			setup(props, context) {
				const state = reactive({
					inputValue: 0,
				});

				return {
					state,
					props,
				};
			},
		});

		// 第一次【递增】
		await wrapper1.find('.v3-number__plus-wrapper').trigger('click');
		expect(wrapper1.find('input').element.value).toBe('1');
		expect(wrapper1.vm.state.inputValue).toBe(1);

		// 第一次【递减】
		await wrapper1.find('.v3-number__minus-wrapper').trigger('click');
		expect(wrapper1.find('input').element.value).toBe('0');
		expect(wrapper1.vm.state.inputValue).toBe(0);

		// 第一次手动输入小数
		await wrapper1.find('input').setValue('3.333');
		await wrapper1.find('input').trigger('change');
		expect(wrapper1.find('input').element.value).toBe('3.33');
		expect(wrapper1.vm.state.inputValue).toBe(3.33);

		// 第二次手动输入小数
		await wrapper1.find('input').setValue('2.356');
		await wrapper1.find('input').trigger('change');
		expect(wrapper1.find('input').element.value).toBe('2.36');
		expect(wrapper1.vm.state.inputValue).toBe(2.36);
	});

	test('V3InputNumber 组件应该正常接收【disabled、readonly】并进入【禁用、只读】状态', async () => {
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

	test('V3InputNumber 组件应该正常接收【min、max】参数，在值变化的时候禁用控制按钮并且重置输入框中的值', async () => {
		const wrapper1 = mount({
			template: `
        <div>
          <v3-input-number
            v-model="state.inputValue"
						:step="10"
						:min="0"
						:max="10"
          ></v3-input-number
          >
        </div>
      `,
			components: {
				V3InputNumber,
			},
			setup(props, context) {
				const state = reactive({
					inputValue: 0,
				});

				return {
					state,
					props,
				};
			},
		});

		// 递增一次，如果大于或等于最大值，则禁用【递增】控制按钮
		await wrapper1.find('.v3-number__plus-wrapper').trigger('click');
		await wrapper1.find('.v3-number__plus-wrapper').trigger('click');
		expect(wrapper1.find('input').element.value).toBe('10');
		expect(wrapper1.vm.state.inputValue).toBe(10);

		// 递减一次，如果小于或等于最小值，则禁用【递减】控制按钮
		await wrapper1.find('.v3-number__minus-wrapper').trigger('click');
		await wrapper1.find('.v3-number__minus-wrapper').trigger('click');
		expect(wrapper1.find('input').element.value).toBe('0');
		expect(wrapper1.vm.state.inputValue).toBe(0);

		// 如果初始值大于或小于最小值，那么将其重置为最大值或最小值
		wrapper1.vm.state.inputValue = 12;
		await nextTick();
		expect(wrapper1.find('input').element.value).toBe('10');
		expect(wrapper1.vm.state.inputValue).toBe(10);

		wrapper1.vm.state.inputValue = -2;
		await nextTick();
		expect(wrapper1.find('input').element.value).toBe('0');
		expect(wrapper1.vm.state.inputValue).toBe(0);
	});

	test('V3InputNumber 组件可以接收【size】配置项，用来控制输入框的尺寸', async () => {
		const wrapper = mount({
			components: {
				V3InputNumber,
			},
			template: `
				<v3-input-number
					size="small"
					v-model="inputValue"
					:controlsPosition="'both'"
					:precision="0"
					:disabled="false"
					:readonly="false"
					:stepStrictly="true"
				></v3-input-number>

				<v3-input-number
					size="medium"
					v-model="inputValue"
					:controlsPosition="'both'"
					:precision="0"
					:disabled="false"
					:readonly="false"
					:stepStrictly="true"
				></v3-input-number>

				<v3-input-number
					size="large"
					v-model="inputValue"
					:controlsPosition="'both'"
					:precision="0"
					:disabled="false"
					:readonly="false"
					:stepStrictly="true"
				></v3-input-number>
			`,
			data() {
				return {
					inputValue: 0,
				};
			},
		});

		expect(
			wrapper.findAll('.v3-input-number .v3-input.is-size--small').length
		).toBe(1);
		expect(
			wrapper.findAll('.v3-input-number .v3-input.is-size--medium').length
		).toBe(1);
		expect(
			wrapper.findAll('.v3-input-number .v3-input.is-size--large').length
		).toBe(1);
	});
});
