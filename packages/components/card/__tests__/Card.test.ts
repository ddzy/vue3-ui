import { mount } from '@vue/test-utils';
import V3Card from '../main';
import V3Button from '@components/button/main';

describe('V3Card 组件测试：', () => {
	test('V3Card 组件基本用法', async () => {
		const wrapper = mount({
			components: {
				V3Card,
				V3Button,
			},
			template: `
        <v3-card title="标题">
          <template #header>
            <h3>自定义标题（优先级比 title props 高）</h3>
          </template>
          <v3-button type="primary">按钮1</v3-button>
          <v3-button type="primary">按钮2</v3-button>
          <v3-button type="primary">按钮3</v3-button>
          <v3-button type="primary">按钮4</v3-button>
          <v3-button type="primary">按钮5</v3-button>
          <v3-button type="primary">按钮6</v3-button>
          <v3-button type="primary">按钮7</v3-button>
          <v3-button type="primary">按钮8</v3-button>
          <v3-button type="primary">按钮9</v3-button>
          <template #footer>
            底部内容
          </template>
        </v3-card>
      `,
		});

		expect(wrapper.find('.v3-card').exists()).toBeTruthy();
		expect(wrapper.find('.v3-card').classes()).toContain('has-header');
		expect(wrapper.find('.v3-card').classes()).toContain('is-shadow--small');
		expect(wrapper.find('.v3-card').classes()).toContain(
			'is-shadow-trigger--alway'
		);
		expect(wrapper.find('.v3-card__header').text()).toBe(
			'自定义标题（优先级比 title props 高）'
		);
		expect(wrapper.findAll('.v3-card__body .v3-button').length).toBe(9);
		expect(wrapper.find('.v3-card__footer').text()).toBe('底部内容');
	});

	test('V3Card 组件可以接收【shadowSize】配置项，用来控制卡片阴影的大小', async () => {
		const wrapper = mount({
			components: {
				V3Card,
			},
			props: {
				shadowSize: {
					type: String,
				},
			},
			template: `
        <v3-card title="标题" :shadowSize="shadowSize">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugit
          facilis blanditiis excepturi, repellat similique animi, architecto
          placeat obcaecati tempore esse et perferendis error at vel voluptate
          recusandae quae doloremque sint.
        </v3-card>
      `,
		});

		// 阴影大小默认为中等
		expect(wrapper.find('.v3-card').classes()).toContain('is-shadow--small');

		await wrapper.setProps({
			shadowSize: 'medium',
		});
		expect(wrapper.find('.v3-card').classes()).toContain('is-shadow--medium');

		await wrapper.setProps({
			shadowSize: 'large',
		});
		expect(wrapper.find('.v3-card').classes()).toContain('is-shadow--large');
	});

	test('V3Card 组件可以接收【shadowTrigger】配置项，用来控制阴影显示的时机', async () => {
		const wrapper = mount({
			components: {
				V3Card,
			},
			props: {
				shadowTrigger: {
					type: String,
				},
			},
			template: `
        <v3-card title="标题" :shadowTrigger="shadowTrigger">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugit
          facilis blanditiis excepturi, repellat similique animi, architecto
          placeat obcaecati tempore esse et perferendis error at vel voluptate
          recusandae quae doloremque sint.
        </v3-card>
      `,
		});

		// 默认一直显示阴影
		expect(wrapper.find('.v3-card').classes()).toContain(
			'is-shadow-trigger--alway'
		);

		// 鼠标 hover 时显示
		await wrapper.setProps({
			shadowTrigger: 'hover',
		});
		expect(wrapper.find('.v3-card').classes()).toContain(
			'is-shadow-trigger--hover'
		);

		// 不显示阴影
		await wrapper.setProps({
			shadowTrigger: 'never',
		});
		expect(wrapper.find('.v3-card').classes()).toContain(
			'is-shadow-trigger--never'
		);
	});

	test('V3Card 组件可以接收【bodyStyle】配置项，用来自定义卡片内容区的样式，以显示多种风格的卡片', async () => {
		const wrapper = mount({
			components: {
				V3Card,
				V3Button,
			},
			props: {
				shadowTrigger: {
					type: String,
				},
			},
			template: `
        <v3-card
          :bodyStyle="{
            padding: 0,
          }"
        >
          <div class="img"></div>

          <template #footer>
            <div class="action">
              <div class="action__tip">
                美丽的风景~
              </div>
              <div class="action__btn">
                <v3-button type="text">查看详情</v3-button>
              </div>
            </div>
          </template>
        </v3-card>
      `,
		});

		expect(wrapper.find('.v3-card__body').attributes().style).toContain(
			'padding: 0px'
		);
		expect(wrapper.find('.v3-card__header').exists()).toBeFalsy();
		expect(wrapper.find('.v3-card__footer').exists()).toBeTruthy();
	});
});
