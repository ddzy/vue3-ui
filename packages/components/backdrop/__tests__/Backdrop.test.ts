import V3Button from '@components/button/main';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import V3Backdrop from '../main';

describe('Backdrop 组件测试：', () => {
	test('Backdrop 组件应该正常渲染', async () => {
		const wrapper = mount({
			components: {
				V3Backdrop,
				V3Button,
			},
			template: `
        <v3-button type="primary" @click="handleClick">打开遮罩层</v3-button>
        <v3-backdrop
          customClass="backdrop-1"
          v-model="showBackdrop"
          @click="showBackdrop = false"
        >
          <img
            src="https://oos.yyge.top/2021/6/30/duan/test/ChMkJ1bKxe-IGplXACGf0sjfYE4AALHdgJwnqcAIZ_q211.jpg"
            width="800"
            height="1200"
            alt=""
          />
        </v3-backdrop>
      `,
			data() {
				return {
					showBackdrop: false,
				};
			},
			methods: {
				handleClick() {
					this.showBackdrop = true;
				},
			},
		});

		expect(wrapper.find('.v3-button').exists()).toBeTruthy();

		await wrapper.find('.v3-button').trigger('click');
		expect(wrapper.find('.v3-backdrop').exists()).toBeTruthy();
		expect(wrapper.findComponent({ name: 'V3Backdrop' }).exists()).toBeTruthy();

		const backdropUID = wrapper.findComponent({ name: 'V3Backdrop' }).vm.$.uid;
		expect(wrapper.find(`#v3-backdrop-${backdropUID}`).exists()).toBeTruthy();
	});

	test('Backdrop 组件可以接收【fixed】配置项，用来自定义是否禁止滚动穿透', async () => {
		const wrapper = mount({
			components: {
				V3Backdrop,
				V3Button,
			},
			template: `
        <v3-button type="primary" @click="handleClick">打开遮罩层</v3-button>
        <v3-backdrop
          customClass="backdrop-1"
          v-model="showBackdrop"
          :fixed="true"
          @click="showBackdrop = false"
        >
          <img src="" height="1200" alt="" />
        </v3-backdrop>
      `,
			data() {
				return {
					showBackdrop: false,
				};
			},
			methods: {
				handleClick() {
					this.showBackdrop = true;
				},
			},
		});

		expect(wrapper.find('.v3-button').exists()).toBeTruthy();

		await wrapper.find('.v3-button').trigger('click');
		expect(document.body.classList.contains('v3-body--fixed')).toBeTruthy();
	});

	test('Backdrop 组件可以接收【customClass】配置项，用来自定义遮罩层的类名', async () => {
		const wrapper = mount({
			components: {
				V3Backdrop,
				V3Button,
			},
			template: `
        <v3-button type="primary" @click="handleClick">打开遮罩层</v3-button>
        <v3-backdrop
          customClass="backdrop-1"
          v-model="showBackdrop"
          @click="showBackdrop = false"
        >
          <img src="" height="1200" alt="" />
        </v3-backdrop>
      `,
			data() {
				return {
					showBackdrop: false,
				};
			},
			methods: {
				handleClick() {
					this.showBackdrop = true;
				},
			},
		});

		expect(wrapper.find('.v3-button').exists()).toBeTruthy();

		await wrapper.find('.v3-button').trigger('click');
		expect(wrapper.find('.backdrop-1').exists()).toBeTruthy();
	});

	test('Backdrop 组件可以接收【click】事件', async () => {
		const wrapper = mount({
			components: {
				V3Backdrop,
				V3Button,
			},
			template: `
        <v3-button type="primary" @click="handleClick">打开遮罩层</v3-button>
        <v3-backdrop
          v-model="showBackdrop"
          @click="showBackdrop = false"
        >
          <img src="" height="1200" alt="" />
        </v3-backdrop>
      `,
			data() {
				return {
					showBackdrop: false,
				};
			},
			methods: {
				handleClick() {
					this.showBackdrop = true;
				},
			},
		});

		expect(wrapper.find('.v3-button').exists()).toBeTruthy();

		await wrapper.find('.v3-button').trigger('click');
		expect(wrapper.find('.v3-backdrop').exists()).toBeTruthy();

		await wrapper.find('.v3-backdrop').trigger('click');
		await nextTick();
		expect(wrapper.find('.v3-backdrop').exists()).toBeTruthy();
		expect(wrapper.find('.v3-backdrop').isVisible()).toBeFalsy();
	});

	test('Backdrop 组件可以接收【center】配置项， 用来自定义遮罩层内的元素是否垂直水平居中', async () => {
		const wrapper = mount({
			components: {
				V3Backdrop,
				V3Button,
			},
			template: `
        <v3-button type="primary" @click="handleClick">打开遮罩层</v3-button>
				<v3-button type="primary" @click="center = !center">切换是否居中</v3-button>
        <v3-backdrop
          v-model="showBackdrop"
					:center="center"
          @click="showBackdrop = false"
        >
          <img src="" height="1200" alt="" />
        </v3-backdrop>
      `,
			data() {
				return {
					showBackdrop: false,
					center: true,
				};
			},
			methods: {
				handleClick() {
					this.showBackdrop = true;
				},
			},
		});

		// 第一次打开遮罩层，默认 center 居中
		await wrapper.findAll('.v3-button')[0].trigger('click');
		expect(wrapper.find('.v3-backdrop').exists()).toBeTruthy();
		expect(
			wrapper.find('.v3-backdrop').classes().includes('is-center')
		).toBeTruthy();

		await wrapper.find('.v3-backdrop').trigger('click');
		await nextTick();

		// 第二次将 center 设为 false，再次打开遮罩层
		await wrapper.findAll('.v3-button')[1].trigger('click');
		await wrapper.findAll('.v3-button')[0].trigger('click');
		expect(wrapper.find('.v3-backdrop').exists()).toBeTruthy();
		expect(
			wrapper.find('.v3-backdrop').classes().includes('is-center')
		).toBeFalsy();
	});
});
