import { mount } from '@vue/test-utils';
import V3Divider from '../lib/components/Divider.vue';

describe('V3Divider 组件测试：', () => {
	test('V3Divider 组件应该正常工作', () => {
		const wrapper = mount({
			components: {
				V3Divider,
			},
			template: `
        <span>北京</span>
        <v3-divider></v3-divider>
        <span>上海</span>
      `,
		});

		expect(wrapper.find('.v3-divider').exists()).toBeTruthy();
		// 默认为垂直方向
		expect(
			wrapper
				.find('.v3-divider')
				.classes()
				.includes('is-vertical')
		).toBeTruthy();
		// 内容的位置默认为 start
		expect(
			wrapper
				.find('.v3-divider')
				.classes()
				.includes('is-content--start')
		).toBeTruthy();
	});

	test('V3Divider 可以接收【direction】配置项，用来自定义分割线的方向', () => {
		const wrapper = mount({
			components: {
				V3Divider,
			},
			template: `
        <span>试着相信梦吧！或许，当你为之开始努力，便无所谓不可能了。</span>
        <v3-divider direction="horizontal"></v3-divider>
        <span>舍弃一切去做一件事，没有值不值得，只有想不想。</span>
      `,
		});

		expect(
			wrapper
				.find('.v3-divider')
				.classes()
				.includes('is-horizontal')
		).toBeTruthy();
	});

	test('V3Divider 可以接收默认的 slot，用来自定义分割线的内容', () => {
		const wrapper = mount({
			components: {
				V3Divider,
			},
			template: `
        <span>试着相信梦吧！或许，当你为之开始努力，便无所谓不可能了。</span>
        <v3-divider direction="horizontal">
          分割线
        </v3-divider>
        <span>舍弃一切去做一件事，没有值不值得，只有想不想。</span>
        <v3-divider direction="horizontal">
          <i class="v3-icon v3-icon-browse"></i>
        </v3-divider>
        <span>舍弃一切去做一件事，没有值不值得，只有想不想。</span>
      `,
		});

		expect(wrapper.findAll('.v3-divider').length).toBe(2);
		expect(wrapper.findAll('.v3-divider')[0].text()).toBe('分割线');
		expect(
			wrapper
				.findAll('.v3-divider')[1]
				.find('.v3-icon-browse')
				.exists()
		).toBeTruthy();
	});

	test('V3Divider 可以接收【contentPosition】配置项，用来自定义内容的位置', () => {
		const wrapper = mount({
			components: {
				V3Divider,
			},
			template: `
        <span
        >背负罪过的人，在地狱深处品尝绝望，只是如果两人遇见彼此，一同抬头仰望，那处即是天堂。</span
        >
        <v3-divider direction="horizontal" contentPosition="start">
          <i class="v3-icon v3-icon-code"></i>
        </v3-divider>
        <span>试着相信梦吧！或许，当你为之开始努力，便无所谓不可能了。</span>
        <v3-divider direction="horizontal" contentPosition="center">
          <i class="v3-icon v3-icon-code"></i>
        </v3-divider>
        <span>舍弃一切去做一件事，没有值不值得，只有想不想。</span>
        <v3-divider direction="horizontal" contentPosition="end">
          <i class="v3-icon v3-icon-code"></i>
        </v3-divider>
        <span
          >命运，不过是失败者无聊的自慰，不过是懦怯者的解嘲。人们的前途只能靠自己的意志、自己的努力来决定。</span
        >
      `,
		});

		expect(wrapper.findAll('.v3-divider').length).toBe(3);
		expect(
			wrapper
				.findAll('.v3-divider')[0]
				.classes()
				.includes('is-content--start')
		).toBeTruthy();
		expect(
			wrapper
				.findAll('.v3-divider')[1]
				.classes()
				.includes('is-content--center')
		).toBeTruthy();
		expect(
			wrapper
				.findAll('.v3-divider')[2]
				.classes()
				.includes('is-content--end')
		).toBeTruthy();
	});
});
