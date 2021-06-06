import { mount, shallowMount } from '@vue/test-utils';
import { nextTick, reactive } from 'vue';
import V3CheckboxGroup from '../src/components/CheckboxGroup.vue';
import V3Checkbox from '../src/components/Checkbox.vue';

describe('CheckboxGroup 组件测试：', () => {
	test('CheckboxGroup 应该正常双向绑定一组数字类型的值', async () => {
		const wrapper1 = mount({
			template: `
        <div>
          <v3-checkbox-group v-model="state.checkboxValue" @change="handleChange">
            <v3-checkbox :label="1">多选1</v3-checkbox>
            <v3-checkbox :label="2" :disabled="true">多选2</v3-checkbox>
            <v3-checkbox :label="3">多选3</v3-checkbox>
            <v3-checkbox :label="4">多选4</v3-checkbox>
			    </v3-checkbox-group>
        </div>
      `,
			components: {
				V3CheckboxGroup,
				V3Checkbox,
			},
			emits: ['change'],
			setup(props, context) {
				const state = reactive({
					checkboxValue: [2],
				});

				function handleChange(v: MouseEvent) {
					context.emit('change', v);
				}

				return {
					state,
					handleChange,
				};
			},
		});

		// 默认选中第二个
		expect(
			wrapper1
				.find('.is-checked')
				.find('input[type="checkbox"]')
				.attributes().value
		).toBe('2');

		// 手动全部选中
		await wrapper1.find('input[type="checkbox"][value="1"]').setValue(true);
		await wrapper1.find('input[type="checkbox"][value="3"]').setValue(true);
		await wrapper1.find('input[type="checkbox"][value="4"]').setValue(true);
		expect(wrapper1.vm.state.checkboxValue).toEqual([2, 1, 3, 4]);

		// 手动全部不选中
		await wrapper1.find('input[type="checkbox"][value="1"]').setValue(false);
		await wrapper1.find('input[type="checkbox"][value="2"]').setValue(false);
		await wrapper1.find('input[type="checkbox"][value="3"]').setValue(false);
		await wrapper1.find('input[type="checkbox"][value="4"]').setValue(false);
		expect(wrapper1.vm.state.checkboxValue).toEqual([2]);
	});

	test('CheckboxGroup 应该正常双向绑定一组字符串类型的值', async () => {
		const wrapper1 = mount({
			template: `
        <div>
          <v3-checkbox-group v-model="state.checkboxValue" @change="handleChange">
            <v3-checkbox :label="'庆阳'">多选1</v3-checkbox>
            <v3-checkbox :label="'广州'">多选2</v3-checkbox>
            <v3-checkbox :label="'深圳'">多选3</v3-checkbox>
            <v3-checkbox :label="'东莞'">多选4</v3-checkbox>
			    </v3-checkbox-group>
        </div>
      `,
			components: {
				V3CheckboxGroup,
				V3Checkbox,
			},
			emits: ['change'],
			setup(props, context) {
				const state = reactive({
					checkboxValue: [],
				});

				function handleChange(v: MouseEvent) {
					context.emit('change', v);
				}

				return {
					state,
					handleChange,
				};
			},
		});

		// 默认全都不选中
		expect(wrapper1.find('.is-checked').exists()).toBeFalsy();

		// 手动全部选中
		await wrapper1.find('input[type="checkbox"][value="庆阳"]').setValue(true);
		await wrapper1.find('input[type="checkbox"][value="广州"]').setValue(true);
		await wrapper1.find('input[type="checkbox"][value="深圳"]').setValue(true);
		await wrapper1.find('input[type="checkbox"][value="东莞"]').setValue(true);
		expect(wrapper1.vm.state.checkboxValue).toEqual([
			'庆阳',
			'广州',
			'深圳',
			'东莞',
		]);

		// 手动全部不选中
		await wrapper1.find('input[type="checkbox"][value="庆阳"]').setValue(false);
		await wrapper1.find('input[type="checkbox"][value="广州"]').setValue(false);
		await wrapper1.find('input[type="checkbox"][value="深圳"]').setValue(false);
		await wrapper1.find('input[type="checkbox"][value="东莞"]').setValue(false);
		expect(wrapper1.vm.state.checkboxValue).toEqual([]);
	});

	test('CheckboxGroup 应该正常双向绑定一组布尔类型的值', async () => {
		const wrapper1 = mount({
			template: `
        <div>
          <v3-checkbox-group v-model="state.checkboxValue" @change="handleChange">
            <v3-checkbox :label="true">多选1</v3-checkbox>
            <v3-checkbox :label="false">多选2</v3-checkbox>
            <v3-checkbox :label="true">多选3</v3-checkbox>
            <v3-checkbox :label="true">多选4</v3-checkbox>
			    </v3-checkbox-group>
        </div>
      `,
			components: {
				V3CheckboxGroup,
				V3Checkbox,
			},
			emits: ['change'],
			setup(props, context) {
				const state = reactive({
					checkboxValue: [true, true, true],
				});

				function handleChange(v: MouseEvent) {
					context.emit('change', v);
				}

				return {
					state,
					handleChange,
				};
			},
		});

		// 默认选中三个
		expect(wrapper1.findAll('.is-checked').length).toBe(3);

		// 手动全部选中
		await wrapper1.find('input[type="checkbox"][value="false"]').setValue(true);
		expect(wrapper1.vm.state.checkboxValue).toEqual([true, true, true, false]);

		// 手动全部不选中
		await wrapper1.find('input[type="checkbox"][value="true"]').setValue(false);
		await wrapper1.find('input[type="checkbox"][value="true"]').setValue(false);
		await wrapper1.find('input[type="checkbox"][value="true"]').setValue(false);
		await wrapper1
			.find('input[type="checkbox"][value="false"]')
			.setValue(false);
		expect(wrapper1.vm.state.checkboxValue).toEqual([]);
	});

	test('CheckboxGroup 多选框组 + indeterminate 状态示例', async () => {
		const wrapper1 = mount({
			template: `
        <div>
          <div class="controller">
            <v3-checkbox
              v-model="state.checkboxValue1"
              :indeterminate="state.checkboxIndeterminate1"
              @change="handleCheckbox1Change"
            >全选</v3-checkbox>
          </div>
          <div class="selector">
            <v3-checkbox-group
              v-model="state.checkboxValue2"
              @change="handleCheckbox2Change"
            >
              <v3-checkbox
                v-for="v in state.checkboxOriginValue2"
                :key="v._id"
                :label="v._id"
                :disabled="v.disabled"
                >{{ v.name }}</v3-checkbox
              >
            </v3-checkbox-group>
          </div>
        </div>
      `,
			components: {
				V3CheckboxGroup,
				V3Checkbox,
			},
			emits: ['change'],
			setup(props, context) {
				const state = reactive({
					checkboxValue1: false,
					checkboxIndeterminate1: false,

					checkboxValue2: [],
					checkboxOriginValue2: [
						{
							_id: 'banana',
							name: '多选项1',
							disabled: false,
						},
						{
							_id: 'apple',
							name: '多选项2',
							disabled: false,
						},
						{
							_id: 'orange',
							name: '多选项3',
							disabled: false,
						},
						{
							_id: 'grape',
							name: '多选项4',
							disabled: false,
						},
					],
				});

				function handleChange(v: MouseEvent) {
					context.emit('change', v);
				}

				return {
					state,
					handleChange,
				};
			},
			methods: {
				handleCheckbox2Change(v: string[]) {
					this.state.checkboxIndeterminate1 =
						v.length > 0 && v.length < this.state.checkboxOriginValue2.length;
					this.state.checkboxValue1 =
						v.length === this.state.checkboxOriginValue2.length;
				},
				handleCheckbox1Change(v: boolean) {
					// 全选 or 全不选
					if (v) {
						this.state.checkboxValue2 = this.state.checkboxOriginValue2.map(
							innerV => {
								return innerV._id;
							}
						) as never[];
						this.state.checkboxValue1 = true;
					} else {
						this.state.checkboxValue2 = [];
						this.state.checkboxValue1 = false;
					}
					this.state.checkboxIndeterminate1 = false;
				},
			},
		});

		// 默认全部【不选中】
		expect(wrapper1.find('.selector').findAll('.is-checked').length).toBe(0);

		// 手动全选
		await wrapper1
			.find('.controller')
			.find('input[type="checkbox"]')
			.setValue(true);
		await nextTick();
		expect(wrapper1.find('.selector').findAll('.is-checked').length).toBe(4);
		// 全选之后图标也要变化
		expect(
			wrapper1
				.find('.controller')
				.find('.v3-icon-checkbox-selected')
				.exists()
		).toBeTruthy();

		// 手动全不选（再次点击则全不选）
		await wrapper1
			.find('.controller')
			.find('input[type="checkbox"]')
			.setValue(false);
		await nextTick();
		expect(wrapper1.find('.selector').findAll('.is-checked').length).toBe(0);
		// 全不选之后图标也要变化
		expect(
			wrapper1
				.find('.controller')
				.find('.v3-icon-checkbox-default')
				.exists()
		).toBeTruthy();

		// 全选之后，手动取消选择第一、二项
		await wrapper1
			.find('.controller')
			.find('input[type="checkbox"]')
			.setValue(true);
		await wrapper1
			.find('.selector')
			.find('input[type="checkbox"][value="banana"]')
			.setValue(false);
		await wrapper1
			.find('.selector')
			.find('input[type="checkbox"][value="apple"]')
			.setValue(false);
		await nextTick();
		expect(wrapper1.vm.state.checkboxValue2.length).toBe(2);
		expect(wrapper1.find('.selector').findAll('.is-checked').length).toBe(2);
		// 图标也要变为不确定状态
		expect(
			wrapper1
				.find('.controller')
				.find('.v3-icon-checkbox-indeterminated')
				.exists()
		).toBeTruthy();
		// 这时候，再次全选
		await wrapper1
			.find('.controller')
			.find('input[type="checkbox"]')
			.setValue(true);
		await nextTick();
		expect(wrapper1.vm.state.checkboxValue2.length).toBe(4);
		expect(wrapper1.find('.selector').findAll('.is-checked').length).toBe(4);
	});

	test('CheckboxGroup 多选框组 + 限制【最大/最小】选择数量示例', async () => {
		const wrapper1 = mount({
			template: `
        <div>
          <v3-checkbox-group v-model="state.checkboxValue" :max="4" :min="2">
            <v3-checkbox
              v-for="v in state.checkboxOriginValue"
              :key="v._id"
              :label="v._id"
              :disabled="v.disabled"
              >{{ v.name }}</v3-checkbox
            >
          </v3-checkbox-group>
        </div>
      `,
			components: {
				V3CheckboxGroup,
				V3Checkbox,
			},
			emits: ['change'],
			setup(props, context) {
				const state = reactive({
					checkboxValue: ['banana', 'orange'],
					checkboxOriginValue: [
						{
							_id: 'banana',
							name: '多选项1',
							disabled: false,
						},
						{
							_id: 'apple',
							name: '多选项2',
							disabled: false,
						},
						{
							_id: 'orange',
							name: '多选项3',
							disabled: true,
						},
						{
							_id: 'grape',
							name: '多选项4',
							disabled: false,
						},
						{
							_id: 'watermelon',
							name: '多选项5',
							disabled: false,
						},
						{
							_id: 'peach',
							name: '多选项6',
							disabled: false,
						},
					],
				});

				function handleChange(v: MouseEvent) {
					context.emit('change', v);
				}

				return {
					state,
					handleChange,
				};
			},
		});

		// 默认选中第一、第三个，并且是禁用状态
		expect(wrapper1.findAll('.is-checked').length).toBe(2);
		await nextTick();
		expect(wrapper1.findAll('.is-disabled').length).toBe(2);

		// 继续选中第二、第四个，达到最大选择数目
		await wrapper1
			.findAll('.v3-checkbox')[1]
			.find('input[type="checkbox"]')
			.setValue(true);
		await wrapper1
			.findAll('.v3-checkbox')[3]
			.find('input[type="checkbox"]')
			.setValue(true);
		expect(wrapper1.findAll('.is-checked').length).toBe(4);
		expect(wrapper1.findAll('.is-disabled').length).toBe(3);
	});
});
