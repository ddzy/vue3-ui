import { h, nextTick } from 'vue';

import { sleep } from '@common/utils';
import { V3Collapse, V3CollapseItem, V3Icon } from '@components/main';
import { mount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

describe('Collapse 组件测试：', () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		// 恢复正常定时器
		vi.useRealTimers();
		// 自动清理 DOM
		document.getElementsByTagName('html')[0].innerHTML = '';
	});

	const collapses = ['北京', '上海', '广州', '深圳'];

	test('Collapse v-model 绑定', async () => {
		const wrapper = mount(V3Collapse, {
			global: {
				components: {
					V3CollapseItem,
					V3Icon,
				},
			},
			props: {
				modelValue: ['北京'],
				'onUpdate:modelValue': (v) => wrapper.setProps({ modelValue: v }),
			},
			slots: {
				default() {
					return collapses.map((v) =>
						h(V3CollapseItem, { key: v, name: v, title: v }, () => v),
					);
				},
			},
		});
		const collapseItems = wrapper.findAllComponents(V3CollapseItem);

		await nextTick();
		expect(collapseItems.length).toBe(4);

		// 默认选中第一个
		expect(collapseItems[0].classes()).toContain('is-active');

		// 手动选择第二个
		await wrapper
			.findAllComponents(V3CollapseItem)[1]
			.find('.v3-collapse-item__header')
			.trigger('click');
		sleep(1000);
		vi.runOnlyPendingTimers();
		expect(collapseItems[0].classes()).toContain('is-active');
		expect(collapseItems[1].classes()).toContain('is-active');

		// 更改v-model绑定，清空选择
		await wrapper.setProps({
			modelValue: [],
		});
		wrapper.vm.$forceUpdate();
		await nextTick();
		vi.runOnlyPendingTimers();
		expect(
			collapseItems.every((v) => !v.classes().includes('is-active')),
		).toBeTruthy();
	});

	test('Collapse 接收【accordion】，开启手风琴模式', async () => {
		const wrapper = mount(V3Collapse, {
			global: {
				components: {
					V3CollapseItem,
					V3Icon,
				},
			},
			props: {
				modelValue: ['北京'],
				'onUpdate:modelValue': (v) => wrapper.setProps({ modelValue: v }),
				accordion: true,
			},
			slots: {
				default() {
					return collapses.map((v) =>
						h(V3CollapseItem, { key: v, name: v, title: v }, () => v),
					);
				},
			},
		});
		const collapseItems = wrapper.findAllComponents(V3CollapseItem);

		// 默认选中第一项
		await nextTick();
		expect(collapseItems[0].classes()).toContain('is-active');

		// 手动选中第二项
		await collapseItems[1].find('.v3-collapse-item__header').trigger('click');
		sleep(1000);
		vi.runOnlyPendingTimers();
		expect(collapseItems[0].classes()).not.toContain('is-active');
		expect(collapseItems[1].classes()).toContain('is-active');
		expect(wrapper.vm.modelValue).toEqual(['上海']);
	});

	test('Collapse 接收【displayStrategy】，使用不同的切换策略', async () => {
		const wrapper = mount(V3Collapse, {
			global: {
				components: {
					V3CollapseItem,
					V3Icon,
				},
			},
			props: {
				modelValue: [],
				'onUpdate:modelValue': (v) => wrapper.setProps({ modelValue: v }),
				displayStrategy: 'show',
			},
			slots: {
				default() {
					return collapses.map((v) =>
						h(V3CollapseItem, { key: v, name: v, title: v }, () => v),
					);
				},
			},
		});
		const collapseItems = wrapper.findAllComponents(V3CollapseItem);

		// 默认使用`v-show`显示/隐藏
		await nextTick();
		expect(
			collapseItems.every((v) => v.find('.v3-collapse-item__body').exists()),
		).toBeTruthy();

		// 切换为使用`v-if`显示/隐藏
		await wrapper.setProps({
			displayStrategy: 'if',
			modelValue: [],
		});
		sleep(1000);
		vi.runOnlyPendingTimers();
		expect(
			collapseItems.every((v) => !v.find('.v3-collapse-item__body').exists()),
		).toBeTruthy();
	});

	test('Collapse 接收【triggerArea】，控制不同的点击切换区域', async () => {
		const wrapper = mount(V3Collapse, {
			global: {
				components: {
					V3CollapseItem,
					V3Icon,
				},
			},
			props: {
				modelValue: [],
				'onUpdate:modelValue': (v) => wrapper.setProps({ modelValue: v }),
			},
			slots: {
				default() {
					return collapses.map((v) =>
						h(
							V3CollapseItem,
							{ key: v, name: v, title: v },
							{
								default() {
									return h(v);
								},
								extra() {
									return h(V3Icon, {
										type: 'CloseSmall',
										class: 'custom-icon',
									});
								},
							},
						),
					);
				},
			},
		});
		const collapseItems = wrapper.findAllComponents(V3CollapseItem);

		// 默认头部所有区域可点击切换
		await collapseItems[0].find('.v3-collapse-item__header').trigger('click');
		sleep(1000);
		vi.runOnlyPendingTimers();
		expect(wrapper.vm.modelValue).toEqual(['北京']);

		// 只extra区域可点击切换
		await wrapper.setProps({ modelValue: [], triggerArea: ['extra'] });
		await collapseItems[0].find('.v3-collapse-item__header').trigger('click');
		sleep(1000);
		vi.runOnlyPendingTimers();
		expect(wrapper.vm.modelValue).toEqual([]);
		await collapseItems[0]
			.find('.v3-collapse-item__header .custom-icon')
			.trigger('click');
		sleep(1000);
		vi.runOnlyPendingTimers();
		expect(wrapper.vm.modelValue).toEqual(['北京']);
	});

	test('Collapse 接收【arrowPlacement】，控制箭头的位置', async () => {
		const wrapper = mount(V3Collapse, {
			global: {
				components: {
					V3CollapseItem,
					V3Icon,
				},
			},
			props: {},
			slots: {
				default() {
					return collapses.map((v) =>
						h(V3CollapseItem, { key: v, name: v, title: v }, () => v),
					);
				},
			},
		});
		const collapseItems = wrapper.findAllComponents(V3CollapseItem);

		// 箭头默认在左边
		await nextTick();
		expect(wrapper.classes()).toContain('is-arrow-start');

		// 更改箭头位置
		await wrapper.setProps({
			arrowPlacement: 'end',
		});
		sleep(1000);
		vi.runOnlyPendingTimers();
		expect(wrapper.classes()).not.toContain('is-arrow-start');
		expect(wrapper.classes()).toContain('is-arrow-end');
	});

	test('Collapse 接收【plain】，开启简约模式', async () => {
		const wrapper = mount(V3Collapse, {
			global: {
				components: {
					V3CollapseItem,
					V3Icon,
				},
			},
			props: {},
			slots: {
				default() {
					return collapses.map((v) =>
						h(V3CollapseItem, { key: v, name: v, title: v }, () => v),
					);
				},
			},
		});

		// 默认关闭简约模式
		await nextTick();
		expect(wrapper.classes()).not.toContain('is-plain');

		// 开启简约模式
		await wrapper.setProps({
			plain: true,
		});
		sleep(1000);
		vi.runOnlyPendingTimers();
		expect(wrapper.classes()).toContain('is-plain');
	});

	test('CollapseItem 自定义 slot', async () => {
		const wrapper = mount(V3Collapse, {
			global: {
				components: {
					V3CollapseItem,
					V3Icon,
				},
			},
			props: {},
			slots: {
				default() {
					return collapses.map((v) =>
						h(
							V3CollapseItem,
							{ key: v, name: v },
							{
								default() {
									return h('span', { class: 'custom-default' }, '自定义内容');
								},
								icon() {
									return h('span', { class: 'custom-icon' }, '自定义图标');
								},
								title() {
									return h('span', { class: 'custom-title' }, '自定义标题');
								},
								extra() {
									return h('span', { class: 'custom-extra' }, '自定义额外区域');
								},
							},
						),
					);
				},
			},
		});
		const collapseItems = wrapper.findAllComponents(V3CollapseItem);

		await nextTick();
		expect(collapseItems[0].find('.custom-default').text()).toBe('自定义内容');
		expect(collapseItems[0].find('.custom-icon').text()).toBe('自定义图标');
		expect(collapseItems[0].find('.custom-title').text()).toBe('自定义标题');
		expect(collapseItems[0].find('.custom-extra').text()).toBe(
			'自定义额外区域',
		);
	});

	test('CollapseItem 接收【disabled】配置项，可开启禁用状态', async () => {
		const wrapper = mount(V3Collapse, {
			global: {
				components: {
					V3CollapseItem,
					V3Icon,
				},
			},
			props: {
				modelValue: [],
				'onUpdate:modelValue': (v) => wrapper.setProps({ modelValue: v }),
			},
			slots: {
				default() {
					return collapses.map((v) =>
						h(V3CollapseItem, { key: v, name: v, disabled: true }, () => v),
					);
				},
			},
		});
		const collapseItems = wrapper.findAllComponents(V3CollapseItem);

		await nextTick();
		await collapseItems[0].find('.v3-collapse-item__header').trigger('click');
		sleep(1000);
		vi.runOnlyPendingTimers();
		expect(wrapper.vm.modelValue).toEqual([]);
	});
});
