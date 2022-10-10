// @ts-nocheck

import { mount } from '@vue/test-utils';
import V3ProgressCircular from '../lib/components/ProgressCircular.vue';

describe('V3ProgressCircular 组件测试：', () => {
	test('V3ProgressCircular 组件应该正常渲染', async () => {
		const wrapper = mount({
			template: `
        <v3-progress-circular
          :percent="percent"
        ></v3-progress-circular>
      `,
			components: {
				V3ProgressCircular,
			},
			props: {
				percent: {
					type: Number,
					default: 20,
				},
			},
		});

		expect(wrapper.find('.v3-progress-circular').exists()).toBeTruthy();
		expect(wrapper.find('.v3-progress__paper').exists()).toBeTruthy();
		expect(wrapper.find('.v3-progress__label').exists()).toBeTruthy();
		expect(wrapper.find('.v3-progress__label').text()).toContain('20%');

		await wrapper.setProps({
			percent: 100,
		});
		expect(wrapper.find('.v3-progress__label').text()).toContain('100%');
	});

	test('V3ProgressCircular 组件可以接收【formatLabel】配置项，用来自定义 label 显示文本', async () => {
		const wrapper = mount({
			template: `
        <v3-progress-circular
          :percent="percent"
          :formatLabel="formatLabel"
        ></v3-progress-circular>
      `,
			components: {
				V3ProgressCircular,
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

		expect(wrapper.find('.v3-progress-circular').exists()).toBeTruthy();
		expect(wrapper.find('.v3-progress__label').exists()).toBeTruthy();
		expect(wrapper.find('.v3-progress__label').text()).toBe('💀');

		await wrapper.setProps({
			percent: 70,
		});
		expect(wrapper.find('.v3-progress__label').text()).toBe('😀');
	});

	test('V3ProgressCircular 组件可以接收【showLabel】配置项，用来自定义是否显示 label', async () => {
		const wrapper = mount({
			template: `
        <v3-progress-circular
          :percent="50"
          :showLabel="false"
        ></v3-progress-circular>
      `,
			components: {
				V3ProgressCircular,
			},
		});

		expect(wrapper.find('.v3-progress-circular').exists()).toBeTruthy();
		expect(wrapper.find('.v3-progress__label').exists()).toBeFalsy();
	});

	test('V3ProgressCircular 组件可以接收【theme】配置项，用来启用内置的主题', async () => {
		const wrapper = mount({
			template: `
        <v3-progress-circular
          :percent="50"
        ></v3-progress-circular>
        <v3-progress-circular
          theme="primary"
          :percent="50"
        ></v3-progress-circular>
        <v3-progress-circular
          theme="success"
          :percent="50"
        ></v3-progress-circular>
        <v3-progress-circular
          theme="danger"
          :percent="50"
        ></v3-progress-circular>
        <v3-progress-circular
          theme="warning"
          :percent="50"
        ></v3-progress-circular>
      `,
			components: {
				V3ProgressCircular,
			},
		});

		const progressComponentList = wrapper.findAll('.v3-progress-circular');
		expect(progressComponentList.length).toBe(5);
		expect(progressComponentList[0].classes()).toContain('is-theme-custom');
		expect(progressComponentList[1].classes()).toContain('is-theme-primary');
		expect(progressComponentList[2].classes()).toContain('is-theme-success');
		expect(progressComponentList[3].classes()).toContain('is-theme-danger');
		expect(progressComponentList[4].classes()).toContain('is-theme-warning');
	});
});
