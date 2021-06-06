import { mount } from '@vue/test-utils';
import { reactive } from 'vue';
import V3RadioGroup from '../src/components/RadioGroup.vue';
import V3Radio from '../src/components/Radio.vue';

describe('RadioGroup 组件测试：', () => {
	test('RadioGroup 组件应该正常进行值的【双向绑定】', async () => {
		const wrapper1 = mount({
			template: `
        <div>
          <v3-radio-group v-model="state.radioValue" @change="handleChange">
            <v3-radio :label="1">单选1</v3-radio>
            <v3-radio :label="2">单选2</v3-radio>
            <v3-radio :label="3">单选3</v3-radio>
            <v3-radio :label="4">单选4</v3-radio>
			    </v3-radio-group>
        </div>
      `,
			components: {
				V3RadioGroup,
				V3Radio,
			},
			emits: ['change'],
			setup(props, context) {
				const state = reactive({
					radioValue: 2,
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

		// 默认选中第二个单选框
		expect(wrapper1.find('.is-checked')).toEqual(radioList[1]);

		// 手动选中第四个单选框
		await wrapper1.find('input[type="radio"][value="4"]').setValue();
		expect(wrapper1.find('.is-checked')).toEqual(radioList[3]);

		// change 事件应该正常触发
		expect(wrapper1.emitted()).toHaveProperty('change');
	});
});
