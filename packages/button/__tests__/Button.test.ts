import { mount } from '@vue/test-utils';
import Button from '../src/components/Button.vue';

describe('Button 组件测试：', () => {
	test('Button 组件应该正常接收 props', () => {
		const wrapper1 = mount(Button, {
			props: {
				type: 'primary',
			},
			slots: {
				default: '主按钮',
			},
		});
		const classes1: string[] = wrapper1.find('.v3-button').classes();

		expect(classes1.length).toBe(2);

		const wrapper2 = mount(Button, {
			props: {
				type: 'primary',
				plain: true,
				borderType: 'dashed',
				nativeType: 'submit',
			},
		});
		const classes2: string[] = wrapper2.find('.v3-button').classes();

		expect(classes2.length).toBe(4);
	});

	test('Button 组件应该正常禁用', async () => {
		const wrapper1 = mount(Button, {
			props: {
				disabled: true,
			},
		});
		const classes1: string[] = wrapper1.find('.v3-button').classes();
		const attributes1: Record<string, string> = wrapper1
			.find('.v3-button')
			.attributes();

		expect(classes1.includes('v3-button--disabled')).toBeTruthy();
		expect(attributes1.hasOwnProperty('disabled')).toBeTruthy();

		// 解除禁用后
		await wrapper1.setProps({
			disabled: false,
		});
		const classes2: string[] = wrapper1.find('.v3-button').classes();
		const attributes2: Record<string, string> = wrapper1
			.find('.v3-button')
			.attributes();

		expect(classes2.includes('v3-button--disabled')).toBeFalsy();
		expect(attributes2.hasOwnProperty('disabled')).toBeFalsy();
	});

	test('Button 组件的点击事件应该正常触发', async () => {
		const component1 = {
			components: {
				Button,
			},
			template: `
        <div>
          <span class="value">{{ count }}</span>
          <Button
            class="btn-increment"
            type="primary"
            icon="'v3-icon-add'"
            @click="handleClick(1)"
          >Increment</Button>
          <Button
            class="btn-decrement"
            type="primary"
            icon="'v3-icon-reduce'"
            @click="handleClick(-1)"
          >Decrement</Button>
        </div>
      `,
			data() {
				return {
					count: 0,
				};
			},
			methods: {
				handleClick(count: number) {
					let that = this as any;

					that.count = that.count + count;
				},
			},
		};
		const wrapper1 = mount(component1, {});

		const value1 = wrapper1.vm.count;
		expect(value1).toBe(0);

		wrapper1.vm.handleClick(1);
		const value2 = wrapper1.vm.count;
		expect(value2).toBe(1);

		wrapper1.vm.handleClick(-9);
		const value3 = wrapper1.vm.count;
		expect(value3).toBe(-8);

		wrapper1.find('.v3-button.btn-increment').trigger('click');
		expect(wrapper1.emitted()).toHaveProperty('click');
		const value4 = wrapper1.vm.count;
		expect(value4).toBe(-7);
	});
});
