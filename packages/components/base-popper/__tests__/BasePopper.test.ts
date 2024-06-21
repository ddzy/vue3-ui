import { nextTick } from 'vue';

import { V3BasePopper, V3Button } from '@components/main';
import { mount } from '@vue/test-utils';
import 'regenerator-runtime/runtime';

jest.useFakeTimers();

describe('V3BasePopper 组件测试：', () => {
	test('V3BasePopper 基本使用：', async () => {
		const wrapper = mount({
			components: {
				V3BasePopper,
				V3Button,
			},
			template: `
				<v3-base-popper v-model="visible" trigger="click">
					<v3-button type="primary" @click="visible = !visible">触发</v3-button>
					<template #content>
						测试内容
					</template>
				</v3-base-popper>
			`,
			data() {
				return {
					visible: false,
				};
			},
		});

		// 默认不显示
		expect(
			wrapper.find('.v3-base-popper').classes().includes('is-visible'),
		).toBeFalsy();
		await nextTick();
		expect(
			wrapper.find('.v3-base-popper .v3-base-popper__dropdown').exists(),
		).toBeFalsy();

		// 触发按钮
		await wrapper.find('.v3-button').trigger('click');
		await nextTick();
		expect(
			wrapper.find('.v3-base-popper').classes().includes('is-visible'),
		).toBeTruthy();
		expect(
			wrapper.find('.v3-base-popper .v3-base-popper__dropdown').exists(),
		).toBeTruthy();
		expect(
			wrapper.find('.v3-base-popper .v3-base-popper__dropdown').text(),
		).toBe('测试内容');
	});

	test('V3BasePopper 可以通过 v-model 来手动控制显隐', async () => {
		const wrapper = mount({
			components: {
				V3BasePopper,
				V3Button,
			},
			template: `
				<v3-base-popper
					trigger="manual"
					theme="light"
					v-model="visible"
				>
					<v3-button type="primary" @click="visible = true"
						>触发</v3-button
					>
					<template #content>
						<v3-button type="primary" @click="visible = false"
							>确认</v3-button
						>
					</template>
				</v3-base-popper>
			`,
			data() {
				return {
					visible: false,
				};
			},
		});

		// 默认隐藏
		expect(
			wrapper.find('.v3-base-popper').classes().includes('.is-visible'),
		).toBeFalsy();
		await nextTick();
		expect(wrapper.find('.v3-base-popper__dropdown').exists()).toBeFalsy();

		// 显示
		await wrapper.findAll('.v3-button')[0].trigger('click');
		expect(
			wrapper.find('.v3-base-popper').classes().includes('is-visible'),
		).toBeTruthy();
		expect(wrapper.find('.v3-base-popper__dropdown').exists()).toBeTruthy();

		// 关闭
		await wrapper.findAll('.v3-button')[1].trigger('click');

		setTimeout(() => {
			expect(
				wrapper.find('.v3-base-popper').classes().includes('is-visible'),
			).toBeFalsy();
		}, 1000);

		jest.advanceTimersByTime(1000);
	});

	test('V3BasePopper 可以接收【theme】配置项，用来启用不同的内置主题', async () => {
		const wrapper = mount({
			components: {
				V3BasePopper,
				V3Button,
			},
			template: `
				<v3-base-popper placement="bottom" theme="dark">
					<v3-button type="primary">黑色主题</v3-button>
					<template #content>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga,
						eveniet nesciunt amet, rem consectetur quod perferendis harum
						fugit excepturi repudiandae culpa veritatis praesentium porro
						libero inventore? Quasi debitis provident consequatur?
					</template>
				</v3-base-popper>

				<v3-base-popper placement="bottom" theme="light">
					<v3-button type="primary">白色主题</v3-button>
					<template #content>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga,
						eveniet nesciunt amet, rem consectetur quod perferendis harum
						fugit excepturi repudiandae culpa veritatis praesentium porro
						libero inventore? Quasi debitis provident consequatur?
					</template>
				</v3-base-popper>
			`,
			data() {
				return {
					visible: false,
				};
			},
		});

		expect(wrapper.findAll('.v3-base-popper')[0].classes()).toContain(
			'is-theme-dark',
		);
		expect(wrapper.findAll('.v3-base-popper')[1].classes()).toContain(
			'is-theme-light',
		);
	});

	test('V3BasePopper 可以接收【disabled】配置项，用来禁用 popper 浮窗', async () => {
		const wrapper = mount({
			components: {
				V3BasePopper,
				V3Button,
			},
			template: `
				<v3-base-popper disabled trigger="click">
					<v3-button type="primary">触发</v3-button>
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
					visible: false,
				};
			},
		});

		await wrapper.find('.v3-button').trigger('click');
		expect(wrapper.find('.v3-base-popper__dropdown').exists()).toBeFalsy();
	});

	test('V3BasePopper 可以接收【delay】配置项，用来延迟显示/隐藏悬浮窗', async () => {
		const wrapper = mount({
			components: {
				V3BasePopper,
				V3Button,
			},
			template: `
				<v3-base-popper
					trigger="click"
					placement="bottom"
					:delay="[2000, 1000]"
				>
					<v3-button type="primary">触发</v3-button>
					<template #content>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga,
						eveniet nesciunt amet, rem consectetur quod perferendis harum fugit
						excepturi repudiandae culpa veritatis praesentium porro libero
						inventore? Quasi debitis provident consequatur?
					</template>
				</v3-base-popper>
			`,
		});

		await wrapper.find('.v3-button').trigger('click');

		setTimeout(() => {
			expect(
				wrapper.find('.v3-base-popper').classes().includes('is-visible'),
			).toBeFalsy();
			expect(wrapper.find('.v3-base-popper__dropdown').exists()).toBeFalsy();
		}, 500);

		setTimeout(() => {
			expect(
				wrapper.find('.v3-base-popper').classes().includes('is-visible'),
			).toBeTruthy();
			expect(wrapper.find('.v3-base-popper__dropdown').exists()).toBeTruthy();
		}, 2500);

		jest.advanceTimersByTime(500);
	});

	test('V3BasePopper 可以接收【customClass】配置项，用来自定义类名', async () => {
		const wrapper = mount({
			components: {
				V3BasePopper,
				V3Button,
			},
			template: `
				<v3-base-popper
					customClass="custom-class"
				>
					<v3-button type="primary">触发</v3-button>
					<template #content>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga,
						eveniet nesciunt amet, rem consectetur quod perferendis harum fugit
						excepturi repudiandae culpa veritatis praesentium porro libero
						inventore? Quasi debitis provident consequatur?
					</template>
				</v3-base-popper>
			`,
		});

		expect(wrapper.find('.v3-base-popper').classes()).toContain('custom-class');
		expect(wrapper.find('.v3-base-popper.custom-class').exists()).toBeTruthy();
	});
});
