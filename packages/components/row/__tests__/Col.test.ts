import { mount } from '@vue/test-utils';
import { reactive } from 'vue';
import V3Row from '../src/components/Row.vue';
import V3Col from '../src/components/Col.vue';

describe('V3Col 组件测试：', () => {
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

	test('V3Col 应该正常接收【span】配置项，用来自定义所占的列数，总共 12 列', async () => {
		const wrapper1 = mount({
			template: `
        <div>
          <v3-row>
            <v3-col :span="props.span">
              <div>123</div>
            </v3-col>
            <v3-col :span="props.span">
              <div>456</div>
            </v3-col>
            <v3-col :span="props.span">
              <div>789</div>
            </v3-col>
			    </v3-row>
        </div>
      `,
			components: {
				V3Row,
				V3Col,
			},
			props: {
				span: {
					type: Number,
					default: 4,
				},
			},
			setup(props, context) {
				const state = reactive({});

				return {
					state,
					props,
				};
			},
		});

		// 正常区间内的值（1 - 12）
		expect(wrapper1.findAll('.v3-col-span-4').length).toBe(3);
	});

	test('V3Col 应该正常接收【offset】配置项，用来自定义列的偏移量', async () => {
		const wrapper1 = mount({
			template: `
        <div>
          <v3-row>
            <v3-col :span="4" :offset="4">
              <div>123</div>
            </v3-col>
            <v3-col :span="4">
              <div>456</div>
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
					props,
				};
			},
		});

		expect(
			wrapper1
				.find('.v3-col-span-4')
				.classes()
				.includes('v3-col-offset-4')
		);
		expect(wrapper1.find('.v3-col-offset-4').exists()).toBeTruthy();
	});

	test('V3Col 应该正常接收【push、pull】配置项，用来自定义列的位移量', async () => {
		const wrapper1 = mount({
			template: `
        <div>
          <v3-row>
            <v3-col :span="4">
              <div>123</div>
            </v3-col>
            <v3-col :span="4" :push="props.push">
              <div>456</div>
            </v3-col>
            <v3-col :span="4" :pull="props.pull">
              <div>789</div>
            </v3-col>
			    </v3-row>
        </div>
      `,
			components: {
				V3Row,
				V3Col,
			},
			props: {
				push: {
					type: Number,
					default: 2,
				},
				pull: {
					type: Number,
					default: 6,
				},
			},
			setup(props, context) {
				const state = reactive({});

				return {
					state,
					props,
				};
			},
		});

		// 1 - 12 区间的值
		expect(wrapper1.find('.v3-col-push-2').exists()).toBeTruthy();
		expect(wrapper1.find('.v3-col-pull-6').exists()).toBeTruthy();
	});
});
