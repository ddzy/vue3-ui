import { mount } from '@vue/test-utils';
import { reactive } from 'vue';
import V3Row from '../main';
import V3Col from '@components/col/main';

describe('V3Row 组件测试：', () => {
	beforeAll(() => {
		Object.defineProperty(window, 'matchMedia', {
			writable: true,
			value: jest.fn().mockImplementation(query => ({
				matches: false,
				media: query,
				onchange: null,
				addListener: jest.fn(), // Deprecated
				removeListener: jest.fn(), // Deprecated
				addEventListener: jest.fn(),
				removeEventListener: jest.fn(),
				dispatchEvent: jest.fn(),
			})),
		});
	});

	test('V3Row 应该正常接收【justify、align】配置项，用来自定义 flexbox 布局的主轴和副轴的排列方式', async () => {
		const wrapper1 = mount({
			template: `
        <div>
          <v3-row justify="center" align="flex-end">
            <v3-col :span="4">
              <div>123</div>
            </v3-col>
            <v3-col :span="4">
              <div>456</div>
            </v3-col>
            <v3-col :span="4">
              <div>789</div>
            </v3-col>
			    </v3-row>
        </div>
      `,
			components: {
				V3Row,
			},
			setup(props, context) {
				const state = reactive({});

				return {
					state,
				};
			},
		});

		expect(
			wrapper1
				.find('.v3-row')
				.classes()
				.includes('v3-row--flex')
		).toBeTruthy();
		expect(wrapper1.find('.is-justify-center').exists()).toBeTruthy();
		expect(wrapper1.find('.is-align-flex-end').exists()).toBeTruthy();
	});

	test('V3Row 应该正常接收【gutter】配置项，用来自定义列间距', async () => {
		const wrapper1 = mount({
			template: `
        <div>
          <v3-row :gutter="20">
            <v3-col :span="4">
              <div>123</div>
            </v3-col>
            <v3-col :span="4">
              <div>456</div>
            </v3-col>
            <v3-col :span="4">
              <div>789</div>
            </v3-col>
			    </v3-row>
        </div>
      `,
			components: {
				V3Row,
				V3Col,
			},
			setup(props, context) {
				const state = reactive({});

				return {
					state,
				};
			},
		});

		const colElement = wrapper1.find('.v3-col').element;

		expect(window.getComputedStyle(colElement).paddingLeft).toBe('10px');
		expect(window.getComputedStyle(colElement).paddingRight).toBe('10px');
	});
});
