import { mount } from '@vue/test-utils';
import { SetupContext, reactive } from 'vue';
import { V3RadioGroup, V3RadioButton } from '@components/main';

describe('V3RadioButton 组件测试：', () => {
	test('V3RadioButton 组件应该正常进行值的【双向绑定】', async () => {
		const wrapper = mount({
			template: `
        <div>
          <v3-radio-button
          v-model="state.radioValue"
          :label="1"
          @change="handleChange"
          >单选1</v3-radio-button
          >
          <v3-radio-button
            v-model="state.radioValue"
            :label="2"
            :disabled="true"
            @change="handleChange"
            >单选2</v3-radio-button
          >
          <v3-radio-button
            v-model="state.radioValue"
            :label="3"
            @change="handleChange"
            >单选3</v3-radio-button
          >
          <v3-radio-button
            v-model="state.radioValue"
            :label="4"
            @change="handleChange"
            >单选4</v3-radio-button
          >
        </div>
      `,
			components: {
				V3RadioButton,
			},
			emits: ['change'],
			setup(props: any, context: SetupContext) {
				const state = reactive({
					radioValue: 3,
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

		// 双向绑定同一个变量的所有单选框，同一时间只能选中一个
		expect(wrapper.findAll('.is-checked').length).toBe(1);

		// 默认选中第三个单选框
		expect(wrapper.find('.is-checked').find('input').element.value).toBe('3');

		// 手动选中第一个单选框
		await wrapper.find('input[type="radio"][value="1"]').setValue();
		expect(wrapper.findAll('.is-checked').length).toBe(1);
		expect(wrapper.find('.is-checked').find('input').element.value).toBe('1');

		// change 事件应该正常触发
		expect(wrapper.emitted()).toHaveProperty('change');
	});

	test('V3RadioButton 组件应该正常接收【disabled】属性，并禁用特定的单选按钮', async () => {
		const wrapper = mount(V3RadioButton);

		// 默认状态下，都是可用的
		expect(wrapper.findAll('.is-disabled').length).toBe(0);

		// 手动禁用单选按钮
		await wrapper.setProps({
			disabled: true,
		});
		expect(wrapper.find('.is-disabled').exists()).toBeTruthy();
	});

	test('V3RadioButton 组件可以接收【size】配置项，用来控制单选框的尺寸', async () => {
		const wrapper = mount({
			components: {
				V3RadioButton,
				V3RadioGroup,
			},
			template: `
				<v3-radio-group v-model="radioValue">
					<v3-radio-button :label="1" :disabled="false" :size="'small'"
						>小尺寸</v3-radio-button
					>
					<v3-radio-button :label="2" :disabled="false" :size="'small'"
						>小尺寸</v3-radio-button
					>
					<v3-radio-button :label="3" :disabled="false" :size="'small'"
						>小尺寸</v3-radio-button
					>
				</v3-radio-group>

				<v3-radio-group v-model="radioValue">
					<v3-radio-button :label="4" :disabled="false" :size="'medium'"
						>默认</v3-radio-button
					>
					<v3-radio-button :label="5" :disabled="false" :size="'medium'"
						>默认</v3-radio-button
					>
					<v3-radio-button :label="6" :disabled="false" :size="'medium'"
						>默认</v3-radio-button
					>
				</v3-radio-group>

				<v3-radio-group v-model="radioValue">
					<v3-radio-button :label="7" :disabled="false" :size="'large'"
						>大尺寸</v3-radio-button
					>
					<v3-radio-button :label="8" :disabled="false" :size="'large'"
						>大尺寸</v3-radio-button
					>
					<v3-radio-button :label="9" :disabled="false" :size="'large'"
						>大尺寸</v3-radio-button
					>
				</v3-radio-group>
			`,
			data() {
				return {
					radioValue: 1,
				};
			},
		});

		expect(wrapper.findAll('.v3-radio-group').length).toBe(3);
		expect(wrapper.findAll('.v3-radio-button').length).toBe(9);
		expect(wrapper.findAll('.v3-radio-button.is-size--small').length).toBe(3);
		expect(wrapper.findAll('.v3-radio-button.is-size--medium').length).toBe(3);
		expect(wrapper.findAll('.v3-radio-button.is-size--large').length).toBe(3);
	});
});
