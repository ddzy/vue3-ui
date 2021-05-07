import { mount } from '@vue/test-utils';
import { reactive } from 'vue';
import V3RadioButton from '../src/components/RadioButton.vue';

describe('RadioButton 组件测试：', () => {
	test('RadioButton 组件应该正常进行值的【双向绑定】', async () => {
		const wrapper1 = mount({
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
			setup(props, context) {
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

		const radioList = wrapper1.findAll('.v3-radio-button');

		// 双向绑定同一个变量的所有单选框，同一时间只能选中一个
		expect(wrapper1.findAll('.v3-radio-button--checked').length).toBe(1);

		// 默认选中第三个单选框
		expect(wrapper1.find('.v3-radio-button--checked')).toStrictEqual(
			radioList[2]
		);

		// 手动选中第一个单选框
		await wrapper1.find('input[type="radio"][value="1"]').setValue();
		expect(wrapper1.findAll('.v3-radio-button--checked').length).toBe(1);
		expect(wrapper1.find('.v3-radio-button--checked')).toStrictEqual(
			radioList[0]
		);

		// change 事件应该正常触发
		expect(wrapper1.emitted()).toHaveProperty('change');
	});

	test('RadioButton 组件应该正常接收【disabled】属性，并禁用特定的单选按钮', async () => {
		const wrapper1 = mount(V3RadioButton);

		// 默认状态下，都是可用的
		expect(wrapper1.findAll('.v3-radio-button--disabled').length).toBe(0);

		// 手动禁用单选按钮
		await wrapper1.setProps({
			disabled: true,
		});
		expect(wrapper1.find('.v3-radio-button--disabled').exists()).toBeTruthy();
	});
});
