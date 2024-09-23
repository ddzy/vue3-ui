import { h, nextTick } from 'vue';

import {
	V3Button,
	V3Checkbox,
	V3Icon,
	V3LoadingDirective,
	V3Radio,
	V3Table,
	V3TableColumn,
	V3Tooltip,
} from '@components/main';
import { mount } from '@vue/test-utils';
import { cloneDeep } from 'lodash-es';

import { ITableColumn, ITableData } from '@/public/typings';

describe('Table组件测试', () => {
	let data: ITableData[] = [];
	let columns: ITableColumn[] = [];

	beforeEach(() => {
		vi.useFakeTimers();
		data = [
			{
				name: 'A',
				age: 20,
				address: '地址A',
			},
			{
				name: 'B',
				age: 30,
				address: '地址B',
			},
			{
				name: 'C',
				age: 10,
				address: '地址C',
			},
		];
		columns = [
			{
				prop: 'name',
				label: '姓名',
			},
			{
				prop: 'age',
				label: '年龄',
			},
			{
				prop: 'address',
				label: '地址',
			},
		];
	});

	afterEach(() => {
		// 恢复正常定时器
		vi.useRealTimers();
		// 自动清理 DOM
		document.getElementsByTagName('html')[0].innerHTML = '';
	});

	test('Table应该正常渲染', async () => {
		const wrapper = mount(V3Table, {
			global: {
				components: {
					V3Checkbox,
					V3Icon,
					V3Radio,
					V3Tooltip,
					V3TableColumn,
				},
				directives: {
					[V3LoadingDirective.name]: V3LoadingDirective.directive,
				},
			},
			props: {
				data,
				columns,
			},
		});

		await nextTick();
		// 表头
		const headerCells = wrapper
			.find('.v3-table__header')
			.findAll('.v3-table__cell');
		headerCells.forEach((v, i) => {
			expect(v.text()).toBe(columns[i].label);
		});
		// 表体
		const bodyCells = wrapper
			.find('.v3-table__body')
			.findAll('.v3-table__cell');
		expect(bodyCells[0].text()).toBe(data[0].name);
		expect(bodyCells[1].text()).toBe(`${data[0].age}`);
		expect(bodyCells[2].text()).toBe(data[0].address);
	});

	test('Table可以通过slot自定义单元格', async () => {
		const wrapper = mount(V3Table, {
			global: {
				components: {
					V3Checkbox,
					V3Icon,
					V3Radio,
					V3Tooltip,
					V3TableColumn,
				},
				directives: {
					[V3LoadingDirective.name]: V3LoadingDirective.directive,
				},
			},
			props: {
				data,
				columns: columns.concat([
					{
						slot: 'handle',
					},
				]),
			},
			slots: {
				default() {
					return h(
						V3TableColumn,
						{
							prop: 'handle',
							label: '操作',
						},
						{
							default(scope: { row: ITableData }) {
								return [
									h(
										V3Button,
										{
											type: 'text',
											class: 'btn btn-delete',
											onClick() {
												wrapper.setProps({
													data: data.filter((v) => v.name !== scope.row.name),
												});
											},
										},
										() => '删除',
									),
								];
							},
						},
					);
				},
			},
		});

		await nextTick();
		// 表头
		const headerCells = wrapper
			.find('.v3-table__header')
			.findAll('.v3-table__cell');
		expect(headerCells[headerCells.length - 1].text()).toBe('操作');

		// 删除第一行
		expect(
			wrapper.find('.v3-table__body').findAll('.v3-table__row').length,
		).toBe(3);
		expect(wrapper.findAll('.btn-delete').length).toBe(3);
		await wrapper.findAll('.btn-delete')[0].trigger('click');
		await nextTick();
		expect(
			wrapper.find('.v3-table__body').findAll('.v3-table__row').length,
		).toBe(2);
	});

	test('Table自定义边框和条纹', async () => {
		const wrapper = mount(V3Table, {
			global: {
				components: {
					V3Checkbox,
					V3Icon,
					V3Radio,
					V3Tooltip,
					V3TableColumn,
				},
			},
			props: {
				data,
				columns,
			},
		});

		// 表头
		expect(wrapper.find('.v3-table__header').exists()).toBeTruthy();
		await wrapper.setProps({
			showHeader: false,
		});
		await nextTick();
		expect(wrapper.find('.v3-table__header').exists()).toBeFalsy();

		// 边框
		expect(wrapper.classes().includes('has-border')).toBeFalsy();
		await wrapper.setProps({
			border: true,
		});
		await nextTick();
		expect(wrapper.classes().includes('has-border')).toBeTruthy();

		// 条纹
		expect(wrapper.classes().includes('has-stripe')).toBeFalsy();
		await wrapper.setProps({
			stripe: true,
		});
		await nextTick();
		expect(wrapper.classes().includes('has-stripe')).toBeTruthy();

		// hover时高亮行
		expect(wrapper.classes().includes('highlight-hover-row')).toBeTruthy();
		await wrapper.setProps({
			highlightHoverRow: false,
		});
		await nextTick();
		expect(wrapper.classes().includes('highlight-hover-row')).toBeFalsy();
	});

	test('Table自定义类名', async () => {
		const wrapper = mount(V3Table, {
			global: {
				components: {
					V3Checkbox,
					V3Icon,
					V3Radio,
					V3Tooltip,
					V3TableColumn,
				},
			},
			props: {
				data,
				columns,
				rowClassName({ row, rowIndex }) {
					return 'custom-row';
				},
				cellClassName: 'custom-cell',
				headerRowClassName: 'custom-header-row',
				headerCellClassName: 'custom-header-cell',
			},
		});

		expect(wrapper.findAll('.custom-row').length).toBe(data.length);
		expect(wrapper.findAll('.custom-cell').length).toBe(
			data.length * columns.length,
		);
		expect(wrapper.findAll('.custom-header-row').length).toBe(1);
		expect(wrapper.findAll('.custom-header-cell').length).toBe(columns.length);
	});

	test('Table加载中', async () => {
		const wrapper = mount(V3Table, {
			global: {
				components: {
					V3Checkbox,
					V3Icon,
					V3Radio,
					V3Tooltip,
					V3TableColumn,
				},
			},
			props: {
				data,
				columns,
				loading: false,
			},
		});

		expect(wrapper.find('.v3-loading').exists()).toBeFalsy();
		await wrapper.setProps({
			loading: true,
		});
		await nextTick();
		expect(wrapper.find('.v3-loading').exists()).toBeTruthy();
	});

	test('Table空状态', async () => {
		const wrapper = mount(V3Table, {
			global: {
				components: {
					V3Checkbox,
					V3Icon,
					V3Radio,
					V3Tooltip,
					V3TableColumn,
				},
			},
			props: {
				data: [],
				columns: [],
			},
		});

		expect(wrapper.find('.v3-table__empty').text()).toBe('暂无数据');

		await wrapper.setProps({
			emptyText: '自定义空状态文本',
		});
		await nextTick();
		expect(wrapper.find('.v3-table__empty').text()).toBe('自定义空状态文本');
	});

	test('Table值预处理', async () => {
		let time = Date.now();
		const wrapper = mount(V3Table, {
			global: {
				components: {
					V3Checkbox,
					V3Icon,
					V3Radio,
					V3Tooltip,
					V3TableColumn,
				},
			},
			props: {
				data: [
					{
						create_time: time,
					},
				],
				columns: [
					{
						prop: 'create_time',
						label: '创建时间',
						className: 'custom-cell',
						formatter: (row) => {
							return row.create_time.toLocaleString();
						},
					},
				],
			},
		});

		expect(wrapper.find('.custom-cell').text()).toBe(time.toLocaleString());
	});

	test('Table排序', async () => {
		const wrapper = mount(V3Table, {
			global: {
				components: {
					V3Checkbox,
					V3Icon,
					V3Radio,
					V3Tooltip,
					V3TableColumn,
				},
			},
			props: {
				data,
				columns: [
					{
						prop: 'age',
						label: '年龄',
						sortable: true,
						className: 'custom-cell',
					},
				],
			},
		});

		// 默认顺序
		expect(
			wrapper
				.findAll('.custom-cell')
				.map((v) => v.text())
				.join(),
		).toBe(data.map((v) => v.age).join());

		// 升序
		await wrapper.find('.v3-table__cell-sorter').trigger('click');
		await nextTick();
		expect(
			wrapper
				.findAll('.custom-cell')
				.map((v) => v.text())
				.join(),
		).toBe('10,20,30');

		// 降序
		await wrapper.find('.v3-table__cell-sorter').trigger('click');
		await nextTick();
		expect(
			wrapper
				.findAll('.custom-cell')
				.map((v) => v.text())
				.join(),
		).toBe('30,20,10');

		// 恢复默认顺序
		await wrapper.find('.v3-table__cell-sorter').trigger('click');
		await nextTick();
		expect(
			wrapper
				.findAll('.custom-cell')
				.map((v) => v.text())
				.join(),
		).toBe(data.map((v) => v.age).join());
	});

	test('Table手动排序', async () => {
		const wrapper = mount(V3Table, {
			global: {
				components: {
					V3Checkbox,
					V3Icon,
					V3Radio,
					V3Tooltip,
					V3TableColumn,
				},
			},
			props: {
				data,
				columns: [
					{
						prop: 'age',
						label: '年龄',
						sortable: 'custom',
						className: 'custom-cell',
					},
				],
				defaultSort: {
					prop: 'age',
					order: 'descending',
				},
			},
		});

		async function handleSortChange(prop: string, order: string) {
			switch (order) {
				case 'none': {
					const newData = cloneDeep(data);
					await wrapper.setProps({
						data: newData,
					});
					break;
				}
				case 'ascending': {
					const newData = cloneDeep(data);
					newData.sort((a, b) => {
						return a[prop] - b[prop];
					});
					await wrapper.setProps({
						data: newData,
					});
					break;
				}
				case 'descending': {
					const newData = cloneDeep(data);
					newData.sort((a, b) => {
						return b[prop] - a[prop];
					});
					await wrapper.setProps({
						data: newData,
					});
					break;
				}
				default: {
					break;
				}
			}
		}

		// 降序
		expect(
			wrapper
				.findAll('.custom-cell')
				.map((v) => v.text())
				.join(),
		).toBe('30,20,10');

		// 默认顺序
		await wrapper.find('.v3-table__cell-sorter').trigger('click');
		handleSortChange(
			// @ts-ignore
			wrapper.emitted()['sortChange'][0][0],
			// @ts-ignore
			wrapper.emitted()['sortChange'][0][1],
		);
		await nextTick();
		expect(
			wrapper
				.findAll('.custom-cell')
				.map((v) => v.text())
				.join(),
		).toBe(data.map((v) => v.age).join());

		// 升序
		await wrapper.find('.v3-table__cell-sorter').trigger('click');
		handleSortChange(
			// @ts-ignore
			wrapper.emitted()['sortChange'][0][0],
			// @ts-ignore
			wrapper.emitted()['sortChange'][0][1],
		);
		await nextTick();
		expect(
			wrapper
				.findAll('.custom-cell')
				.map((v) => v.text())
				.join(),
		).toBe('10,20,30');
	});

	test('Table序号列', async () => {
		const wrapper = mount(V3Table, {
			global: {
				components: {
					V3Checkbox,
					V3Icon,
					V3Radio,
					V3Tooltip,
					V3TableColumn,
				},
			},
			props: {
				data,
				columns: [
					{
						type: 'index',
						label: '序号',
						className: 'custom-cell',
					},
				],
			},
		});

		expect(wrapper.findAll('.custom-cell').length).toBe(data.length);
		expect(
			wrapper
				.findAll('.custom-cell')
				.map((v) => v.text())
				.join(),
		).toBe(data.map((v, i) => i + 1).join());
	});

	test('Table单选列', async () => {
		const wrapper = mount(V3Table, {
			global: {
				components: {
					V3Checkbox,
					V3Icon,
					V3Radio,
					V3Tooltip,
					V3TableColumn,
				},
			},
			props: {
				data,
				columns: [
					{
						type: 'radio',
						label: '单选',
						className: 'custom-cell',
					},
				],
				rowKey: 'name',
			},
		});

		expect(wrapper.findAll('.custom-cell').length).toBe(data.length);

		// 选中第一行
		wrapper.findComponent(V3Table).vm.setCurrentRow('A');
		await nextTick();
		expect(wrapper.emitted()).toHaveProperty('selectionChange');
		// @ts-ignore
		expect(wrapper.emitted().selectionChange[0][0].join()).toBe('A');

		// 获取已选中的行
		expect(wrapper.vm.getSelectionRows().join()).toBe('A');

		// 清空已选中的行
		await wrapper.vm.clearSelection();
		await nextTick();
		expect(wrapper.vm.getSelectionRows().join()).toBe('');
	});

	test('Table多选列', async () => {
		const wrapper = mount(V3Table, {
			global: {
				components: {
					V3Checkbox,
					V3Icon,
					V3Radio,
					V3Tooltip,
					V3TableColumn,
				},
			},
			props: {
				data,
				columns: [
					{
						type: 'checkbox',
						className: 'custom-cell',
					},
				],
				rowKey: 'name',
			},
		});

		expect(wrapper.findAll('.custom-cell').length).toBe(data.length);

		// 选中第一行
		await wrapper.vm.toggleRowSelection('A');
		await nextTick();
		expect(wrapper.vm.getSelectionRows().join()).toBe('A');

		// 全选
		await wrapper.vm.toggleAllSelection();
		await nextTick();
		expect(wrapper.vm.getSelectionRows().join()).toBe('A,B,C');

		// 取消全选
		await wrapper.vm.toggleAllSelection(false);
		await nextTick();
		expect(wrapper.vm.getSelectionRows().join()).toBe('');

		// 清除选择
		await wrapper.vm.toggleAllSelection(true);
		await wrapper.vm.clearSelection();
		await nextTick();
		expect(wrapper.vm.getSelectionRows().join()).toBe('');
	});

	test('Table展开行', async () => {
		const wrapper = mount(V3Table, {
			global: {
				components: {
					V3Checkbox,
					V3Icon,
					V3Radio,
					V3Tooltip,
					V3TableColumn,
				},
			},
			props: {
				data,
				columns: [
					{
						type: 'expand',
						className: 'custom-cell',
					},
				],
				rowKey: 'name',
			},
		});

		expect(wrapper.findAll('.custom-cell').length).toBe(data.length);

		// 展开第一行
		await wrapper.vm.toggleRowExpansion('A');
		await nextTick();
		expect(
			wrapper.findAll('.v3-table__row--expansion')[0].isVisible(),
		).toBeTruthy();

		// 折叠第一行
		await wrapper.vm.toggleRowExpansion('A');
		await nextTick();
		expect(
			wrapper.findAll('.v3-table__row--expansion')[0].isVisible(),
		).toBeFalsy();
	});
});
