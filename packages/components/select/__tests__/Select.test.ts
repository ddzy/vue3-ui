import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import V3Select from '../src/components/Select.vue';
import V3SelectOption from '../src/components/SelectOption.vue';

describe('V3Select 组件测试：', () => {
	test('V3Select 组件基本用法', async () => {
		const wrapper = mount({
			components: {
				V3Select,
				V3SelectOption,
			},
			template: `
        <v3-select v-model="selectedValue">
          <v3-select-option
            v-for="v in selectOptions"
            :key="v.value"
            :value="v.value"
            :label="v.label"
            :disabled="v.disabled"
          ></v3-select-option>
        </v3-select>
      `,
			data() {
				return {
					selectedValue: 'Beijing',
					selectOptions: [
						{
							label: '北京',
							value: 'Beijing',
							disabled: false,
						},
						{
							label: '上海',
							value: 'Shanghai',
							disabled: true,
						},
						{
							label: '广州',
							value: 'Guangzhou',
							disabled: false,
						},
						{
							label: '深圳',
							value: 'Shenzhen',
							disabled: false,
						},
					],
				};
			},
		});

		await wrapper.find('.v3-input').trigger('click');
		expect(wrapper.find('.v3-select__dropdown').exists()).toBeTruthy();
		expect(wrapper.findAll('.v3-select-dropdown__item').length).toBe(4);
		expect(
			wrapper.findAll('.v3-select-dropdown__item.is-selected').length
		).toBe(1);
		expect(
			wrapper.findAll('.v3-select-dropdown__item.is-disabled').length
		).toBe(1);

		// 默认选中第一项
		expect(
			wrapper
				.findAll('.v3-select-dropdown__item')[0]
				.classes()
				.includes('is-selected')
		).toBeTruthy();

		// 第二项是禁用的，不能选中
		await wrapper.findAll('.v3-select-dropdown__item')[1].trigger('click');
		await nextTick();
		expect(wrapper.find('input').element.value).toBe('北京');

		// 可以选中第三项
		await wrapper.findAll('.v3-select-dropdown__item')[2].trigger('click');
		await nextTick();
		expect(wrapper.find('input').element.value).toBe('广州');
		expect(wrapper.vm.selectedValue).toBe('Guangzhou');
	});

	test('V3Select 组件可以绑定一个对象类型的值，但是需要指定【value-key】属性', async () => {
		const wrapper = mount({
			components: {
				V3Select,
				V3SelectOption,
			},
			template: `
        <v3-select value-key="_id" v-model="selectedValue" >
          <v3-select-option
            v-for="v in selectOptions"
            :key="v.value"
            :value="v.value"
            :label="v.label"
            :disabled="v.disabled"
          ></v3-select-option>
        </v3-select>
      `,
			data() {
				return {
					selectedValue: '',
					selectOptions: [
						{
							label: '对象1',
							value: {
								_id: 1,
								name: 1,
								age: 1,
							},
							disabled: false,
						},
						{
							label: '对象2',
							value: {
								_id: 2,
								name: 2,
								age: 2,
							},
							disabled: false,
						},
						{
							label: '对象3',
							value: {
								_id: 3,
								name: 3,
								age: 3,
							},
							disabled: false,
						},
						{
							label: '对象4',
							value: {
								_id: 4,
								name: 4,
								age: 4,
							},
							disabled: false,
						},
					],
				};
			},
		});

		// 默认不选中任何项
		await wrapper.find('.v3-input').trigger('click');
		expect(wrapper.findAll('.v3-select-dropdown__item').length).toBe(4);
		expect(
			wrapper.findAll('.v3-select-dropdown__item.is-selected').length
		).toBe(0);

		// 手动选中第一项
		await wrapper.findAll('.v3-select-dropdown__item')[0].trigger('click');
		await nextTick();
		expect(wrapper.find('input').element.value).toBe('对象1');
		expect(wrapper.vm.selectedValue).toEqual({
			_id: 1,
			name: 1,
			age: 1,
		});
	});

	test('V3Select 组件可以接收【disabled】配置项，用来禁用下拉框', async () => {
		const wrapper = mount({
			components: {
				V3Select,
				V3SelectOption,
			},
			template: `
        <v3-select value-key="_id" v-model="selectedValue" :disabled="true">
          <v3-select-option
            v-for="v in selectOptions"
            :key="v.value"
            :value="v.value"
            :label="v.label"
            :disabled="v.disabled"
          ></v3-select-option>
        </v3-select>
      `,
			data() {
				return {
					selectedValue: '',
					selectOptions: [
						{
							label: '对象1',
							value: {
								_id: 1,
								name: 1,
								age: 1,
							},
							disabled: false,
						},
						{
							label: '对象2',
							value: {
								_id: 2,
								name: 2,
								age: 2,
							},
							disabled: false,
						},
						{
							label: '对象3',
							value: {
								_id: 3,
								name: 3,
								age: 3,
							},
							disabled: false,
						},
						{
							label: '对象4',
							value: {
								_id: 4,
								name: 4,
								age: 4,
							},
							disabled: false,
						},
					],
				};
			},
		});

		// 默认不选中任何项
		await wrapper.find('.v3-input').trigger('click');
		expect(wrapper.find('.v3-select__dropdown').exists()).toBeFalsy();
		expect(wrapper.findAll('.v3-select-dropdown__item').length).toBe(0);
	});

	test('V3Select 组件可以多选', async () => {
		const wrapper = mount({
			components: {
				V3Select,
				V3SelectOption,
			},
			template: `
        <v3-select
          v-model="selectedValue"
          :multiple="true"
        >
          <v3-select-option
            v-for="v in selectOptions"
            :key="v.value"
            :value="v.value"
            :label="v.label"
            :disabled="v.disabled"
          ></v3-select-option>
        </v3-select>
      `,
			data() {
				return {
					selectedValue: [],
					selectOptions: [
						{
							label: '北京',
							value: 'Beijing',
							disabled: false,
						},
						{
							label: '上海',
							value: 'Shanghai',
							disabled: false,
						},
						{
							label: '广州',
							value: 'Guangzhou',
							disabled: false,
						},
						{
							label: '深圳',
							value: 'Shenzhen',
							disabled: false,
						},
					],
				};
			},
		});

		// 选中两项
		await wrapper.find('.v3-input').trigger('click');
		await wrapper.findAll('.v3-select-dropdown__item')[2].trigger('click');
		await wrapper.find('.v3-input').trigger('click');
		await wrapper.findAll('.v3-select-dropdown__item')[3].trigger('click');
		await nextTick();
		expect(wrapper.findAll('.v3-select__tag-item').length).toBe(2);
		expect(
			wrapper.findAll('.v3-select-dropdown__item.is-selected').length
		).toBe(2);
		expect(wrapper.findAll('.v3-tag')[0].text()).toBe('广州');
		expect(wrapper.findAll('.v3-tag')[1].text()).toBe('深圳');
		expect(wrapper.vm.selectedValue).toEqual(['Guangzhou', 'Shenzhen']);
	});

	test('V3Select 组件在多选的情况下，可以合并标签以节省空间', async () => {
		const wrapper = mount({
			components: {
				V3Select,
				V3SelectOption,
			},
			template: `
        <v3-select
          v-model="selectedValue"
          :multiple="true"
          :collapseTags="true"
        >
          <v3-select-option
            v-for="v in selectOptions"
            :key="v.value"
            :value="v.value"
            :label="v.label"
            :disabled="v.disabled"
          ></v3-select-option>
        </v3-select>
      `,
			data() {
				return {
					selectedValue: [],
					selectOptions: [
						{
							label: '北京',
							value: 'Beijing',
							disabled: false,
						},
						{
							label: '上海',
							value: 'Shanghai',
							disabled: false,
						},
						{
							label: '广州',
							value: 'Guangzhou',
							disabled: false,
						},
						{
							label: '深圳',
							value: 'Shenzhen',
							disabled: false,
						},
					],
				};
			},
		});

		// 选中两项
		await wrapper.find('.v3-input').trigger('click');
		await wrapper.findAll('.v3-select-dropdown__item')[2].trigger('click');
		await wrapper.find('.v3-input').trigger('click');
		await wrapper.findAll('.v3-select-dropdown__item')[3].trigger('click');
		await nextTick();
		expect(wrapper.findAll('.v3-select__tag-item').length).toBe(2);
		expect(
			wrapper.findAll('.v3-select-dropdown__item.is-selected').length
		).toBe(2);
		expect(wrapper.findAll('.v3-tag')[0].text()).toBe('广州');
		expect(wrapper.findAll('.v3-tag')[1].text()).toBe('+ 1');
		expect(wrapper.vm.selectedValue).toEqual(['Guangzhou', 'Shenzhen']);
	});

	test('V3Select 组件可以接收【size】配置项，用来控制下拉框的尺寸', async () => {
		const wrapper = mount({
			components: {
				V3Select,
				V3SelectOption,
			},
			template: `
				<v3-select size="small" v-model="selectValue" :multiple="true">
					<v3-select-option
						v-for="v in selectOptions"
						:key="v.value"
						:value="v.value"
						:label="v.label"
					></v3-select-option>
				</v3-select>

				<v3-select size="medium" v-model="selectValue" :multiple="true">
					<v3-select-option
						v-for="v in selectOptions"
						:key="v.value"
						:value="v.value"
						:label="v.label"
					></v3-select-option>
				</v3-select>

				<v3-select size="large" v-model="selectValue" :multiple="true">
					<v3-select-option
						v-for="v in selectOptions"
						:key="v.value"
						:value="v.value"
						:label="v.label"
					></v3-select-option>
				</v3-select>
			`,
			data() {
				return {
					selectValue: ['Beijing', 'Shanghai'],
					selectOptions: [
						{
							label: '北京',
							value: 'Beijing',
							disabled: false,
						},
						{
							label: '上海',
							value: 'Shanghai',
							disabled: false,
						},
						{
							label: '广州',
							value: 'Guangzhou',
							disabled: false,
						},
						{
							label: '深圳',
							value: 'Shenzhen',
							disabled: false,
						},
					],
				};
			},
		});

		expect(wrapper.findAll('.v3-select').length).toBe(3);
		expect(wrapper.findAll('.v3-select .v3-input.is-size--small').length).toBe(
			1
		);
		expect(wrapper.findAll('.v3-select .v3-input.is-size--medium').length).toBe(
			1
		);
		expect(wrapper.findAll('.v3-select .v3-input.is-size--large').length).toBe(
			1
		);
		expect(
			wrapper
				.findAll('.v3-input')[0]
				.classes()
				.includes('is-size--small')
		).toBeTruthy();
		expect(
			wrapper
				.findAll('.v3-input')[1]
				.classes()
				.includes('is-size--medium')
		).toBeTruthy();
		expect(
			wrapper
				.findAll('.v3-input')[2]
				.classes()
				.includes('is-size--large')
		).toBeTruthy();
	});
});
