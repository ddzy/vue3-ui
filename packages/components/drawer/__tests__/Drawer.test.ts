import { nextTick } from 'vue';

import {
	V3Backdrop,
	V3Button,
	V3Drawer,
	V3Radio,
	V3RadioGroup,
} from '@components/main';
import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, test } from 'vitest';

describe('V3Drawer 组件测试：', () => {
	// 自动清理 DOM
	afterEach(() => {
		document.getElementsByTagName('html')[0].innerHTML = '';
	});

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

		// 默认隐藏
		expect(document.querySelector('.v3-drawer')).toBeFalsy();

		// 显示
		await wrapper.find('.v3-button').trigger('click');
		await nextTick();
		expect(document.querySelector('.v3-drawer')).toBeTruthy();
		expect(
			document.querySelector('.v3-drawer__content')?.textContent?.trim(),
		).toBe('测试内容');
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
				<v3-drawer
					v-model="showDrawer"
					placement="left"
				>
					左
				</v3-drawer>
				<v3-drawer
					v-model="showDrawer"
					placement="top"
				>
					上
				</v3-drawer>
				<v3-drawer
					v-model="showDrawer"
					placement="right"
				>
					右
				</v3-drawer>
				<v3-drawer
					v-model="showDrawer"
					placement="bottom"
				>
					下
				</v3-drawer>
      `,
			data() {
				return {
					showDrawer: true,
				};
			},
		});

		expect(document.querySelectorAll('.v3-drawer').length).toBe(4);
		expect(
			document.querySelectorAll('.v3-drawer')[0].classList.contains('is-left'),
		);
		expect(
			document.querySelectorAll('.v3-drawer')[1].classList.contains('is-top'),
		);
		expect(
			document.querySelectorAll('.v3-drawer')[2].classList.contains('is-right'),
		);
		expect(
			document
				.querySelectorAll('.v3-drawer')[3]
				.classList.contains('is-bottom'),
		);
		expect(
			document.querySelectorAll('.v3-drawer__content')[0]?.textContent?.trim(),
		).toBe('左');
		expect(
			document.querySelectorAll('.v3-drawer__content')[1]?.textContent?.trim(),
		).toBe('上');
		expect(
			document.querySelectorAll('.v3-drawer__content')[2]?.textContent?.trim(),
		).toBe('右');
		expect(
			document.querySelectorAll('.v3-drawer__content')[3]?.textContent?.trim(),
		).toBe('下');
	});

	test('Drawer 组件可以接受【title】配置项，用来自定义标题', async () => {
		const wrapper = mount({
			components: {
				V3Drawer,
				V3Button,
				V3Backdrop,
			},
			template: `
			<v3-drawer
				v-model="showDrawer"
				title="测试标题"
			>
				测试内容
			</v3-drawer>

			<v3-drawer
				v-model="showDrawer"
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
					showDrawer: true,
				};
			},
		});

		expect(
			document.querySelectorAll('.v3-drawer__header')[0]?.textContent?.trim(),
		).toBe('测试标题');
		expect(
			document.querySelectorAll('.v3-drawer__header')[1]?.textContent?.trim(),
		).toBe('通过slot自定义标题，优先级比title高');
	});

	test('Drawer 组件可以接受【showClose】配置项，用来控制是否显示关闭按钮', async () => {
		const wrapper = mount({
			components: {
				V3Drawer,
				V3Button,
				V3Backdrop,
			},
			template: `
				<v3-drawer
					v-model="showDrawer"
					:showClose="false"
				>
					测试内容
				</v3-drawer>
      `,
			data() {
				return {
					showDrawer: true,
				};
			},
		});

		expect(document.querySelector('.v3-drawer__header .v3-icon')).toBeFalsy();
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
					showDrawer: true,
				};
			},
		});

		expect(
			document
				.querySelectorAll('.v3-drawer__footer .v3-button')[0]
				?.textContent?.trim(),
		).toBe('ok');
	});

	test('Drawer 组件可以接受【cancelText】配置项，用来自定义取消按钮的文案', async () => {
		const wrapper = mount({
			components: {
				V3Drawer,
				V3Button,
				V3Backdrop,
			},
			template: `
				<v3-drawer
					v-model="showDrawer"
					cancelText="cancel"
				>
					测试内容
				</v3-drawer>
      `,
			data() {
				return {
					showDrawer: true,
				};
			},
		});

		expect(
			document
				.querySelectorAll('.v3-drawer__footer .v3-button')[1]
				?.textContent?.trim(),
		).toBe('cancel');
	});

	test('Drawer 组件可以接受【showConfirm】配置项，用来控制是否显示确认按钮', async () => {
		const wrapper = mount({
			components: {
				V3Drawer,
				V3Button,
				V3Backdrop,
			},
			template: `
				<v3-drawer
					v-model="showDrawer"
					:showConfirm="false"
				>
					测试内容
				</v3-drawer>
      `,
			data() {
				return {
					showDrawer: true,
				};
			},
		});

		expect(
			document.querySelectorAll('.v3-drawer__footer .v3-button').length,
		).toBe(1);
	});

	test('Drawer 组件可以接受【showCancel】配置项，用来控制是否显示取消按钮', async () => {
		const wrapper = mount({
			components: {
				V3Drawer,
				V3Button,
				V3Backdrop,
			},
			template: `
				<v3-drawer
					v-model="showDrawer"
					:showCancel="false"
				>
					测试内容
				</v3-drawer>
      `,
			data() {
				return {
					showDrawer: true,
				};
			},
		});

		expect(
			document.querySelectorAll('.v3-drawer__footer .v3-button').length,
		).toBe(1);
	});

	test('Drawer 组件可以接受【width】配置项，用来自定义抽屉的宽度（只当 placement 为 left/right 时有效）', async () => {
		const wrapper = mount({
			components: {
				V3Drawer,
				V3Button,
				V3Backdrop,
			},
			template: `
				<v3-drawer
					v-model="showDrawer"
					width="500px"
				>
					测试内容
				</v3-drawer>
      `,
			data() {
				return {
					showDrawer: true,
				};
			},
		});

		expect(
			document
				.querySelector('.v3-drawer')
				?.getAttribute('style')
				?.includes('width: 500px'),
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
					showDrawer: true,
				};
			},
		});

		expect(
			document
				.querySelector('.v3-drawer')
				?.getAttribute('style')
				?.includes('height: 500px'),
		);
	});
});
