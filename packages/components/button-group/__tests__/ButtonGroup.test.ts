import { mount } from '@vue/test-utils';
import ButtonGroup from '../main';
import Button from 'button';

describe('ButtonGroup 组件测试：', () => {
	test('ButtonGroup 组件应该正常接收【Button】组件作为 slot 并渲染', () => {
		const component = {
			components: {
				ButtonGroup,
				Button,
			},
			template: `
        <div>
          <button-group>
            <Button
              type="primary"
              icon="v3-icon-arrow-left"
            >上一页</Button>
            <Button
              type="primary"
              icon="v3-icon-assessed-badge"
            ></Button>
            <Button type="primary">
              <span>下一页</span>
              <i class="v3-icon v3-icon-arrow-right"></i>
            </Button>
          </button-group>
        </div>
      `,
		};
		const wrapper = mount(component);

		expect(wrapper.find('.v3-button-group').classes().length).toBe(1);
		expect(wrapper.classes().includes('v3-button-group'));
		expect(wrapper.findAll('.v3-icon').length).toBe(3);
	});
});
