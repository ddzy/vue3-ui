import { mount } from '@vue/test-utils';
import V3Popconfirm from '../main';
import V3Button from '@components/button/main';
import { nextTick } from 'vue';

jest.useFakeTimers();

describe('V3Popconfirm 组件测试：', () => {
	test('V3Popconfirm 组件基本使用', async () => {
		const wrapper = mount({
			components: {
				V3Popconfirm,
				V3Button,
			},
			template: `
        <v3-popconfirm
          content="确定要删除吗？"
          trigger="manual"
          v-model="isVisible"
          :confirmBtnLoading="isLoading"
          @confirm="handleConfirm"
          @cancel="handleCancel"
        >
          <v3-button
            type="danger"
            @click="isVisible = true"
            >删除</v3-button
          >
        </v3-popconfirm>
      `,
			data() {
				return {
					isVisible: false,
					isLoading: false,
				};
			},
			methods: {
				handleConfirm() {
					this.$emit('confirm');
				},
				handleCancel() {
					this.$emit('cancel');
				},
			},
		});

		// 默认不显示
		expect(wrapper.find('.v3-base-popper__dropdown').exists()).toBeFalsy();

		// 手动触发
		await wrapper.findAll('.v3-button')[0].trigger('click');
		expect(wrapper.find('.v3-popconfirm').classes()).toContain('is-visible');
		expect(wrapper.find('.v3-base-popper__dropdown').exists()).toBeTruthy();
		expect(wrapper.find('.v3-popconfirm-content__text').text()).toBe(
			'确定要删除吗？',
		);

		// 点击【取消】按钮关闭气泡框
		await wrapper
			.find('.v3-popconfirm-content__action')
			.findAll('.v3-button')[0]
			.trigger('click');
		setTimeout(() => {
			expect((wrapper.vm.isVisible = false));
			expect(wrapper.emitted()).toHaveProperty('cancel');
		}, 1000);

		// 再次手动触发
		await wrapper.findAll('.v3-button')[0].trigger('click');
		console.log(
			wrapper
				.find('.v3-popconfirm-content__action')
				.findAll('.v3-button')[1]
				.classes(),
		);
		// 点击【确定】按钮
		await wrapper
			.find('.v3-popconfirm-content__action')
			.findAll('.v3-button')[1]
			.trigger('click');
		setTimeout(() => {
			expect((wrapper.vm.isVisible = false));
			expect(wrapper.emitted()).toHaveProperty('confirm');
		}, 1000);

		jest.runAllTimers();
	});

	test('V3Popconfirm 组件可以接收【icon、iconColor】配置项，用来自定义图标和图标颜色', async () => {
		const wrapper = mount({
			components: {
				V3Popconfirm,
				V3Button,
			},
			template: `
        <v3-popconfirm
          content="要隐藏当前文章吗？"
          trigger="click"
          icon="v3-icon-Notvisible"
					iconColor="rgba(201, 27, 38, 1)"
        >
          <v3-button
            type="primary"
            circle
            icon="v3-icon-Notvisible"
          ></v3-button>
        </v3-popconfirm>
      `,
			data() {
				return {};
			},
		});

		// 手动触发
		await wrapper.findAll('.v3-button')[0].trigger('click');

		expect(wrapper.find('.v3-popconfirm-content__text i').classes()).toContain(
			'v3-icon-Notvisible',
		);
		expect(
			wrapper.find('.v3-popconfirm-content__text i').attributes().style,
		).toContain('color: rgb(201, 27, 38);');
	});

	test('V3Popconfirm 组件可以接收【confirmBtnType、confirmBtnSize、confirmBtnText、cancelBtnType、cancelBtnSize、cancelBtnText】等配置项，用来自定义气泡框内部操作按钮', async () => {
		const wrapper = mount({
			components: {
				V3Popconfirm,
				V3Button,
			},
			template: `
        <v3-popconfirm
          content="确定要删除吗？"
          trigger="click"
          placement="bottom"
          confirmBtnType="success"
          cancelBtnType="default"
          cancelBtnSize="small"
        >
          <v3-button class="btn-1" type="primary">类型</v3-button>
        </v3-popconfirm>

        <v3-popconfirm
          content="确定要删除吗？"
          trigger="click"
          placement="bottom"
          confirmBtnSize="small"
        >
          <v3-button class="btn-2" type="primary">大小</v3-button>
        </v3-popconfirm>

        <v3-popconfirm
          content="确定要删除吗？"
          trigger="click"
          placement="bottom"
          cancelBtnText="不用了"
          confirmBtnText="继续"
        >
          <v3-button class="btn-3" type="primary">内容</v3-button>
        </v3-popconfirm>
      `,
			data() {
				return {};
			},
		});

		// 触发第一个气泡框
		await wrapper.find('.btn-1').trigger('click');
		await nextTick();
		expect(
			wrapper
				.findAll('.v3-popconfirm')[0]
				.find('.v3-popconfirm-content__action')
				.findAll('.v3-button')[0]
				.classes(),
		).toContain('v3-button--default');
		expect(
			wrapper
				.findAll('.v3-popconfirm')[0]
				.find('.v3-popconfirm-content__action')
				.findAll('.v3-button')[1]
				.classes(),
		).toContain('v3-button--success');

		// 触发第二个气泡框
		await wrapper.find('.btn-2').trigger('click');
		await nextTick();
		expect(
			wrapper
				.findAll('.v3-popconfirm')[1]
				.find(' .v3-popconfirm-content__action')
				.findAll('.v3-button')[1]
				.classes(),
		).toContain('is-size--small');

		// 触发第三个气泡框
		await wrapper.find('.btn-3').trigger('click');
		expect(
			wrapper
				.findAll('.v3-popconfirm')[2]
				.find('.v3-popconfirm-content__action')
				.findAll('.v3-button')[0]
				.text(),
		).toBe('不用了');
		expect(
			wrapper
				.findAll('.v3-popconfirm')[2]
				.find('.v3-popconfirm-content__action')
				.findAll('.v3-button')[1]
				.text(),
		).toBe('继续');
	});
});
