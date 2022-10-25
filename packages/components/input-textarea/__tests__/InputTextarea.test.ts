import { mount } from '@vue/test-utils';
import { nextTick, reactive } from 'vue';
import V3InputTextarea from '../main';

describe('InputTextarea 组件测试：', () => {
	test('InputTextarea 组件应该正常进行双向绑定', async () => {
		const wrapper1 = mount({
			template: `
        <div>
          <v3-input-textarea
            v-model="state.inputValue"
            @change="handleChange"
          ></v3-input-textarea
          >

          <div class="shouldView" v-if="state.shouldView"></div>
        </div>
      `,
			components: {
				V3InputTextarea,
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

		expect(wrapper1.find('textarea').element.value).toBe('初始值');

		// 手动更改输入框的值
		await wrapper1.find('textarea').setValue('第一次改变值');
		expect(wrapper1.vm.state.inputValue).toBe('第一次改变值');

		// 手动更改 data 中的值
		wrapper1.vm.state.inputValue = '第二次改变值';
		await nextTick();
		expect(wrapper1.find('textarea').element.value).toBe('第二次改变值');
	});

	test('InputTextarea 组件应该正常接收【disabled、readonly】并进入【禁用、只读】状态', async () => {
		const wrapper1 = mount(V3InputTextarea);

		await wrapper1.setProps({
			modelValue: '',
			disabled: true,
		});
		expect(wrapper1.find('textarea').attributes.hasOwnProperty('disabled'));

		await wrapper1.setProps({
			modelValue: '解除禁用状态',
			disabled: false,
		});
		expect(wrapper1.find('textarea').element.value).toBe('解除禁用状态');

		await wrapper1.setProps({
			readonly: true,
		});
		expect(wrapper1.find('textarea').element.value).toBe('解除禁用状态');

		await wrapper1.setProps({
			readonly: false,
			modelValue: '解除只读状态',
		});
		expect(wrapper1.find('textarea').element.value).toBe('解除只读状态');
	});
});
