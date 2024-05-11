import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import V3Drawer from '../main';
import V3Button from '@components/button/main';
import V3Backdrop from '@components/backdrop/main';
import V3Radio from '@components/radio/main';
import V3RadioGroup from '@components/radio-group/main';

describe('V3Drawer 组件测试：', () => {
	test('Drawer 组件应该正常渲染', async () => {
		const wrapper = mount({
			components: {
				V3Drawer,
				V3Button,
				V3Backdrop,
			},
			template: `
      <v3-button
				type="primary"
				@click="showDrawer = !showDrawer"
				>点我</v3-button
			>
			<v3-drawer
				v-model="showDrawer"
			>
				测试内容
			</v3-drawer>
      `,
			data() {
				return {
					showDrawer: false,
				};
			},
		});

		await wrapper.find('.v3-button').trigger('click');
		await nextTick();
		expect(wrapper.find('.v3-backdrop').isVisible()).toBeTruthy();
		expect(wrapper.find('.v3-drawer .v3-drawer__content').text()).toBe(
			'测试内容',
		);

		await wrapper
			.find('.v3-backdrop .v3-drawer .v3-icon-close')
			.trigger('click');
		await nextTick();
		expect(wrapper.find('.v3-backdrop').exists()).toBeTruthy();
		expect(wrapper.find('.v3-backdrop').isVisible()).toBeFalsy();
		expect(wrapper.find('.v3-drawer').isVisible()).toBeFalsy();
	});

	test('Drawer 组件可以接受【placement】配置项，用来自定义抽屉弹出的位置', async () => {
		const wrapper = mount({
			components: {
				V3Drawer,
				V3Button,
				V3Backdrop,
				V3Radio,
				V3RadioGroup,
			},
			template: `
			<v3-radio-group v-model="placement">
				<v3-radio label="left">左</v3-radio>
				<v3-radio label="bottom">下</v3-radio>
				<v3-radio label="right">右</v3-radio>
				<v3-radio label="top">上</v3-radio>
			</v3-radio-group>
      <v3-button
				type="primary"
				@click="showDrawer = !showDrawer"
				>点我</v3-button
			>
			<v3-drawer
				v-model="showDrawer"
				:placement="placement"
			>
				测试内容
			</v3-drawer>
      `,
			data() {
				return {
					showDrawer: false,
					placement: 'right',
				};
			},
		});

		await wrapper.find('.v3-button').trigger('click');
		await nextTick();
		expect(
			wrapper.find('.v3-drawer').classes().includes('is-right'),
		).toBeTruthy();
		await wrapper.find('.v3-icon-close').trigger('click');
		await nextTick();
		await wrapper.find('input[type="radio"][value="bottom"]').setValue();
		await nextTick();
		await wrapper.find('.v3-button').trigger('click');
		await nextTick();
		expect(
			wrapper.find('.v3-drawer').classes().includes('is-right'),
		).toBeFalsy();
		expect(
			wrapper.find('.v3-drawer').classes().includes('is-bottom'),
		).toBeTruthy();
	});

	test('Drawer 组件可以接受【title】配置项，用来自定义标题', async () => {
		const wrapper = mount({
			components: {
				V3Drawer,
				V3Button,
				V3Backdrop,
			},
			template: `
      <v3-button
				type="primary"
				@click="showDrawer = !showDrawer"
				>点我</v3-button
			>
			<v3-drawer
				v-model="showDrawer"
				title="测试标题"
			>
				测试内容
			</v3-drawer>

			<v3-button
				type="primary"
				@click="showDrawer2 = !showDrawer2"
				>点我</v3-button
			>
			<v3-drawer
				v-model="showDrawer2"
				title="测试标题2"
			>
				测试内容2
				<template #header>
					<h3>通过slot自定义标题，优先级比title高</h3>
				</template>
			</v3-drawer>
      `,
			data() {
				return {
					showDrawer: false,
					showDrawer2: false,
				};
			},
		});

		await wrapper.findAll('.v3-button')[0].trigger('click');
		await nextTick();
		expect(wrapper.find('.v3-drawer-header__title').text()).toBe('测试标题');
		await wrapper.find('.v3-icon-close').trigger('click');

		await nextTick();
		await wrapper.findAll('.v3-button')[1].trigger('click');
		await nextTick();
		expect(wrapper.find('.v3-drawer-header__title').text()).toBe(
			'通过slot自定义标题，优先级比title高',
		);
	});

	test('Drawer 组件可以接受【showClose】配置项，用来控制是否显示关闭按钮', async () => {
		const wrapper = mount({
			components: {
				V3Drawer,
				V3Button,
				V3Backdrop,
			},
			template: `
      <v3-button
				type="primary"
				@click="showDrawer = !showDrawer"
				>点我</v3-button
			>
			<v3-drawer
				v-model="showDrawer"
				:showClose="false"
			>
				测试内容
			</v3-drawer>
      `,
			data() {
				return {
					showDrawer: false,
				};
			},
		});

		await wrapper.findAll('.v3-button')[0].trigger('click');
		await nextTick();
		expect(wrapper.find('.v3-icon-close').exists()).toBeFalsy();
	});

	test('Drawer 组件可以接受【closeOnClickBackdrop】配置项，用来控制是否可以通过点击遮罩层来关闭抽屉', async () => {
		const wrapper = mount({
			components: {
				V3Drawer,
				V3Button,
				V3Backdrop,
			},
			template: `
      <v3-button
				type="primary"
				@click="showDrawer = !showDrawer"
				>点我</v3-button
			>
			<v3-drawer
				v-model="showDrawer"
				:closeOnClickBackdrop="false"
			>
				测试内容
			</v3-drawer>
      `,
			data() {
				return {
					showDrawer: false,
				};
			},
		});

		await wrapper.findAll('.v3-button')[0].trigger('click');
		await nextTick();
		await wrapper.find('.v3-backdrop').trigger('click');
		await nextTick();
		expect(wrapper.find('.v3-drawer').isVisible()).toBeTruthy();
	});

	test('Drawer 组件可以接受【confirmText】配置项，用来自定义确认按钮的文案', async () => {
		const wrapper = mount({
			components: {
				V3Drawer,
				V3Button,
				V3Backdrop,
			},
			template: `
      <v3-button
				type="primary"
				@click="showDrawer = !showDrawer"
				>点我</v3-button
			>
			<v3-drawer
				v-model="showDrawer"
				confirmText="ok"
			>
				测试内容
			</v3-drawer>
      `,
			data() {
				return {
					showDrawer: false,
				};
			},
		});

		await wrapper.findAll('.v3-button')[0].trigger('click');
		await nextTick();
		expect(wrapper.findAll('.v3-drawer .v3-button')[0].text()).toBe('ok');
	});

	test('Drawer 组件可以接受【cancelText】配置项，用来自定义取消按钮的文案', async () => {
		const wrapper = mount({
			components: {
				V3Drawer,
				V3Button,
				V3Backdrop,
			},
			template: `
      <v3-button
				type="primary"
				@click="showDrawer = !showDrawer"
				>点我</v3-button
			>
			<v3-drawer
				v-model="showDrawer"
				cancelText="cancel"
			>
				测试内容
			</v3-drawer>
      `,
			data() {
				return {
					showDrawer: false,
				};
			},
		});

		await wrapper.findAll('.v3-button')[0].trigger('click');
		await nextTick();
		expect(wrapper.findAll('.v3-drawer .v3-button')[1].text()).toBe('cancel');
	});

	test('Drawer 组件可以接受【showConfirm】配置项，用来控制是否显示确认按钮', async () => {
		const wrapper = mount({
			components: {
				V3Drawer,
				V3Button,
				V3Backdrop,
			},
			template: `
      <v3-button
				type="primary"
				@click="showDrawer = !showDrawer"
				>点我</v3-button
			>
			<v3-drawer
				v-model="showDrawer"
				:showConfirm="false"
			>
				测试内容
			</v3-drawer>
      `,
			data() {
				return {
					showDrawer: false,
				};
			},
		});

		await wrapper.findAll('.v3-button')[0].trigger('click');
		await nextTick();
		expect(wrapper.findAll('.v3-drawer .v3-button').length).toBe(1);
	});

	test('Drawer 组件可以接受【showCancel】配置项，用来控制是否显示取消按钮', async () => {
		const wrapper = mount({
			components: {
				V3Drawer,
				V3Button,
				V3Backdrop,
			},
			template: `
      <v3-button
				type="primary"
				@click="showDrawer = !showDrawer"
				>点我</v3-button
			>
			<v3-drawer
				v-model="showDrawer"
				:showCancel="false"
			>
				测试内容
			</v3-drawer>
      `,
			data() {
				return {
					showDrawer: false,
				};
			},
		});

		await wrapper.findAll('.v3-button')[0].trigger('click');
		await nextTick();
		expect(wrapper.findAll('.v3-drawer .v3-button').length).toBe(1);
	});

	test('Drawer 组件可以接受【confirmLoading】配置项，用来控制确认按钮的loading状态', async () => {
		const wrapper = mount({
			components: {
				V3Drawer,
				V3Button,
				V3Backdrop,
			},
			template: `
      <v3-button
				type="primary"
				@click="showDrawer = !showDrawer"
				>点我</v3-button
			>
			<v3-drawer
				v-model="showDrawer"
				:confirmLoading="loading"
				:onConfirm="handleConfirm"
			>
				测试内容
			</v3-drawer>
      `,
			data() {
				return {
					showDrawer: false,
					loading: false,
				};
			},
			methods: {
				handleConfirm() {
					this.loading = !this.loading;
				},
			},
		});

		await wrapper.findAll('.v3-button')[0].trigger('click');
		await nextTick();
		await wrapper.findAll('.v3-drawer .v3-button')[0].trigger('click');
		await nextTick();
		expect(wrapper.vm.loading).toBeTruthy();
	});

	test('Drawer 组件可以接受【width】配置项，用来自定义抽屉的宽度（只当 placement 为 left/right 时有效）', async () => {
		const wrapper = mount({
			components: {
				V3Drawer,
				V3Button,
				V3Backdrop,
			},
			template: `
      <v3-button
				type="primary"
				@click="showDrawer = !showDrawer"
				>点我</v3-button
			>
			<v3-drawer
				v-model="showDrawer"
				width="500px"
			>
				测试内容
			</v3-drawer>
      `,
			data() {
				return {
					showDrawer: false,
				};
			},
		});

		await wrapper.findAll('.v3-button')[0].trigger('click');
		await nextTick();
		expect(wrapper.find('.v3-drawer__inner').attributes().style).toContain(
			'width: 500px',
		);
	});

	test('Drawer 组件可以接受【height】配置项，用来自定义抽屉的高度（只当 placement 为 top/bottom 时有效）', async () => {
		const wrapper = mount({
			components: {
				V3Drawer,
				V3Button,
				V3Backdrop,
			},
			template: `
      <v3-button
				type="primary"
				@click="showDrawer = !showDrawer"
				>点我</v3-button
			>
			<v3-drawer
				v-model="showDrawer"
				placement="top"
				height="500px"
			>
				测试内容
			</v3-drawer>
      `,
			data() {
				return {
					showDrawer: false,
				};
			},
		});

		await wrapper.findAll('.v3-button')[0].trigger('click');
		await nextTick();
		expect(wrapper.find('.v3-drawer__inner').attributes().style).toContain(
			'height: 500px',
		);
	});
});
