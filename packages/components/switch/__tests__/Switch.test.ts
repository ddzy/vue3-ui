import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import V3Switch from '../src/components/Switch.vue';

describe('V3Switch 组件测试：', () => {
	test('Switch 组件最基本的用法', async () => {
		const wrapper = mount({
			components: {
				V3Switch,
			},
			template: `
        <v3-switch v-model="switchValue"></v3-switch>
      `,
			data() {
				return {
					switchValue: true,
				};
			},
		});

		// 默认为【开启】状态
		expect(wrapper.find('.v3-switch').exists()).toBeTruthy();
		expect(
			wrapper
				.find('.v3-switch')
				.classes()
				.includes('is-active')
		).toBeTruthy();

		// 手动关闭
		await wrapper.setData({
			switchValue: false,
		});
		expect(
			wrapper
				.find('.v3-switch')
				.classes()
				.includes('is-active')
		).toBeFalsy();
		expect(wrapper.vm.switchValue).toBeFalsy();
	});

	test('Switch 组件可以接收【activeColor、inactiveColor】配置项，用来自定义颜色', async () => {
		const wrapper = mount({
			components: {
				V3Switch,
			},
			template: `
        <v3-switch
          v-model="switchValue"
          activeColor="#00A0FF"
          inactiveColor="#B8B0B0"
        ></v3-switch>
      `,
			data() {
				return {
					switchValue: false,
				};
			},
		});

		expect(wrapper.find('.v3-switch').attributes().style).toBe(
			`--active-color: rgba(0, 160, 255, 1); --inactive-color: rgba(184, 176, 176, 1); --active-color-half: rgba(0, 160, 255, 0.5); --inactive-color-half: rgba(184, 176, 176, 0.5); --active-color-little: rgba(0, 160, 255, 0.3); --inactive-color-little: rgba(184, 176, 176, 0.3); --move-duration: 0.15s;`
		);
	});

	test('Switch 组件可以接收【activeLabel、inactiveLabel】配置项，用来自定义在不同状态下显示的文本', async () => {
		const wrapper = mount({
			components: {
				V3Switch,
			},
			template: `
        <v3-switch
          v-model="switchValue"
          activeLabel="开"
					inactiveLabel="关"
        ></v3-switch>
      `,
			data() {
				return {
					switchValue: false,
				};
			},
		});

		expect(wrapper.findAll('.v3-switch .v3-switch__label')[0].text()).toBe(
			'关'
		);
		expect(wrapper.findAll('.v3-switch .v3-switch__label')[1].text()).toBe(
			'开'
		);

		// 第一次点击开启
		await wrapper.find('.v3-switch .v3-switch__active').trigger('click');
		await nextTick();
		expect(
			wrapper
				.find('.v3-switch')
				.classes()
				.includes('is-active')
		).toBeTruthy();
		// 再次点击则关闭
		await wrapper.find('.v3-switch .v3-switch__active').trigger('click');
		await nextTick();
		expect(
			wrapper
				.find('.v3-switch')
				.classes()
				.includes('is-active')
		).toBeFalsy();
	});

	test('Switch 组件可以接收【activeIcon、inactiveIcon】配置项，可以用图标代替文本（图标优先级较高）', async () => {
		const wrapper = mount({
			components: {
				V3Switch,
			},
			template: `
        <v3-switch
          v-model="switchValue"
          activeLabel="开"
					inactiveLabel="关"
					activeIcon="v3-icon-notice"
					inactiveIcon="v3-icon-sound-Mute"
        ></v3-switch>
      `,
			data() {
				return {
					switchValue: false,
				};
			},
		});

		expect(
			wrapper
				.find('.v3-switch .v3-switch__inactive .v3-icon-sound-Mute')
				.exists()
		).toBeTruthy();
		expect(
			wrapper.find('.v3-switch .v3-switch__active .v3-icon-notice').exists()
		).toBeTruthy();
	});

	test('Switch 组件可以接收【disabled】配置项，用来控制是否禁用', async () => {
		const wrapper = mount({
			components: {
				V3Switch,
			},
			props: {
				disabled: {
					type: Boolean,
					default: false,
				},
			},
			template: `
        <v3-switch
          v-model="switchValue"
          :disabled="disabled"
        ></v3-switch>
      `,
			data() {
				return {
					switchValue: false,
				};
			},
		});

		await wrapper.find('.v3-switch .v3-switch__select').trigger('click');
		expect(
			wrapper
				.find('.v3-switch')
				.classes()
				.includes('is-active')
		).toBeTruthy();

		// 禁用
		await wrapper.setProps({
			disabled: true,
		});
		await wrapper.find('.v3-switch .v3-switch__select').trigger('click');
		expect(
			wrapper
				.find('.v3-switch')
				.classes()
				.includes('is-active')
		).toBeTruthy();
	});

	test('Switch 组件可以接收【width】配置项，用来自定义开关组件的宽度', async () => {
		const wrapper = mount({
			components: {
				V3Switch,
			},
			template: `
        <v3-switch
          v-model="switchValue"
          :width="60"
        ></v3-switch>
      `,
			data() {
				return {
					switchValue: false,
				};
			},
		});

		expect(
			wrapper.find('.v3-switch .v3-switch__select').attributes().style
		).toContain('width: 60px;');
	});

	test('Switch 组件可以绑定【string、boolean、number】类型的值，默认为 boolean', async () => {
		const wrapper = mount({
			components: {
				V3Switch,
			},
			template: `
        <v3-switch
          v-model="switchValue"
          :activeValue="1"
					:inactiveValue="0"
					@change="handleChange"
        ></v3-switch>
      `,
			data() {
				return {
					switchValue: 1,
				};
			},
			methods: {
				handleChange(v: number) {
					this.$emit('change', v);
				},
			},
		});

		expect(
			wrapper
				.find('.v3-switch')
				.classes()
				.includes('is-active')
		).toBeTruthy();

		await wrapper.find('.v3-switch .v3-switch__select').trigger('click');
		await nextTick();
		expect(wrapper.emitted()).toHaveProperty('change');
		expect(wrapper.emitted().change).toHaveLength(1);
		expect(wrapper.emitted().change[0]).toEqual([0]);
	});
});
