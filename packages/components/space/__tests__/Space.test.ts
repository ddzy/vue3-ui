import { V3Button, V3Space } from '@components/main';
import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, test } from 'vitest';

describe('V3Space 组件测试：', () => {
	// 自动清理 DOM
	afterEach(() => {
		document.getElementsByTagName('html')[0].innerHTML = '';
	});

	test('V3Space 组件基本用法：', async () => {
		const wrapper = mount({
			components: {
				V3Space,
				V3Button,
			},
			template: `
        <v3-space>
          <v3-button type="primary">按钮1</v3-button>
          <v3-button type="success">按钮2</v3-button>
          <v3-button type="danger">按钮3</v3-button>
          <v3-button type="warning">按钮4</v3-button>
          <v3-button type="info">按钮5</v3-button>
        </v3-space>
      `,
		});

		expect(wrapper.findAll('.v3-space__item').length).toBe(5);
		expect(
			wrapper.find('.v3-space__item').find('.v3-button').exists(),
		).toBeTruthy();
	});

	test('V3Space 可以接收【customClass】配置项，用来自定义容器的类名', async () => {
		const wrapper = mount({
			components: {
				V3Space,
				V3Button,
			},
			template: `
        <v3-space customClass="space-wrapper">
          <v3-button type="primary">按钮1</v3-button>
          <v3-button type="success">按钮2</v3-button>
          <v3-button type="danger">按钮3</v3-button>
          <v3-button type="warning">按钮4</v3-button>
          <v3-button type="info">按钮5</v3-button>
        </v3-space>
      `,
		});

		expect(
			wrapper.find('.v3-space').classes().includes('space-wrapper'),
		).toBeTruthy();
	});

	test('V3Space 可以接收【direction】配置项，用来更改 flex 布局主轴的方向', async () => {
		const wrapper = mount({
			components: {
				V3Space,
				V3Button,
			},
			template: `
        <v3-space direction="column">
          <v3-button type="primary">按钮1</v3-button>
          <v3-button type="success">按钮2</v3-button>
          <v3-button type="danger">按钮3</v3-button>
          <v3-button type="warning">按钮4</v3-button>
          <v3-button type="info">按钮5</v3-button>
        </v3-space>
      `,
		});

		expect(wrapper.find('.v3-space').attributes().style).toContain('column');
	});

	test('V3Space 可以接收【size】配置项，用来控制间距的大小', async () => {
		const wrapper = mount({
			components: {
				V3Space,
				V3Button,
			},
			template: `
        <v3-space wrap :size="20">
          <v3-button type="text">按钮1</v3-button>
          <v3-button type="text">按钮2</v3-button>
          <v3-button type="text">按钮3</v3-button>
          <v3-button type="text">按钮4</v3-button>
          <v3-button type="text">按钮5</v3-button>
          <v3-button type="text">按钮1</v3-button>
          <v3-button type="text">按钮2</v3-button>
          <v3-button type="text">按钮3</v3-button>
          <v3-button type="text">按钮4</v3-button>
          <v3-button type="text">按钮5</v3-button>
          <v3-button type="text">按钮1</v3-button>
          <v3-button type="text">按钮2</v3-button>
          <v3-button type="text">按钮3</v3-button>
          <v3-button type="text">按钮4</v3-button>
          <v3-button type="text">按钮5</v3-button>
        </v3-space>
      `,
		});

		expect(wrapper.find('.v3-space__item').attributes().style).toContain(
			'margin: 0px 20px 20px 0px',
		);
	});

	test('V3Space 可以接收【separator】配置项，用来自定义分隔符', async () => {
		const wrapper = mount({
			components: {
				V3Space,
				V3Button,
			},
			template: `
        <v3-space separator="|">
          <v3-button type="text">按钮1</v3-button>
          <v3-button type="text">按钮2</v3-button>
          <v3-button type="text">按钮3</v3-button>
          <v3-button type="text">按钮4</v3-button>
          <v3-button type="text">按钮5</v3-button>
          <v3-button type="text">按钮1</v3-button>
        </v3-space>
      `,
		});

		expect(wrapper.findAll('.v3-space__item').length).toBe(6);
		expect(wrapper.findAll('.v3-space__separator').length).toBe(5);
		expect(wrapper.find('.v3-space__separator').text()).toBe('|');
	});
});
