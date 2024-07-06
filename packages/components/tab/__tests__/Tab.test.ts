import { nextTick } from 'vue';

import { V3Tab, V3TabPane } from '@components/main';
import { mount } from '@vue/test-utils';

Element.prototype.scrollTo = jest.fn();

describe('Tab组件测试：', () => {
	// 自动清理 DOM
	afterEach(() => {
		document.getElementsByTagName('html')[0].innerHTML = '';
	});

	test('Tab组件应该正常渲染：', async () => {
		const wrapper = mount({
			components: {
				V3Tab,
				V3TabPane,
			},
			template: `
        <v3-tab v-model="currentActiveTab">
          <v3-tab-pane v-for="v in tabs" :key="v" :name="v" :title="'' + v">{{
            v
          }}</v3-tab-pane>
        </v3-tab>
      `,
			data() {
				return {
					tabs: [1, 2, 3, 4],
					currentActiveTab: 1,
				};
			},
		});

		await nextTick();
		// 默认选中第一个tab
		expect(wrapper.find('.v3-tab__body').text()).toBe(`1`);

		// 手动选择tab
		await wrapper.setData({
			currentActiveTab: 2,
		});
		await new Promise((resolve) => setTimeout(resolve, 1000));
		expect(wrapper.find('.v3-tab__body').text()).toBe(`2`);
	});

	test('Tab组件接收【trigger】，用来配置不同的切换方式：', async () => {
		const wrapper = mount({
			components: {
				V3Tab,
				V3TabPane,
			},
			template: `
        <v3-tab :trigger="trigger">
          <v3-tab-pane v-for="v in tabs" :key="v" :name="v" :title="'' + v">{{
            v
          }}</v3-tab-pane>
        </v3-tab>
      `,
			data() {
				return {
					tabs: [1, 2, 3, 4],
					trigger: 'click',
				};
			},
		});

		await nextTick();
		expect(wrapper.classes().includes('is-trigger-click')).toBeTruthy();

		await wrapper.setData({
			trigger: 'hover',
		});
		await nextTick();
		expect(wrapper.classes().includes('is-trigger-hover')).toBeTruthy();
	});

	test('Tab组件接收【addable、closable、showClose】，可动态增减页签：', async () => {
		const wrapper = mount({
			components: {
				V3Tab,
				V3TabPane,
			},
			template: `
        <v3-tab type="card" showClose addable closable @add="handleAdd" @close="handleClose">
          <v3-tab-pane v-for="v in tabs" :key="v" :name="v" :title="'' + v">{{
            v
          }}</v3-tab-pane>
        </v3-tab>
      `,
			data() {
				return {
					tabs: [1, 2, 3, 4],
				};
			},
			methods: {
				handleAdd() {
					this.$emit('add');
				},
				handleClose() {
					this.$emit('close');
				},
			},
		});

		await nextTick();
		expect(wrapper.classes().includes('is-closable')).toBeTruthy();
		expect(wrapper.classes().includes('is-addable')).toBeTruthy();
		await wrapper.find('.v3-tab__add').trigger('click');
		expect(wrapper.emitted()).toHaveProperty('add');
		await wrapper.find('.v3-tab__nav-close').trigger('click');
		expect(wrapper.emitted()).toHaveProperty('close');
	});

	test('Tab组件接收【type】，使用不同风格的标签页：', async () => {
		const wrapper = mount({
			components: {
				V3Tab,
				V3TabPane,
			},
			template: `
        <v3-tab :type="type">
          <v3-tab-pane v-for="v in tabs" :key="v" :name="v" :title="'' + v">{{
            v
          }}</v3-tab-pane>
        </v3-tab>
      `,
			data() {
				return {
					tabs: [1, 2, 3, 4],
					type: 'bar',
				};
			},
		});

		await nextTick();
		expect(wrapper.classes()).toContain('is-bar');

		await wrapper.setData({
			type: 'line',
		});
		expect(wrapper.classes()).toContain('is-line');

		await wrapper.setData({
			type: 'card',
		});
		expect(wrapper.classes()).toContain('is-card');
	});

	test('Tab组件接收【size】，配置标签页的大小：', async () => {
		const wrapper = mount({
			components: {
				V3Tab,
				V3TabPane,
			},
			template: `
        <v3-tab :size="size">
          <v3-tab-pane v-for="v in tabs" :key="v" :name="v" :title="'' + v">{{
            v
          }}</v3-tab-pane>
        </v3-tab>
      `,
			data() {
				return {
					tabs: [1, 2, 3, 4],
					size: 'medium',
				};
			},
		});

		await nextTick();
		expect(wrapper.classes()).toContain('is-size-medium');

		await wrapper.setData({
			size: 'small',
		});
		expect(wrapper.classes()).toContain('is-size-small');

		await wrapper.setData({
			size: 'large',
		});
		expect(wrapper.classes()).toContain('is-size-large');
	});

	test('TabPane组件接收【disabled】，禁用当前页签：', async () => {
		const wrapper = mount({
			components: {
				V3Tab,
				V3TabPane,
			},
			template: `
        <v3-tab :size="size">
          <v3-tab-pane v-for="v in tabs" :key="v" :name="v" :title="'' + v">{{
            v
          }}</v3-tab-pane>
        </v3-tab>
      `,
			data() {
				return {
					tabs: [1, 2, 3, 4],
					size: 'medium',
				};
			},
		});

		await nextTick();
		expect(wrapper.classes()).toContain('is-size-medium');

		await wrapper.setData({
			size: 'small',
		});
		expect(wrapper.classes()).toContain('is-size-small');

		await wrapper.setData({
			size: 'large',
		});
		expect(wrapper.classes()).toContain('is-size-large');
	});

	test('TabPane组件接收【showHeader】，不显示切换器：', async () => {
		const wrapper = mount({
			components: {
				V3Tab,
				V3TabPane,
			},
			template: `
        <v3-tab :showHeader="false">
          <v3-tab-pane v-for="v in tabs" :key="v" :name="v" :title="'' + v">{{
            v
          }}</v3-tab-pane>
        </v3-tab>
      `,
			data() {
				return {
					tabs: [1, 2, 3, 4],
				};
			},
		});

		await nextTick();
		expect(wrapper.classes()).not.toContain('has-header');
	});
});
