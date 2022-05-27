import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import V3Dialog from '../src/components/Drawer.vue';
import V3Button from '@components/button/src/components/Button.vue';
import V3Backdrop from '@components/backdrop/src/components/Backdrop.vue';

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

		await wrapper.find('.v3-button').trigger('click');
		await nextTick();
		expect(wrapper.find('.v3-backdrop').isVisible()).toBeTruthy();
		expect(wrapper.find('.v3-dialog .v3-dialog__body').text()).toBe(
			'测试弹窗内容'
		);

		await wrapper
			.find('.v3-backdrop .v3-dialog .v3-icon-close')
			.trigger('click');
		await nextTick();
		expect(wrapper.find('.v3-backdrop').exists()).toBeTruthy();
		expect(wrapper.find('.v3-backdrop').isVisible()).toBeFalsy();
		expect(wrapper.find('.v3-dialog').exists()).toBeFalsy();
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
					this.showDialog = false;
				},
			},
		});

		// 打开弹窗
		await wrapper.find('.v3-button').trigger('click');
		await nextTick();
		expect(wrapper.find('.v3-backdrop').isVisible()).toBeTruthy();
		expect(wrapper.find('.v3-dialog').exists()).toBeTruthy();
		expect(wrapper.find('.v3-dialog .v3-dialog__body').text()).toBe(
			'测试弹窗内容'
		);
		expect(
			wrapper.findAll('.v3-dialog .v3-dialog-header__action .v3-button').length
		).toBe(2);

		// 点击【取消】按钮，关闭弹窗
		await wrapper.find('.v3-dialog .v3-button').trigger('click');
		await nextTick();
		expect(wrapper.find('.v3-dialog').exists()).toBeFalsy();
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
					showDialog: false,
				};
			},
		});

		await wrapper.find('.v3-button').trigger('click');
		await nextTick();
		expect(wrapper.find('.v3-backdrop').isVisible()).toBeTruthy();
		expect(wrapper.find('.v3-dialog .v3-dialog__body').text()).toBe(
			'测试弹窗内容'
		);
		expect(wrapper.find('.v3-dialog .v3-dialog-header__title').text()).toBe(
			'自定义标题'
		);
	});

	test('Dialog 组件可接收【footer、default slot】，用来自定义弹窗的底部和内容', async () => {
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
					showDialog: false,
				};
			},
		});

		await wrapper.find('.v3-button').trigger('click');
		await nextTick();
		expect(wrapper.find('.v3-backdrop').isVisible()).toBeTruthy();
		expect(wrapper.find('.v3-dialog .v3-dialog__body').text()).toBe(
			'测试弹窗内容'
		);
		expect(
			wrapper.findAll('.v3-dialog .v3-dialog__footer .v3-button').length
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
					showDialog: false,
				};
			},
		});

		await wrapper.find('.v3-button').trigger('click');
		await nextTick();
		expect(wrapper.find('.v3-backdrop').isVisible()).toBeTruthy();
		expect(wrapper.find('.v3-dialog .v3-dialog__body').text()).toBe(
			'测试弹窗内容'
		);
		expect(
			wrapper
				.find('.v3-dialog')
				.classes()
				.includes('is-fullscreen')
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
					showDialog: false,
				};
			},
		});

		await wrapper.find('.v3-button').trigger('click');
		await nextTick();
		expect(wrapper.find('.v3-backdrop').isVisible()).toBeTruthy();
		expect(wrapper.find('.v3-dialog .v3-dialog__body').text()).toBe(
			'测试弹窗内容'
		);
		expect(wrapper.find('.custom-dialog').exists()).toBeTruthy();
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

		await wrapper.find('.v3-button').trigger('click');
		await nextTick();
		expect(wrapper.find('.v3-backdrop').isVisible()).toBeTruthy();
		expect(wrapper.find('.v3-dialog .v3-dialog__body').text()).toBe(
			'测试弹窗内容'
		);
		expect(
			wrapper
				.find('.v3-backdrop')
				.classes()
				.includes('is-center')
		).toBeTruthy();
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
					showDialog: false,
				};
			},
		});

		await wrapper.find('.v3-button').trigger('click');
		await nextTick();
		expect(wrapper.find('.v3-backdrop').isVisible()).toBeTruthy();
		expect(wrapper.find('.v3-dialog .v3-dialog__body').text()).toBe(
			'测试弹窗内容'
		);
		expect(document.body.classList.contains('v3-body--fixed')).toBeTruthy();

		await wrapper
			.find('.v3-dialog .v3-dialog__header .v3-icon-close')
			.trigger('click');
		await nextTick();
		expect(document.body.classList.contains('v3-body--fixed')).toBeFalsy();
	});

	test('Dialog 组件可接收【showClose】配置项，用来控制是否要显示关闭按钮', async () => {
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
        :showClose="false"
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

		await wrapper.find('.v3-button').trigger('click');
		await nextTick();
		expect(wrapper.find('.v3-backdrop').isVisible()).toBeTruthy();
		expect(wrapper.find('.v3-dialog .v3-dialog__body').text()).toBe(
			'测试弹窗内容'
		);
		expect(
			wrapper.find('.v3-dialog .v3-dialog__header .v3-icon-close').exists()
		).toBeFalsy();
	});

	test('Dialog 组件可接收【beforeClose】配置项，用来自定义弹窗关闭前的处理', async () => {
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
        :beforeClose="handleBeforeClose"
      >
        测试弹窗内容
      </v3-dialog>
      `,
			data() {
				return {
					showDialog: false,
					hasTriggered: false,
				};
			},
			methods: {
				handleBeforeClose() {
					this.hasTriggered = true;
				},
			},
		});

		await wrapper.find('.v3-button').trigger('click');
		await nextTick();
		expect(wrapper.find('.v3-backdrop').isVisible()).toBeTruthy();
		expect(wrapper.find('.v3-dialog .v3-dialog__body').text()).toBe(
			'测试弹窗内容'
		);

		await wrapper
			.find('.v3-dialog .v3-dialog__header .v3-icon-close')
			.trigger('click');
		await nextTick();
		expect(wrapper.vm.hasTriggered).toBeTruthy();
	});
});
