import { mount } from '@vue/test-utils';
import V3Button from '../main';

describe('V3Button 组件测试：', () => {
	test('V3Button 组件应该正常接收 props', () => {
		const wrapper = mount(V3Button, {
			props: {
				type: 'primary',
			},
			slots: {
				default: '主按钮',
			},
		});
		expect(wrapper.find('.v3-button').classes().length).toBe(3);

		const wrapper2 = mount(V3Button, {
			props: {
				type: 'primary',
				plain: true,
				borderType: 'dashed',
				nativeType: 'submit',
			},
		});
		expect(wrapper2.find('.v3-button').classes().length).toBe(5);
	});

	test('V3Button 组件应该正常接收【type】配置项，用来自定义按钮的类型', async () => {
		const wrapper = mount({
			template: `
				<v3-button
					:type="props.type"
				></v3-button>
			`,
			components: {
				V3Button,
			},
			props: {
				type: {
					type: String,
					default: 'default',
				},
			},
			setup(props, context) {
				return {
					props,
				};
			},
		});

		// 按钮默认为【default】类型
		expect(wrapper.find('.v3-button--default').exists()).toBeTruthy();

		// 手动修改类型
		await wrapper.setProps({
			type: 'success',
		});
		expect(wrapper.find('.v3-button--default').exists()).toBeFalsy();
		expect(wrapper.find('.v3-button--success').exists()).toBeTruthy();
	});

	test('V3Button 组件应该正常接收【nativeType】配置项，用来自定义按钮的原生类型', async () => {
		const wrapper = mount({
			template: `
				<v3-button
					:nativeType="props.nativeType"
				></v3-button>
			`,
			components: {
				V3Button,
			},
			props: {
				nativeType: {
					type: String,
					default: 'button',
				},
			},
			setup(props, context) {
				return {
					props,
				};
			},
		});

		// 按钮原生类型默认为【button】
		expect(wrapper.find('.v3-button').attributes().type).toBe('button');

		// 手动修改类型
		await wrapper.setProps({
			nativeType: 'submit',
		});
		expect(wrapper.find('.v3-button').attributes().type).toBe('submit');
	});

	test('V3Button 组件应该正常接收【borderType】配置项，用来自定义按钮的边框类型', async () => {
		const wrapper = mount({
			template: `
				<v3-button
					:borderType="props.borderType"
				></v3-button>
			`,
			components: {
				V3Button,
			},
			props: {
				borderType: {
					type: String,
					default: '',
				},
			},
			setup(props, context) {
				return {
					props,
				};
			},
		});

		// 手动修改边框类型
		await wrapper.setProps({
			borderType: 'dashed',
		});
		expect(wrapper.find('.has-border--dashed').exists()).toBeTruthy();
	});

	test('V3Button 组件应该正常接收【plain】配置项，用来启用简洁按钮', async () => {
		const wrapper = mount({
			template: `
				<v3-button
					:plain="props.plain"
				></v3-button>
			`,
			components: {
				V3Button,
			},
			props: {
				plain: {
					type: Boolean,
					default: false,
				},
			},
			setup(props, context) {
				return {
					props,
				};
			},
		});

		// 默认不为简洁类型
		expect(wrapper.find('.is-plain').exists()).toBeFalsy();

		// 手动修改
		await wrapper.setProps({
			plain: true,
		});
		expect(wrapper.find('.is-plain').exists()).toBeTruthy();
	});

	test('V3Button 组件应该正常接收【icon】配置项，用来自定义按钮上显示的图标', async () => {
		const wrapper = mount({
			template: `
				<v3-button
					:icon="props.icon"
				></v3-button>
			`,
			components: {
				V3Button,
			},
			props: {
				icon: {
					type: String,
					default: '',
				},
			},
			setup(props, context) {
				return {
					props,
				};
			},
		});

		// 默认没有图标
		expect(wrapper.find('.v3-icon').exists()).toBeFalsy();

		// 添加图标
		await wrapper.setProps({
			icon: 'v3-icon-editor',
		});
		expect(wrapper.find('.v3-icon-editor').exists()).toBeTruthy();
	});

	test('V3Button 组件应该正常接收【circle】配置项，用来决定是否启用圆形按钮', async () => {
		const wrapper = mount({
			template: `
				<v3-button
					:circle="props.circle"
				></v3-button>
			`,
			components: {
				V3Button,
			},
			props: {
				circle: {
					type: Boolean,
					default: false,
				},
			},
			setup(props, context) {
				return {
					props,
				};
			},
		});

		// 默认不是圆形
		expect(wrapper.find('.is-circle').exists()).toBeFalsy();

		await wrapper.setProps({
			circle: true,
		});
		expect(wrapper.find('.is-circle').exists()).toBeTruthy();
	});

	test('V3Button 组件应该正常接收【loading】配置项，用来自定义 loading 加载状态', async () => {
		const wrapper = mount({
			template: `
				<v3-button
					:loading="props.loading"
				></v3-button>
			`,
			components: {
				V3Button,
			},
			props: {
				loading: {
					type: Boolean,
					default: false,
				},
			},
			setup(props, context) {
				return {
					props,
				};
			},
		});

		// 默认不处于加载状态
		expect(wrapper.find('.is-loading').exists()).toBeFalsy();

		// 手动开启加载中状态
		await wrapper.setProps({
			loading: true,
		});
		expect(wrapper.find('.is-loading').exists()).toBeTruthy();
	});

	test('V3Button 组件应该正常禁用', async () => {
		const wrapper = mount(V3Button, {
			props: {
				disabled: true,
			},
		});
		const classes1: string[] = wrapper.find('.v3-button').classes();
		const attributes1: Record<string, string> = wrapper
			.find('.v3-button')
			.attributes();

		expect(classes1.includes('is-disabled')).toBeTruthy();
		expect(attributes1.hasOwnProperty('disabled')).toBeTruthy();

		// 解除禁用后
		await wrapper.setProps({
			disabled: false,
		});
		const classes2: string[] = wrapper.find('.v3-button').classes();
		const attributes2: Record<string, string> = wrapper
			.find('.v3-button')
			.attributes();

		expect(classes2.includes('is-disabled')).toBeFalsy();
		expect(attributes2.hasOwnProperty('disabled')).toBeFalsy();
	});

	test('V3Button 组件的点击事件应该正常触发', async () => {
		const component1 = {
			components: {
				V3Button,
			},
			template: `
        <div>
          <span class="value">{{ count }}</span>
          <v3-button
            class="btn-increment"
            type="primary"
            icon="'v3-icon-add'"
            @click="handleClick(1)"
          >Increment</v3-button>
          <v3-button
            class="btn-decrement"
            type="primary"
            icon="'v3-icon-reduce'"
            @click="handleClick(-1)"
          >Decrement</v3-button>
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
		const wrapper = mount(component1, {});

		const value1 = wrapper.vm.count;
		expect(value1).toBe(0);

		wrapper.vm.handleClick(1);
		const value2 = wrapper.vm.count;
		expect(value2).toBe(1);

		wrapper.vm.handleClick(-9);
		const value3 = wrapper.vm.count;
		expect(value3).toBe(-8);

		wrapper.find('.v3-button.btn-increment').trigger('click');
		expect(wrapper.emitted()).toHaveProperty('click');
		const value4 = wrapper.vm.count;
		expect(value4).toBe(-7);
	});

	test('V3Button 组件可以接收【size】配置项，用来控制按钮的尺寸', async () => {
		const wrapper = mount({
			components: {
				V3Button,
			},
			template: `
				<v3-button
					v-for="v in btnList"
					:key="v.type"
					:type="v.type"
					:size="v.size"
				>
					{{ v.title }}
				</v3-button>
			`,
			data() {
				return {
					btnList: [
						{
							type: 'primary',
							title: '小尺寸',
							size: 'small',
						},
						{
							type: 'primary',
							title: '中尺寸',
							size: 'medium',
						},
						{
							type: 'primary',
							title: '大尺寸',
							size: 'large',
						},
					],
				};
			},
		});

		expect(
			wrapper.findAll('.v3-button')[0].classes().includes('is-size--small')
		).toBeTruthy();
		expect(
			wrapper.findAll('.v3-button')[1].classes().includes('is-size--medium')
		).toBeTruthy();
		expect(
			wrapper.findAll('.v3-button')[2].classes().includes('is-size--large')
		).toBeTruthy();
	});
});
