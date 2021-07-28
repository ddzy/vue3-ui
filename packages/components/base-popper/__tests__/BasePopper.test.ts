import { mount } from '@vue/test-utils';
import V3BasePopper from '../main';
import V3Button from '@components/button/main';
import 'regenerator-runtime/runtime';
import { nextTick } from 'vue';

describe('V3BasePopper 组件测试：', () => {
	test('V3BasePopper 组件可以通过 v-model 来纯手动控制显隐：', async () => {
		const wrapper = mount({
			components: {
				V3BasePopper,
				V3Button,
			},
			template: `
        <v3-base-popper v-model="isVisible">
          <v3-button type="primary" @click="isVisible = !isVisible">触发</v3-button>
          <template #content>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga,
            eveniet nesciunt amet, rem consectetur quod perferendis harum fugit
            excepturi repudiandae culpa veritatis praesentium porro libero
            inventore? Quasi debitis provident consequatur?
          </template>
        </v3-base-popper>
      `,
			data() {
				return {
					isVisible: false,
				};
			},
		});

		expect(
			wrapper
				.find('.v3-base-popper')
				.classes()
				.includes('is-visible')
		).toBeFalsy();
		expect(wrapper.find('.v3-base-popper .popper').isVisible()).toBeFalsy();
		expect(wrapper.find('.v3-base-popper .popper').exists()).toBeTruthy();

		await wrapper.find('.v3-button').trigger('click');
		expect(wrapper.vm.$data.isVisible).toBeTruthy();
		expect(wrapper.find('.v3-base-popper').classes()).toContain('is-visible');

		await wrapper.find('.v3-button').trigger('click');
		expect(wrapper.vm.$data.isVisible).toBeFalsy();
		expect(
			wrapper
				.find('.v3-base-popper')
				.classes()
				.includes('is-visible')
		).toBeFalsy();
	});

	test('V3BasePopper 组件可有两种内置主题：', async () => {
		const wrapper = mount({
			components: {
				V3BasePopper,
				V3Button,
			},
			template: `
        <v3-button type="primary" @click="isVisible = true; theme = 'dark'">dark</v3-button>
        <v3-button type="primary" @click="isVisible = true; theme = 'light'">light</v3-button>
        <v3-base-popper v-model="isVisible" :theme="theme">
          <v3-button type="primary" @click="isVisible = !isVisible">触发</v3-button>
          <template #content>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga,
            eveniet nesciunt amet, rem consectetur quod perferendis harum fugit
            excepturi repudiandae culpa veritatis praesentium porro libero
            inventore? Quasi debitis provident consequatur?
          </template>
        </v3-base-popper>
      `,
			data() {
				return {
					isVisible: true,
					theme: 'dark',
				};
			},
		});

		await wrapper.findAll('.v3-button')[0].trigger('click');
		expect(wrapper.vm.$data.isVisible).toBeTruthy();
		expect(wrapper.find('.v3-base-popper').classes()).toContain(
			'is-theme-dark'
		);

		await wrapper.findAll('.v3-button')[1].trigger('click');
		expect(wrapper.vm.$data.isVisible).toBeTruthy();
		expect(wrapper.find('.v3-base-popper').classes()).toContain(
			'is-theme-light'
		);
	});

	test('V3BasePopper 组件可以接收【disabled】配置项，用来禁用 popper：', async () => {
		const wrapper = mount({
			components: {
				V3BasePopper,
				V3Button,
			},
			template: `
        <v3-base-popper v-model="isVisible" :disabled="true">
          <v3-button type="primary" @click="isVisible = !isVisible">触发</v3-button>
          <template #content>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga,
            eveniet nesciunt amet, rem consectetur quod perferendis harum fugit
            excepturi repudiandae culpa veritatis praesentium porro libero
            inventore? Quasi debitis provident consequatur?
          </template>
        </v3-base-popper>
      `,
			data() {
				return {
					isVisible: false,
				};
			},
		});

		await wrapper.find('.v3-button').trigger('click');
		expect(wrapper.vm.isVisible).toBeTruthy();
		expect(
			wrapper
				.find('.v3-base-popper')
				.classes()
				.includes('is-visible')
		).toBeFalsy();
	});

	test('V3BasePopper 组件可以接收【content】配置项，用来接收普通文本内容：', async () => {
		const wrapper = mount({
			components: {
				V3BasePopper,
				V3Button,
			},
			template: `
        <v3-base-popper content="文本内容" v-model="isVisible">
          <v3-button type="primary" @click="isVisible = !isVisible">触发</v3-button>
        </v3-base-popper>
      `,
			data() {
				return {
					isVisible: false,
				};
			},
		});

		await wrapper.find('.v3-button').trigger('click');
		expect(
			wrapper.find('.v3-base-popper .v3-base-popper__dropdown').text()
		).toBe('文本内容');
	});

	test('V3BasePopper 组件可以接收【arrow】配置项，用来控制是否显示箭头：', async () => {
		const wrapper = mount({
			components: {
				V3BasePopper,
				V3Button,
			},
			template: `
        <v3-base-popper v-model="isVisible" :arrow="false">
          <v3-button type="primary" @click="isVisible = !isVisible">触发</v3-button>
        </v3-base-popper>
      `,
			data() {
				return {
					isVisible: false,
				};
			},
		});

		await wrapper.find('.v3-button').trigger('click');
		expect(wrapper.find('.v3-base-popper .popper #arrow').exists()).toBeFalsy();
	});

	test('V3BasePopper 组件可以接收【maxWidth】配置项，用来自定义浮窗的最大宽度：', async () => {
		const wrapper = mount({
			components: {
				V3BasePopper,
				V3Button,
			},
			template: `
        <v3-base-popper v-model="isVisible" :maxWidth="500">
          <v3-button type="primary" @click="isVisible = !isVisible">触发</v3-button>
        </v3-base-popper>
      `,
			data() {
				return {
					isVisible: false,
				};
			},
		});

		await wrapper.find('.v3-button').trigger('click');
		expect(
			wrapper.find('.v3-base-popper .v3-base-popper__dropdown').attributes()
				.style
		).toContain('max-width: 500px');
	});
});
