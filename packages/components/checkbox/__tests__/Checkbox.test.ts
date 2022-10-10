import { mount } from '@vue/test-utils';
import { reactive } from 'vue';
import V3Checkbox from '../main';

describe('V3Checkbox 组件测试：', () => {
	test('单一的 V3Checkbox 组件进行双向绑定的值应该是【布尔值】', async () => {
		const wrapper1 = mount({
			template: `
        <div>
          <v3-checkbox
            v-model="state.checkboxValue"
            @change="handleChange"
          >多选1</v3-checkbox
          >

          <div class="shouldView" v-if="state.shouldView"></div>
        </div>
      `,
			components: {
				V3Checkbox,
			},
			emits: ['change'],
			setup(props, context) {
				const state = reactive({
					checkboxValue: false,
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

		// 手动点击复选框
		expect(wrapper1.find('.shouldView').exists()).toBeFalsy();
		await wrapper1.find('input[type="checkbox"]').setValue(true);
		expect(wrapper1.vm.state.checkboxValue).toBe(true);

		// 更改 state
		wrapper1.vm.state.checkboxValue = false;
		expect(wrapper1.find('.shouldView').exists()).toBeFalsy();

		// change 事件应该正常触发
		expect(wrapper1.emitted()).toHaveProperty('change');
	});

	test('V3Checkbox 组件应该正常接收【disabled】并禁用', async () => {
		const wrapper1 = mount({
			template: `
        <div>
          <v3-checkbox
            v-model="state.checkboxValue"
            :disabled="props.disabled"
            @change="handleChange"
          >多选1</v3-checkbox
          >

          <div class="shouldView" v-if="state.shouldView"></div>
        </div>
      `,
			components: {
				V3Checkbox,
			},
			props: {
				disabled: Boolean,
			},
			emits: ['change'],
			setup(props, context) {
				const state = reactive({
					checkboxValue: false,
				});

				function handleChange(v: MouseEvent) {
					context.emit('change', v);
				}

				return {
					state,
					props,
					handleChange,
				};
			},
		});

		// 默认为【非禁用】状态
		expect(wrapper1.find('.is-disabled').exists()).toBeFalsy();
		expect(
			wrapper1.find('input[type="checkbox"]').attributes().disabled
		).toBeFalsy();

		// 手动设置为【禁用】状态
		await wrapper1.setProps({
			disabled: true,
		});
		expect(wrapper1.find('.is-disabled').exists()).toBeTruthy();
		expect(wrapper1.find('input[type="checkbox"]').attributes().disabled).toBe(
			''
		);

		// 【禁用】状态下点击
		await wrapper1.find('input[type="checkbox"]').trigger('click');
		expect(wrapper1.vm.state.checkboxValue).toBeFalsy();
	});

	test('V3Checkbox 组件应该正常接收【border】属性并展示为带边框的复选框', async () => {
		const wrapper1 = mount({
			template: `
        <div>
          <v3-checkbox
            v-model="state.checkboxValue"
            :border="props.border"
            @change="handleChange"
          >多选1</v3-checkbox
          >

          <div class="shouldView" v-if="state.shouldView"></div>
        </div>
      `,
			components: {
				V3Checkbox,
			},
			props: {
				border: Boolean,
			},
			emits: ['change'],
			setup(props, context) {
				const state = reactive({
					checkboxValue: false,
				});

				function handleChange(v: MouseEvent) {
					context.emit('change', v);
				}

				return {
					state,
					props,
					handleChange,
				};
			},
		});

		// 默认不显示边框
		expect(wrapper1.find('.is-bordered').exists()).toBeFalsy();

		// 手动设置为【显示】边框
		await wrapper1.setProps({
			border: true,
		});
		expect(wrapper1.find('.is-bordered').exists()).toBeTruthy();
	});

	test('V3Checkbox 组件应该正常接收【indeterminate】并进入不确定状态', async () => {
		const wrapper1 = mount({
			template: `
        <div>
          <v3-checkbox
            v-model="state.checkboxValue"
            :indeterminate="props.indeterminate"
            @change="handleChange"
          >多选1</v3-checkbox
          >

          <div class="shouldView" v-if="state.shouldView"></div>
        </div>
      `,
			components: {
				V3Checkbox,
			},
			props: {
				indeterminate: Boolean,
			},
			emits: ['change'],
			setup(props, context) {
				const state = reactive({
					checkboxValue: false,
				});

				function handleChange(v: MouseEvent) {
					context.emit('change', v);
				}

				return {
					state,
					props,
					handleChange,
				};
			},
		});

		// 默认不为【非确定】状态
		expect(
			wrapper1.find('.v3-checkbox__select--indeterminated').exists()
		).toBeFalsy();

		// 手动设置为【非确定】状态
		await wrapper1.setProps({
			indeterminate: true,
		});
		expect(
			wrapper1.find('.v3-checkbox__select--indeterminated').exists()
		).toBeTruthy();
	});

	test('V3Checkbox 组件应该正常接收【selectedIcon、indeterminatedIcon、defaultIcon】并可分别自定义【选中时、不确定时、默认】状态的图标', async () => {
		const wrapper1 = mount({
			template: `
        <div>
          <v3-checkbox
            v-model="state.checkboxValue"
            :defaultIcon="'v3-icon-like'"
            :selectedIcon="'v3-icon-like1'"
            :indeterminatedIcon="'v3-icon-sami-select'"
            :indeterminate="props.indeterminate"
            @change="handleChange"
          >多选1</v3-checkbox
          >

          <div class="shouldView" v-if="state.shouldView"></div>
        </div>
      `,
			components: {
				V3Checkbox,
			},
			props: {
				defaultIcon: String,
				selectedIcon: String,
				indeterminatedIcon: String,
				indeterminate: Boolean,
			},
			emits: ['change'],
			setup(props, context) {
				const state = reactive({
					checkboxValue: false,
				});

				function handleChange(v: MouseEvent) {
					context.emit('change', v);
				}

				return {
					state,
					props,
					handleChange,
				};
			},
		});

		// 自定义图标
		await wrapper1.setProps({
			defaultIcon: 'v3-icon-like',
			selectedIcon: 'v3-icon-like1',
			indeterminatedIcon: 'v3-icon-sami-select',
			indeterminate: false,
		});

		// 默认状态
		expect(wrapper1.find('.v3-icon-like').exists()).toBeTruthy();

		// 选中状态
		await wrapper1.find('input[type="checkbox"]').setValue(true);
		expect(wrapper1.find('.v3-icon-like1').exists()).toBeTruthy();

		// 不确定状态
		await wrapper1.setProps({
			indeterminate: true,
		});
		expect(wrapper1.find('.v3-icon-sami-select').exists()).toBeTruthy();
	});

	test('V3Checkbox 组件可以接收【size】配置项，用来控制复选框的尺寸', async () => {
		const wrapper = mount({
			components: {
				V3Checkbox,
			},
			template: `
				<v3-checkbox
					style="margin-bottom: 12px"
					size="small"
					v-model="checkboxValue1"
					:defaultIcon="'v3-icon-like'"
					:selectedIcon="'v3-icon-like1'"
					:indeterminatedIcon="'v3-icon-sami-select'"
					>小尺寸</v3-checkbox
				>
				<v3-checkbox
					size="small"
					v-model="checkboxValue1"
					:indeterminate="true"
					:border="true"
					>小尺寸</v3-checkbox
				>

				<v3-checkbox
					style="margin-bottom: 12px"
					size="medium"
					v-model="checkboxValue2"
					:defaultIcon="'v3-icon-like'"
					:selectedIcon="'v3-icon-like1'"
					:indeterminatedIcon="'v3-icon-sami-select'"
					>默认尺寸</v3-checkbox
				>
				<v3-checkbox
					size="medium"
					v-model="checkboxValue2"
					:indeterminate="true"
					:border="true"
					>默认尺寸</v3-checkbox
				>

				<v3-checkbox
					style="margin-bottom: 12px"
					size="large"
					v-model="checkboxValue3"
					:defaultIcon="'v3-icon-like'"
					:selectedIcon="'v3-icon-like1'"
					:indeterminatedIcon="'v3-icon-sami-select'"
					>大尺寸</v3-checkbox
				>
				<v3-checkbox
					size="large"
					v-model="checkboxValue3"
					:indeterminate="true"
					:border="true"
					>大尺寸</v3-checkbox
				>
			`,
			data() {
				return {
					checkboxValue1: false,
					checkboxValue2: false,
					checkboxValue3: false,
				};
			},
		});

		expect(wrapper.findAll('.v3-checkbox.is-size--small').length).toBe(2);
		expect(wrapper.findAll('.v3-checkbox.is-size--medium').length).toBe(2);
		expect(wrapper.findAll('.v3-checkbox.is-size--large').length).toBe(2);
	});
});
