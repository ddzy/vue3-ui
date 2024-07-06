import { nextTick } from 'vue';

import { V3Backdrop, V3Button, V3Dialog } from '@components/main';
import { mount } from '@vue/test-utils';

describe('V3Dialog 组件测试：', () => {
	test('Dialog 组件应该正常渲染', async () => {
		const wrapper = mount({
			components: {
				V3Dialog,
				V3Button,
				V3Backdrop,
			},
			template: `
      <v3-button type="primary" @click="showDialog = true">打开弹窗</v3-button>
      <v3-dialog
        v-model="showDialog"
        :title="'基本用法'"
      >
        测试弹窗内容
      </v3-dialog>
      `,
			data() {
				return {
					showDialog: false,
				};
			},
		});

		// 打开弹窗
		await wrapper.find('.v3-button').trigger('click');
		await nextTick();
		expect(
			document.querySelector('.v3-dialog__header')?.textContent?.trim(),
		).toBe('基本用法');
		expect(
			document.querySelector('.v3-dialog__body')?.textContent?.trim(),
		).toBe('测试弹窗内容');
		// 关闭弹窗
		// @ts-ignore
		document.querySelector('.v3-dialog__header .v3-icon')?.click();
		await nextTick();
		expect(document.querySelector('.v3-dialog')).toBeFalsy();
	});

	test('Dialog 组件可接收【headerActions】配置项，用来自定义弹窗头部的控制按钮组', async () => {
		const wrapper = mount({
			components: {
				V3Dialog,
				V3Button,
				V3Backdrop,
			},
			template: `
				<v3-button type="primary" @click="showDialog = true">打开弹窗</v3-button>
				<v3-dialog
					v-model="showDialog"
					:title="'基本用法'"
					:headerActions="headerActions"
				>
					测试弹窗内容
				</v3-dialog>
      `,
			// @ts-ignore
			data() {
				return {
					showDialog: false,
					headerActions: [
						{
							buttonProps: {
								type: 'default',
								loading: false,
								plain: true,
							},
							text: '取消',
							// @ts-ignore
							handler: this.handleCancel.bind(this),
						},
						{
							buttonProps: {
								type: 'success',
								loading: false,
							},
							text: '确定',
						},
					],
				};
			},
			methods: {
				handleCancel() {
					// @ts-ignore
					this.showDialog = false;
				},
			},
		});

		// 打开弹窗
		await wrapper.find('.v3-button').trigger('click');
		await nextTick();
		expect(
			document.body
				.querySelector('.v3-dialog-header__action')
				?.querySelectorAll('.v3-button').length,
		).toBe(2);

		// 关闭弹窗
		document.body
			.querySelector('.v3-dialog-header__action')
			?.querySelectorAll('.v3-button')?.[0]
			// @ts-ignore
			?.click();
		await nextTick();
		expect(document.querySelector('.v3-dialog')).toBeFalsy();
	});

	test('Dialog 组件可接收【title slot】，用来自定义弹窗的标题', async () => {
		const wrapper = mount({
			components: {
				V3Dialog,
				V3Button,
				V3Backdrop,
			},
			template: `
      <v3-button type="primary" @click="showDialog = true">打开弹窗</v3-button>
      <v3-dialog
        v-model="showDialog"
        :title="'基本用法'"
      >
        <template #title>
          自定义标题
        </template>
        测试弹窗内容
      </v3-dialog>
      `,
			data() {
				return {
					showDialog: true,
				};
			},
		});

		expect(
			document.querySelector('.v3-dialog__header')?.textContent?.trim(),
		).toBe('自定义标题');
	});

	test('Dialog 组件可接收【footer、default slot】，用来自定义弹窗的底部内容', async () => {
		const wrapper = mount({
			components: {
				V3Dialog,
				V3Button,
				V3Backdrop,
			},
			template: `
      <v3-button type="primary" @click="showDialog = true">打开弹窗</v3-button>
      <v3-dialog
        v-model="showDialog"
        :title="'基本用法'"
      >
        测试弹窗内容
        <template #footer>
					<div class="dialog-footer">
						<v3-button type="default" plain @click="showDialog = false"
							>取消</v3-button
						>
						<v3-button type="primary"
							>确定</v3-button
						>
					</div>
				</template>
      </v3-dialog>
      `,
			data() {
				return {
					showDialog: true,
				};
			},
		});

		expect(
			document.body
				.querySelector('.v3-dialog__footer .dialog-footer')
				?.querySelectorAll('.v3-button')?.length,
		).toBe(2);
	});

	test('Dialog 组件可接收【fullscreen】配置项，用来控制弹窗是否全屏', async () => {
		const wrapper = mount({
			components: {
				V3Dialog,
				V3Button,
				V3Backdrop,
			},
			template: `
      <v3-button type="primary" @click="showDialog = true">打开弹窗</v3-button>
      <v3-dialog
        fullscreen
        width="50%"
        v-model="showDialog"
        :title="'基本用法'"
      >
        测试弹窗内容
      </v3-dialog>
      `,
			data() {
				return {
					showDialog: true,
				};
			},
		});

		expect(
			document.body.querySelector('.v3-dialog.is-fullscreen'),
		).toBeTruthy();
	});

	test('Dialog 组件可接收【customClass】配置项，用来自定义弹窗的类名', async () => {
		const wrapper = mount({
			components: {
				V3Dialog,
				V3Button,
				V3Backdrop,
			},
			template: `
      <v3-button type="primary" @click="showDialog = true">打开弹窗</v3-button>
      <v3-dialog
        customClass="custom-dialog"
        width="50%"
        v-model="showDialog"
        :title="'基本用法'"
      >
        测试弹窗内容
      </v3-dialog>
      `,
			data() {
				return {
					showDialog: true,
				};
			},
		});

		expect(
			document.body.querySelector('.v3-dialog.custom-dialog'),
		).toBeTruthy();
	});

	test('Dialog 组件可接收【center】配置项，用来控制整个弹窗是否垂直水平居中', async () => {
		const wrapper = mount({
			components: {
				V3Dialog,
				V3Button,
				V3Backdrop,
			},
			template: `
      <v3-button type="primary" @click="showDialog = true">打开弹窗</v3-button>
      <v3-dialog
        center
        v-model="showDialog"
      >
        测试弹窗内容
      </v3-dialog>
      `,
			data() {
				return {
					showDialog: false,
				};
			},
		});

		expect(document.body.querySelector('.v3-backdrop.is-center')).toBeTruthy();
	});

	test('Dialog 组件可接收【fixed】配置项，用来控制是否滚动穿透', async () => {
		const wrapper = mount({
			components: {
				V3Dialog,
				V3Button,
				V3Backdrop,
			},
			template: `
      <v3-button type="primary" @click="showDialog = true">打开弹窗</v3-button>
      <v3-dialog
        fixed
        v-model="showDialog"
      >
        测试弹窗内容
      </v3-dialog>
      `,
			data() {
				return {
					showDialog: true,
				};
			},
		});

		expect(document.body.classList.contains('v3-body--fixed')).toBeTruthy();
	});
});
