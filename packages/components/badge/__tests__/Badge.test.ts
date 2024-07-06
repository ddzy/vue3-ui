import { V3Badge, V3Button } from '@components/main';
import { mount } from '@vue/test-utils';

describe('V3Badge 组件测试：', () => {
	test('V3Badge 组件基本用法', async () => {
		const wrapper = mount({
			components: {
				V3Badge,
				V3Button,
			},
			template: `
        <v3-badge :value="9">
          <v3-button plain>按钮1</v3-button>
        </v3-badge>
        <v3-badge :value="99" type="success">
          <v3-button plain>按钮1</v3-button>
        </v3-badge>
        <v3-badge :value="999" type="danger">
          <v3-button plain>按钮1</v3-button>
        </v3-badge>
        <v3-badge value="new1" type="warning">
          <v3-button plain>按钮1</v3-button>
        </v3-badge>
        <v3-badge value="new2" type="info">
          <v3-button plain>按钮1</v3-button>
        </v3-badge>
      `,
		});

		expect(wrapper.findAll('.v3-badge').length).toBe(5);
		expect(wrapper.findAll('.v3-badge__content')[0].text()).toBe('9');
		expect(wrapper.findAll('.v3-badge__content')[3].text()).toBe('new1');
		expect(
			wrapper.findAll('.v3-badge')[1].classes().includes('v3-badge--success'),
		);
		expect(
			wrapper.findAll('.v3-badge')[2].classes().includes('v3-badge--danger'),
		);
	});

	test('V3Badge 组件可以接收【dot】配置项，将徽标显示为圆点样式', async () => {
		const wrapper = mount({
			components: {
				V3Badge,
				V3Button,
			},
			template: `
        <v3-badge dot type="primary">
          <v3-button type="primary" icon="Search"></v3-button>
        </v3-badge>
        <v3-badge dot type="success">
          <v3-button type="success" icon="Search"></v3-button>
        </v3-badge>
        <v3-badge dot type="danger">
          <v3-button
            type="danger"
            icon="Search"
          ></v3-button>
        </v3-badge>
        <v3-badge dot type="warning">
          文本4
        </v3-badge>
        <v3-badge dot type="info">
          文本5
        </v3-badge>
      `,
		});

		expect(wrapper.findAll('.v3-badge.is-dot').length).toBe(5);
	});

	test('V3Badge 组件可以接收【backgroundColor、color】配置项，用来自定义徽标的颜色', async () => {
		const wrapper = mount({
			components: {
				V3Badge,
				V3Button,
			},
			template: `
        <v3-badge backgroundColor="red" color="white" :value="9">
          <v3-button plain>按钮1</v3-button>
        </v3-badge>
        <v3-badge
          backgroundColor="pink"
          color="darkred"
          :value="99"
          type="success"
        >
          <v3-button plain>按钮1</v3-button>
        </v3-badge>
        <v3-badge
          backgroundColor="purple"
          color="#fff"
          :value="999"
          type="danger"
        >
          <v3-button plain>按钮1</v3-button>
        </v3-badge>
      `,
		});

		expect(wrapper.find('.v3-badge__content').attributes().style).toContain(
			'background-color: red; color: white;',
		);
	});

	test('V3Badge 组件可以接收【max】配置项，用来限制徽标的最大值', async () => {
		const wrapper = mount({
			components: {
				V3Badge,
				V3Button,
			},
			template: `
        <v3-badge :value="144" :max="99" type="warning">
          <v3-button plain>按钮1</v3-button>
        </v3-badge>
        <v3-badge :value="20" :max="99" type="info">
          <v3-button plain>按钮2</v3-button>
        </v3-badge>
      `,
		});

		expect(wrapper.findAll('.v3-badge__content')[0].text()).toBe('99+');
		expect(wrapper.findAll('.v3-badge__content')[1].text()).toBe('20');
	});
});
