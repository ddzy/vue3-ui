// @ts-nocheck

import { mount } from '@vue/test-utils';
import { V3ProgressLinear } from '@components/main';

describe('V3ProgressLinear 组件测试：', () => {
	test('V3ProgressLinear 组件应该正常渲染', async () => {
		const wrapper = mount({
			template: `
        <v3-progress-linear
          width="200px"
          :percent="percent"
        ></v3-progress-linear>
      `,
			components: {
				V3ProgressLinear,
			},
			props: {
				percent: {
					type: Number,
					default: 0,
				},
			},
		});

		expect(wrapper.find('.v3-progress-linear').exists()).toBeTruthy();
		expect(wrapper.find('.v3-progress__track').exists()).toBeTruthy();
		expect(wrapper.find('.v3-progress__append').exists()).toBeTruthy();
		expect(wrapper.find('.v3-progress__append').text()).toContain('0%');

		await wrapper.setProps({
			percent: 100,
		});
		expect(wrapper.find('.v3-progress__append').text()).toContain('100%');
	});

	test('V3ProgressLinear 组件可以接收【round】配置项，用来自定义是否开启圆角', async () => {
		const wrapper = mount({
			template: `
        <v3-progress-linear
          width="200px"
          :percent="50"
          :round="false"
        ></v3-progress-linear>
      `,
			components: {
				V3ProgressLinear,
			},
		});

		expect(wrapper.find('.v3-progress-linear').exists()).toBeTruthy();
		expect(
			wrapper.find('.v3-progress-linear').classes().includes('has-round'),
		).toBeFalsy();
	});

	test('V3ProgressLinear 组件可以接收【formatLabel】配置项，用来自定义 label 显示文本', async () => {
		const wrapper = mount({
			template: `
        <v3-progress-linear
          width="200px"
          :percent="percent"
          :formatLabel="formatLabel"
        ></v3-progress-linear>
      `,
			components: {
				V3ProgressLinear,
			},
			props: {
				percent: {
					type: Number,
					default: 0,
				},
			},
			methods: {
				formatLabel(percent: number) {
					if (percent <= 0) {
						return '💀';
					} else if (percent <= 20) {
						return '😵';
					} else if (percent <= 40) {
						return '😭';
					} else if (percent <= 60) {
						return '🙂';
					} else if (percent <= 80) {
						return '😀';
					} else if (percent <= 100) {
						return '😆';
					}
				},
			},
		});

		expect(wrapper.find('.v3-progress-linear').exists()).toBeTruthy();
		expect(wrapper.find('.v3-progress__append').exists()).toBeTruthy();
		expect(wrapper.find('.v3-progress__append').text()).toBe('💀');

		await wrapper.setProps({
			percent: 70,
		});
		expect(wrapper.find('.v3-progress__append').text()).toBe('😀');
	});

	test('V3ProgressLinear 组件可以接收【showLabel】配置项，用来自定义是否显示 label', async () => {
		const wrapper = mount({
			template: `
        <v3-progress-linear
          width="200px"
          :percent="50"
          :showLabel="false"
        ></v3-progress-linear>
      `,
			components: {
				V3ProgressLinear,
			},
		});

		expect(wrapper.find('.v3-progress-linear').exists()).toBeTruthy();
		expect(wrapper.find('.v3-progress__append').exists()).toBeFalsy();
	});

	test('V3ProgressLinear 组件可以接收【theme】配置项，用来启用内置的主题', async () => {
		const wrapper = mount({
			template: `
        <v3-progress-linear
          width="200px"
          :percent="50"
        ></v3-progress-linear>
        <v3-progress-linear
          width="200px"
          theme="primary"
          :percent="50"
        ></v3-progress-linear>
        <v3-progress-linear
          width="200px"
          theme="success"
          :percent="50"
        ></v3-progress-linear>
        <v3-progress-linear
          width="200px"
          theme="danger"
          :percent="50"
        ></v3-progress-linear>
        <v3-progress-linear
          width="200px"
          theme="warning"
          :percent="50"
        ></v3-progress-linear>
      `,
			components: {
				V3ProgressLinear,
			},
		});

		const progressComponentList = wrapper.findAll('.v3-progress-linear');
		expect(progressComponentList.length).toBe(5);
		expect(progressComponentList[0].classes()).toContain('is-theme-custom');
		expect(progressComponentList[1].classes()).toContain('is-theme-primary');
		expect(progressComponentList[2].classes()).toContain('is-theme-success');
		expect(progressComponentList[3].classes()).toContain('is-theme-danger');
		expect(progressComponentList[4].classes()).toContain('is-theme-warning');
	});

	test('V3ProgressLinear 组件可以接收【animation】配置项，用来自定义是否开启进度条的阴影动画', async () => {
		const wrapper = mount({
			template: `
        <v3-progress-linear
          width="200px"
          :percent="50"
          :animation="false"
        ></v3-progress-linear>
        <v3-progress-linear
          width="200px"
          :percent="50"
          :showLabel="true"
        ></v3-progress-linear>
      `,
			components: {
				V3ProgressLinear,
			},
		});

		const progressComponentList = wrapper.findAll('.v3-progress-linear');
		expect(progressComponentList.length).toBe(2);
		expect(
			progressComponentList[0].classes().includes('has-animation'),
		).toBeFalsy();
		expect(progressComponentList[1].classes()).toContain('has-animation');
	});
});
