import { V3Button, V3ButtonGroup } from '@components/main';
import { mount } from '@vue/test-utils';

describe('ButtonGroup 组件测试：', () => {
	test('ButtonGroup 组件应该正常接收【Button】组件作为 slot 并渲染', () => {
		const component = {
			components: {
				V3Button,
				V3ButtonGroup,
			},
			template: `
        <v3-button-group>
          <v3-button
            type="primary"
            icon="Left"
          >上一页</v3-button>
          <v3-button
            type="primary"
            icon="More"
          ></v3-button>
          <v3-button type="primary" icon="Right">
            <span>下一页</span>
          </v3-button>
        </v3-button-group>
      `,
		};
		const wrapper = mount(component);

		expect(wrapper.find('.v3-button-group').classes().length).toBe(1);
		expect(wrapper.classes().includes('v3-button-group'));
		expect(wrapper.findAll('.v3-icon').length).toBe(3);
	});
});
