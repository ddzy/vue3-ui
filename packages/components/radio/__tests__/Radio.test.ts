import { mount } from '@vue/test-utils';
import { reactive } from 'vue';
import V3Radio from '../src/components/Radio.vue';

describe('Radio 组件测试：', () => {
	test('Radio 组件应该正常进行值的【双向绑定】', async () => {
		const wrapper1 = mount({
			template: `
        <div>
          <v3-radio
          v-model="state.radioValue"
          :label="1"
          @change="handleChange"
          >单选1</v3-radio
          >
          <v3-radio
            v-model="state.radioValue"
            :label="2"
            :disabled="true"
            @change="handleChange"
            >单选2</v3-radio
          >
          <v3-radio
            v-model="state.radioValue"
            :label="3"
            @change="handleChange"
            >单选3</v3-radio
          >
          <v3-radio
            v-model="state.radioValue"
            :label="4"
            @change="handleChange"
            >单选4</v3-radio
          >
        </div>
      `,
			components: {
				V3Radio,
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

		const radioList = wrapper1.findAll('.v3-radio');

		// 双向绑定同一个变量的所有单选框，同一时间只能选中一个
		expect(wrapper1.findAll('.is-checked').length).toBe(1);

		// 默认选中第三个单选框
		expect(wrapper1.find('.is-checked')).toStrictEqual(radioList[2]);

		// 手动选中第一个单选框
		await wrapper1.find('input[type="radio"][value="1"]').setValue();
		expect(wrapper1.findAll('.is-checked').length).toBe(1);
		expect(wrapper1.find('.is-checked')).toStrictEqual(radioList[0]);

		// change 事件应该正常触发
		expect(wrapper1.emitted()).toHaveProperty('change');
	});

	test('Radio 组件应该正常接收【border】属性，并展示为带有边框的单选按钮', async () => {
		const wrapper1 = mount(V3Radio);

		// 默认状态下，不带有边框
		expect(wrapper1.find('.is-bordered').exists()).toBeFalsy();

		// 手动设置 border
		await wrapper1.setProps({
			border: true,
		});
		expect(wrapper1.find('.is-bordered').exists()).toBeTruthy();
	});

	test('Radio 组件应该正常接收【disabled】属性，并禁用特定的单选按钮', async () => {
		const wrapper1 = mount(V3Radio);

		// 默认状态下，都是可用的
		expect(wrapper1.findAll('.is-disabled').length).toBe(0);

		// 手动禁用单选按钮
		await wrapper1.setProps({
			disabled: true,
		});
		expect(wrapper1.find('.is-disabled').exists()).toBeTruthy();
	});
});
