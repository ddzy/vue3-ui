import { mount } from '@vue/test-utils';
import V3Tooltip from '../main';
import V3Button from '@components/button/main';
import { nextTick } from 'vue';

jest.useFakeTimers();

describe('V3Tooltip 组件测试：', () => {
	test('V3Tooltip 基本用()法', async () => {
		const wrapper = mount({
			components: {
				V3Tooltip,
				V3Button,
			},
			template: `
        <v3-tooltip
          content="测试内容"
          trigger="click"
        >
          <v3-button plain>点击我</v3-button>
        </v3-tooltip>
      `,
		});

		await wrapper.find('.v3-button--default').trigger('click');
		expect(wrapper.find('.v3-base-popper__dropdown').exists()).toBeTruthy();
		expect(wrapper.find('.v3-base-popper__dropdown').text()).toBe('测试内容');
	});

	test('V3Tooltip 可以通过传入【slot="content"】来自定义内容', async () => {
		const wrapper = mount({
			components: {
				V3Tooltip,
				V3Button,
			},
			template: `
        <v3-tooltip
          content="测试内容"
          trigger="click"
        >
          <v3-button plain>点击我</v3-button>
          <template #content>
						<p style="margin: 0; max-width: 200px; word-break: break-all">
							听过这样一句话，并不是每一条鱼，都生活在同一片海里。每个人都有自己的幸福阈值，如鱼饮水，冷暖自知。若用自己的经验随意去评价他人的生活，只会给彼此带来麻烦和困扰
						</p>
					</template>
        </v3-tooltip>
      `,
		});

		await wrapper.find('.v3-button--default').trigger('click');
		expect(wrapper.find('.v3-base-popper__dropdown').exists()).toBeTruthy();
		expect(wrapper.find('.v3-base-popper__dropdown').text()).toBe(
			'听过这样一句话，并不是每一条鱼，都生活在同一片海里。每个人都有自己的幸福阈值，如鱼饮水，冷暖自知。若用自己的经验随意去评价他人的生活，只会给彼此带来麻烦和困扰'
		);
	});

	test('V3Tooltip 可以通过传入【disabled】配置项来禁用 tooltip', async () => {
		const wrapper = mount({
			components: {
				V3Tooltip,
				V3Button,
			},
			template: `
        <v3-tooltip
          content="测试内容"
          trigger="click"
          disabled
        >
          <v3-button plain>点击我</v3-button>
        </v3-tooltip>
      `,
		});

		await wrapper.find('.v3-button--default').trigger('click');
		expect(wrapper.find('.v3-base-popper__dropdown').exists()).toBeFalsy();
	});

	test('V3Tooltip 可以传入【delay】配置项，用来自定义 tooltip 显示/隐藏的延时', async () => {
		const wrapper = mount({
			components: {
				V3Tooltip,
				V3Button,
			},
			template: `
        <v3-tooltip
          content="测试内容"
          trigger="click"
          :delay="[1000, 1000]"
        >
          <v3-button plain>点击我</v3-button>
        </v3-tooltip>
      `,
		});

		function doAsync(callback: Function) {
			setTimeout(() => {
				callback();
			}, 1000);
		}

		await wrapper.find('.v3-button--default').trigger('click');
		expect(wrapper.find('.v3-base-popper__dropdown').exists()).toBeFalsy();

		doAsync(() => {
			expect(wrapper.find('.v3-base-popper__dropdown').exists()).toBeTruthy();
		});

		jest.advanceTimersByTime(1000);
	});
});
