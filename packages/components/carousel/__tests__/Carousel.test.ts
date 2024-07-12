import { h, nextTick } from 'vue';

import { sleep } from '@common/utils';
import { V3Carousel, V3CarouselItem, V3Icon } from '@components/main';
import { mount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

describe('V3Carousel 组件测试：', () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		// 恢复正常定时器
		vi.useRealTimers();
		// 自动清理 DOM
		document.getElementsByTagName('html')[0].innerHTML = '';
	});

	const carousels = [0, 1, 2, 3];

	test.skip('V3Carousel v-model 绑定', async () => {
		const wrapper = mount(V3Carousel, {
			global: {
				components: {
					V3CarouselItem,
					V3Icon,
				},
			},
			props: {
				modelValue: 0,
				'onUpdate:modelValue': (v) => wrapper.setProps({ modelValue: v }),
				showIndicator: true,
				width: '300px',
				height: '300px',
			},
			slots: {
				default() {
					return carousels.map((v) => h(V3CarouselItem, { key: v }, () => v));
				},
			},
		});

		const carouselItems = wrapper.findAllComponents(V3CarouselItem);

		sleep(1000);
		vi.runOnlyPendingTimers();
		expect(carouselItems.length).toBe(4);

		// 默认选中第一项
		sleep(1000);
		vi.runOnlyPendingTimers();
		expect(carouselItems[0].classes()).toContain('is-active');

		// 点击右箭头切换下一项
		await wrapper.find('.v3-carousel__arrow.is-right').trigger('click');
		sleep(1000);
		vi.runOnlyPendingTimers();
		expect(carouselItems[1].classes()).toContain('is-active');
		expect(wrapper.vm.modelValue).toBe(1);

		// 点击左箭头切换上一项
		await wrapper.find('.v3-carousel__arrow.is-left').trigger('click');
		sleep(1000);
		vi.runOnlyPendingTimers();
		expect(carouselItems[0].classes()).toContain('is-active');
		expect(wrapper.vm.modelValue).toBe(0);

		// 点击导航箭头切换
		await wrapper
			.findAll('.v3-carousel__indicator-item')?.[1]
			?.trigger('click');
		sleep(1000);
		vi.runOnlyPendingTimers();
		expect(carouselItems[1].classes()).toContain('is-active');
		expect(wrapper.vm.modelValue).toBe(1);
	});

	test('V3Carousel接收【effect】，控制切换时的过渡效果', async () => {
		const wrapper = mount(V3Carousel, {
			props: {
				effect: 'fade',
			},
			global: {
				components: {
					V3CarouselItem,
					V3Icon,
				},
			},
			slots: {
				default() {
					return carousels.map((v) => h(V3CarouselItem, { key: v }, () => v));
				},
			},
		});

		await nextTick();
		const carouselItems = wrapper.findAllComponents(V3CarouselItem);

		expect(wrapper.classes()).toContain('is-effect-fade');
	});

	test('V3Carousel接收【disabled】，禁用轮播', async () => {
		const wrapper = mount(V3Carousel, {
			props: {
				disabled: true,
			},
			global: {
				components: {
					V3CarouselItem,
					V3Icon,
				},
			},
			slots: {
				default() {
					return carousels.map((v) => h(V3CarouselItem, { key: v }, () => v));
				},
			},
		});

		await nextTick();
		expect(wrapper.classes()).toContain('is-disabled');
	});

	test('V3Carousel自定义控件', async () => {
		const wrapper = mount(V3Carousel, {
			props: {
				disabled: true,
			},
			global: {
				components: {
					V3CarouselItem,
					V3Icon,
				},
			},
			slots: {
				default() {
					return carousels.map((v) => h(V3CarouselItem, { key: v }, () => v));
				},
				arrowLeft() {
					return h('span', { class: 'custom-arrow-left' }, () => 'arrowLeft');
				},
				arrowRight() {
					return h('span', { class: 'custom-arrow-right' }, () => 'arrowRight');
				},
				indicator() {
					return h(
						'indicator',
						{ class: 'custom-indicator' },
						() => 'indicator',
					);
				},
			},
		});

		await nextTick();
		expect(wrapper.find('.custom-arrow-left').exists()).toBeTruthy();
		expect(wrapper.find('.custom-arrow-right').exists()).toBeTruthy();
		expect(wrapper.find('.custom-indicator').exists()).toBeTruthy();
	});
});
