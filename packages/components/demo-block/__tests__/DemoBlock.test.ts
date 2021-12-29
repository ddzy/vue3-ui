import { mount } from '@vue/test-utils';
import { nextTick, reactive } from 'vue';
import V3DemoBlock from '../src/components/DemoBlock.vue';

describe('DemoBlock 组件测试：', () => {
	test('DemoBlock 组件可以接收【default、description、code】这几个 slot，不传则不显示', async () => {
		const wrapper1 = mount({
			template: `
        <div>
					<v3-demo-block
					>
						<template #description>
							<div class="description">内容简介</div>
						</template>
						<template #code>
							<div class="code">内容详情</div>
						</template>
					</v3-demo-block>
        </div>
      `,
			components: {
				V3DemoBlock,
			},
			setup(props, context) {
				const state = reactive({});

				return {
					state,
				};
			},
		});

		// 没有传默认的 slot
		expect(wrapper1.find('.v3-demo-block__view').exists()).toBeFalsy();

		// 有【简介】和【详情】slot
		expect(wrapper1.find('.v3-demo-block__description').exists()).toBeTruthy();
		expect(wrapper1.find('.v3-demo-block__code').exists()).toBeTruthy();
	});

	test('DemoBlock 组件可以接收【descriptionTip】配置项，来自定义简介区的标题（传了【slot=description】时才有效', async () => {
		const wrapper1 = mount({
			template: `
        <div>
					<v3-demo-block
						:descriptionTip="'简介标题'"
					>
						<template #description>
							<div class="description">内容简介</div>
						</template>
					</v3-demo-block>
        </div>
      `,
			components: {
				V3DemoBlock,
			},
			setup(props, context) {
				const state = reactive({});

				return {
					state,
				};
			},
		});

		// 有【简介】slot
		expect(wrapper1.find('.v3-demo-block__description').exists()).toBeTruthy();

		// 有简介标题
		expect(
			wrapper1
				.find('.v3-demo-block__description')
				.find('.description__tip')
				.text()
		).toBe('简介标题');
	});

	test('DemoBlock 组件可以接收【expandedBtnText、defaultBtnText】配置项，来自定义【展开/收缩】按钮的显示文本', async () => {
		const wrapper1 = mount({
			template: `
        <div>
					<v3-demo-block
						:expandedBtnText="'收缩'"
						:defaultBtnText="'展开'"
					>
						<template #code>
							<div class="code">内容详情</div>
						</template>
					</v3-demo-block>
        </div>
      `,
			components: {
				V3DemoBlock,
			},
			setup(props, context) {
				const state = reactive({});

				return {
					state,
				};
			},
		});

		// 有【详情】slot
		expect(wrapper1.find('.v3-demo-block__code').exists()).toBeTruthy();
		expect(wrapper1.find('.v3-demo-block__code').text()).toBe('内容详情');

		// 按钮默认为收缩状态
		expect(wrapper1.find('.functional__expand').text()).toBe('展开');
		// 手动展开
		await wrapper1.find('.functional__expand span').trigger('click');
		await nextTick();
		expect(wrapper1.find('.functional__expand').text()).toBe('收缩');
	});

	test('DemoBlock 组件可以接收【extraList】配置项，来自定义附加功能区的按钮', async () => {
		const wrapper1 = mount({
			template: `
        <div>
					<v3-demo-block
						:extraList="state.extraList"
						@extraClick="handleExtraItemClick"
					>
						<template #code>
							<div class="code">内容详情</div>
						</template>
					</v3-demo-block>
        </div>
      `,
			components: {
				V3DemoBlock,
			},
			setup(props, context) {
				const state = reactive({
					extraList: [
						{
							title: '转发',
							icon: 'v3-icon-resonserate',
						},
					],
				});

				return {
					state,
				};
			},
			methods: {
				handleExtraItemClick(v: any) {
					this.$emit('onExtraItemClick', v);
				},
			},
		});

		// 只有一个图标
		expect(wrapper1.findAll('.functional-extra__item').length).toBe(1);

		// 点击该图标，触发相应的事件
		await wrapper1.find('.v3-icon-resonserate').trigger('click');
		expect(wrapper1.emitted()).toHaveProperty('onExtraItemClick');
		expect(wrapper1.emitted().onExtraItemClick[0]).toEqual([
			{
				title: '转发',
				icon: 'v3-icon-resonserate',
			},
		]);
	});
});
