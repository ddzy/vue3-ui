import { nextTick } from 'vue';

import { V3Backdrop, V3Button } from '@components/main';
import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, test } from 'vitest';

describe('Backdrop 组件测试：', () => {
	// 自动清理 DOM
	afterEach(() => {
		document.getElementsByTagName('html')[0].innerHTML = '';
	});

	test('Backdrop 组件应该正常渲染', async () => {
		const wrapper = mount({
			components: {
				V3Backdrop,
				V3Button,
			},
			template: `
        <v3-button type="primary" @click="handleClick">打开遮罩层</v3-button>
        <v3-backdrop
          customClass="backdrop-1"
          v-model="showBackdrop"
          @click="showBackdrop = false"
        >
					<span>测试内容</span>
        </v3-backdrop>
      `,
			data() {
				return {
					showBackdrop: false,
				};
			},
			methods: {
				handleClick() {
					// @ts-ignore
					this.showBackdrop = true;
				},
			},
		});

		expect(document.body.querySelector('.v3-backdrop')).toBeTruthy();
		expect(document.querySelector('.v3-backdrop')?.textContent?.trim()).toBe(
			'测试内容',
		);
	});

	test('Backdrop 组件可以接收【fixed】配置项，用来自定义是否禁止滚动穿透', async () => {
		const wrapper = mount({
			components: {
				V3Backdrop,
				V3Button,
			},
			template: `
        <v3-backdrop
          customClass="backdrop-1"
          v-model="showBackdrop"
          :fixed="true"
          @click="showBackdrop = false"
        >
          <img src="" height="1200" alt="" />
        </v3-backdrop>
      `,
			data() {
				return {
					showBackdrop: true,
				};
			},
		});

		await nextTick();
		expect(document.body.classList.contains('v3-body--fixed')).toBeTruthy();
	});

	test('Backdrop 组件可以接收【customClass】配置项，用来自定义遮罩层的类名', async () => {
		const wrapper = mount({
			components: {
				V3Backdrop,
				V3Button,
			},
			template: `
        <v3-backdrop
          customClass="backdrop-1"
          v-model="showBackdrop"
          @click="showBackdrop = false"
        >
          <img src="" height="1200" alt="" />
        </v3-backdrop>
      `,
			data() {
				return {
					showBackdrop: true,
				};
			},
		});

		expect(document.body.querySelector('.v3-backdrop.backdrop-1')).toBeTruthy();
	});

	test('Backdrop 组件可以接收【center】配置项， 用来自定义遮罩层内的元素是否垂直水平居中', async () => {
		const wrapper = mount({
			components: {
				V3Backdrop,
				V3Button,
			},
			template: `
        <v3-backdrop
          v-model="showBackdrop"
					:center="true"
          @click="showBackdrop = false"
        >
          <img src="" height="1200" alt="" />
        </v3-backdrop>
      `,
			data() {
				return {
					showBackdrop: true,
					center: true,
				};
			},
		});

		expect(document.querySelector('.v3-backdrop.is-center')).toBeTruthy();
	});
});
