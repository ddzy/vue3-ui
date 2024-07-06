import { reactive } from 'vue';

import { V3CheckboxButton, V3CheckboxGroup } from '@components/main';
import { mount } from '@vue/test-utils';

describe('V3CheckboxButton 组件测试：', () => {
	test('单一的 V3CheckboxButton 组件进行双向绑定的值应该是【布尔值】', async () => {
		const wrapper1 = mount({
			template: `
        <div>
          <v3-checkbox-button
            v-model="state.checkboxValue"
            @change="handleChange"
          >多选1</v3-checkbox-button
          >

          <div class="shouldView" v-if="state.shouldView"></div>
        </div>
      `,
			components: {
				V3CheckboxButton,
			},
			emits: ['change'],
			setup(props: any, context: SetupContext) {
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

	test('Checkbox 组件应该正常接收【disabled】并禁用', async () => {
		const wrapper1 = mount({
			template: `
        <div>
          <v3-checkbox-button
            v-model="state.checkboxValue"
            :disabled="props.disabled"
            @change="handleChange"
          >多选1</v3-checkbox-button
          >

          <div class="shouldView" v-if="state.shouldView"></div>
        </div>
      `,
			components: {
				V3CheckboxButton,
			},
			props: {
				disabled: Boolean,
			},
			emits: ['change'],
			setup(props: any, context: SetupContext) {
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
			wrapper1.find('input[type="checkbox"]').attributes().disabled,
		).toBeFalsy();

		// 手动设置为【禁用】状态
		await wrapper1.setProps({
			disabled: true,
		});
		expect(wrapper1.find('.is-disabled').exists()).toBeTruthy();
		expect(wrapper1.find('input[type="checkbox"]').attributes().disabled).toBe(
			'',
		);

		// 【禁用】状态下点击
		await wrapper1.find('input[type="checkbox"]').trigger('click');
		expect(wrapper1.vm.state.checkboxValue).toBeFalsy();
	});

	test('V3CheckboxButton 组件可以接收【size】配置项，用来控制复选按钮的尺寸', async () => {
		const wrapper = mount({
			components: {
				V3CheckboxButton,
				V3CheckboxGroup,
			},
			template: `
				<v3-checkbox-group v-model="checkboxValue">
					<v3-checkbox-button
						size="small"
						v-for="v in checkboxOriginValue"
						:key="v._id"
						:label="v._id"
						:disabled="v.disabled"
						>{{ v.name }}</v3-checkbox-button
					>
				</v3-checkbox-group>

				<v3-checkbox-group v-model="checkboxValue">
					<v3-checkbox-button
						size="medium"
						v-for="v in checkboxOriginValue"
						:key="v._id"
						:label="v._id"
						:disabled="v.disabled"
						>{{ v.name }}</v3-checkbox-button
					>
				</v3-checkbox-group>

				<v3-checkbox-group v-model="checkboxValue">
					<v3-checkbox-button
						size="large"
						v-for="v in checkboxOriginValue"
						:key="v._id"
						:label="v._id"
						:disabled="v.disabled"
						>{{ v.name }}</v3-checkbox-button
					>
				</v3-checkbox-group>
			`,
			data() {
				return {
					checkboxValue: [],
					checkboxOriginValue: [
						{
							_id: 'banana',
							name: '多选项1',
							disabled: false,
						},
						{
							_id: 'apple',
							name: '多选项2',
							disabled: false,
						},
					],
				};
			},
		});

		expect(wrapper.findAll('.v3-checkbox-group').length).toBe(3);
		expect(wrapper.findAll('.v3-checkbox-button.is-size--small').length).toBe(
			2,
		);
		expect(wrapper.findAll('.v3-checkbox-button.is-size--medium').length).toBe(
			2,
		);
		expect(wrapper.findAll('.v3-checkbox-button.is-size--large').length).toBe(
			2,
		);
	});
});
