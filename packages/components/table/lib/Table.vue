<template>
	<div
		v-loading="props.loading"
		:class="{
			'v3-table': true,
			'has-header': props.showHeader,
			'has-border': props.border,
			'has-vertical-scrollbar': hasVerticalScrollbar,
			'has-horizontal-scrollbar': hasHorizontalScrollbar,
			'is-stripe': props.stripe,
			'is-resizing': isResizerMouseDown,
			'highlight-hover-row': props.highlightHoverRow,
			'highlight-selected-row': props.highlightSelectionRow,
		}"
		:style="{
			maxHeight: computedMaxHeight,
		}"
		ref="tableRef"
	>
		<div v-if="props.showHeader" class="v3-table__header-wrapper">
			<div class="v3-table__header-inner" ref="tableHeaderRef">
				<table
					:class="{
						'v3-table__header': true,
						'has-bottom-shadow': !tableBodyScroller.arrivedState.top,
					}"
				>
					<colgroup>
						<col
							v-for="(v, i) in headerColumnWidths"
							:key="i"
							:style="{
								width: `${v.width ? `${v.width}px` : 'auto'}`,
							}"
							class="v3-table__col v3-table__header-col"
						/>
					</colgroup>
					<thead>
						<tr
							:class="[
								'v3-table__row',
								typeof props.headerRowClassName === 'function'
									? props.headerRowClassName({ row: null, rowIndex: 0 })
									: props.headerRowClassName,
							]"
						>
							<template v-for="(v, i) in computedColumns" :key="i">
								<component :is="v">
									<template #default="scope">
										<th
											:class="[
												'v3-table__cell',
												normalizeFixed(scope.props.fixed) ? 'is-fixed' : '',
												normalizeFixed(scope.props.fixed)
													? `is-fixed-${normalizeFixed(scope.props.fixed)}`
													: '',
												scope.props.resizable ? 'is-resizable' : '',
												scope.props.sortable ? 'is-sortable' : '',
												`is-align-${scope.props.headerAlign}`,
												typeof props.headerCellClassName === 'function'
													? props.headerCellClassName({
															row: null,
															rowIndex: 0,
															column: scope.props,
															columnIndex: i,
														})
													: props.headerCellClassName,
												scope.props.labelClassName,
											]"
											:style="{
												left:
													normalizeFixed(scope.props.fixed) === 'left'
														? computedHeaderFixedLeftColumnOffset.find(
																(vv) => vv.index === i,
															)
															? `${computedHeaderFixedLeftColumnOffset.find((vv) => vv.index === i)?.left}px`
															: 'auto'
														: 'auto',
												right:
													normalizeFixed(scope.props.fixed) === 'right'
														? computedHeaderFixedRightColumnOffset.find(
																(vv) => vv.index === i,
															)
															? `${computedHeaderFixedRightColumnOffset.find((vv) => vv.index === i)?.right}px`
															: 'auto'
														: 'auto',
											}"
											:ref="(el) => ((tableHeaderCellRefs.push(el as HTMLElement)), (
												  normalizeFixed(scope.props.fixed) === 'left'
														? updateFixedLeftCells(el as HTMLElement, i)
														: normalizeFixed(scope.props.fixed) === 'right'
															? updateFixedRightCells(el as HTMLElement, i)
															: void 0
											))"
										>
											<div class="v3-table__cell-inner">
												<template
													v-if="
														['default', 'index', 'radio'].includes(
															scope.props.type,
														)
													"
												>
													<component
														v-if="(v?.children as any)?.label"
														:is="(v?.children as any)?.label"
													></component>
													<span v-else>{{ scope.props.label }}</span>
												</template>
												<template v-else-if="scope.props.type === 'checkbox'">
													<v3-checkbox
														v-model="selectAllValue"
														:indeterminate="selectAllIndeterminate"
														style="display: block"
														@change="handleSelectAllChange($event, scope.props)"
													></v3-checkbox>
												</template>
											</div>
											<div
												v-if="scope.props.sortable !== false"
												class="v3-table__cell-sorter"
												@click="toggleSort(scope.props)"
											>
												<V3Icon
													:theme="
														sortValue.prop === scope.props.prop &&
														sortValue.order === 'ascending'
															? 'filled'
															: 'outline'
													"
													:strokeWidth="1"
													type="UpOne"
												/>
												<V3Icon
													:theme="
														sortValue.prop === scope.props.prop &&
														sortValue.order === 'descending'
															? 'filled'
															: 'outline'
													"
													:strokeWidth="1"
													type="DownOne"
												/>
											</div>
											<a
												v-if="scope.props.resizable"
												class="v3-table__cell-resizer"
												@mousedown="handleResizerMouseDown($event, i)"
											></a>
										</th>
									</template>
								</component>
							</template>
						</tr>
					</thead>
				</table>
			</div>
		</div>
		<div
			v-if="data.length"
			:class="{
				'v3-table__body-wrapper': true,
			}"
		>
			<div class="v3-table__body-inner" ref="tableBodyRef">
				<table class="v3-table__body">
					<colgroup>
						<col
							v-for="(v, i) in bodyColumnWidths"
							:key="i"
							:style="{
								width: `${v.width ? `${v.width}px` : 'auto'}`,
							}"
							class="v3-table__col v3-table__body-col"
						/>
					</colgroup>
					<tbody>
						<RecursiveRow :data="data" :isRoot="true" :parentLevel="0" />
					</tbody>
				</table>
			</div>
		</div>
		<slot v-else-if="slots?.empty" name="empty"></slot>
		<div v-else class="v3-table__empty">
			<span>{{ props.emptyText }}</span>
		</div>
	</div>
</template>
<script lang="tsx" setup>
import {
	Fragment,
	VNode,
	computed,
	h,
	reactive,
	ref,
	useSlots,
	watch,
} from 'vue';

import { divide, subtract } from '@common/utils';
import {
	V3Checkbox,
	V3Icon,
	V3LoadingDirective,
	V3Radio,
	V3TableColumn,
	V3Tooltip,
} from '@components/main';
import useEventListener from '@hooks/useEventListener';
import useResizeObserver from '@hooks/useResizeObserver';
import { useScroll } from '@vueuse/core';
import {
	cloneDeep,
	has,
	isEqual,
	isFunction,
	isNil,
	isNumber,
	isPlainObject,
	isString,
	isUndefined,
	omit,
} from 'lodash-es';

import {
	ITableBaseRowKey,
	ITableColumnFixed,
	ITableColumnProps,
	ITableColumnSortBy,
	ITableData,
	ITableDefaultSort,
	ITableProps,
	ITableTreeProps,
} from '@/public/typings';

defineOptions({
	name: 'V3Table',
	directives: {
		[V3LoadingDirective.name]: V3LoadingDirective.directive,
	},
});

const props = withDefaults(defineProps<ITableProps>(), {
	/** 表格数据 */
	data: () => [],
	/** 是否显示边框 */
	border: false,
	/** 是否显示条纹 */
	stripe: false,
	/** 表格高度 */
	height: 'auto',
	/** 表格最大高度 */
	maxHeight: 'none',
	/** 表格尺寸 */
	size: 'medium',
	/** 是否显示表头 */
	showHeader: true,
	/** 是否高亮当前hover的行 */
	highlightHoverRow: true,
	/** 是否高亮已选中的行 */
	highlightSelectionRow: false,
	rowClassName: '',
	cellClassName: '',
	headerRowClassName: '',
	headerCellClassName: '',
	rowKey: '',
	/** 表格为空时展示的文本，也可通过 slot=empty 自定义 */
	emptyText: '暂无数据',
	/** 表格是否加载中 */
	loading: false,
	/** 默认排序的列的顺序 */
	defaultSort: () => ({
		prop: '',
		order: 'none',
	}),
	/**
	 * 表格列
	 * 如果在`columns`中声明了slot属性，可以自定义列
	 */
	columns: () => [],
	/**
	 * 树形数据是否懒加载
	 */
	treeLazyload: false,
	/**
	 * 可以自行指定树形数据使用的key
	 */
	treeProps: () => ({
		// 子数据列表
		children: 'children',
		// 该行是否有子数据
		hasChildren: 'hasChildren',
	}),
});
const slots = useSlots();
const emits = defineEmits<{
	(event: 'sortChange', prop: string, order: ITableColumnSortBy): void;
	(event: 'selectionChange', rowKeys: ITableBaseRowKey[]): void;
	(
		event: 'selectAll',
		data: {
			rowKeys: ITableBaseRowKey[];
			column: ITableColumnProps;
			selected: boolean;
		},
	): void;
	(
		event: 'select',
		data: {
			rowKey: ITableBaseRowKey;
			rowKeys: ITableBaseRowKey[];
			row: any;
			column: ITableColumnProps;
			selected: boolean;
		},
	): void;
}>();

function normalizeFixed(fixed: ITableColumnFixed): string {
	if (fixed !== false) {
		if ([true, 'left'].includes(fixed)) {
			return 'left';
		} else if (isString(fixed)) {
			return 'right';
		}
	}
	return '';
}

/**
 * 表格数据本地备份（深拷贝）
 */
const data = ref<any[]>([]);
watch(
	() => props.data,
	(newValue) => {
		data.value = cloneDeep(newValue);
	},
	{ immediate: true },
);

/**
 * 标准化传入的TableColumn
 */
const computedColumns = computed(() => {
	// v3-table-column 有可能是通过 v-for 遍历出来的，也可能是独立组件
	let slotColumns: VNode[] = [];
	let children = slots?.default?.();
	if (Array.isArray(children)) {
		children.forEach((v) => {
			if (isPlainObject(v) && (v?.type as any)?.name === V3TableColumn.name) {
				slotColumns.push(v);
			} else if (Array.isArray(v?.children)) {
				let _children: any[] = v?.children.filter(
					// @ts-ignore
					(vv) => isPlainObject(vv) && vv?.type?.name === V3TableColumn.name,
				);
				slotColumns.push(..._children);
			}
		});
	}

	// 解析props中的columns
	let propColumns: VNode[] = [];
	if (Array.isArray(props.columns) && props.columns.length) {
		props.columns.forEach((v) => {
			// 如果声明了 slot，表明该列是自定义列
			if (v.slot) {
				const slotColumn = slotColumns.find((vv) => vv?.props?.prop === v.slot);
				if (slotColumn) {
					propColumns.push(slotColumn);
				}
			} else {
				// 反之，创建V3TableColumn实例
				const propColumn = h(V3TableColumn, omit(v, 'slot', 'children'));
				propColumns.push(propColumn);
			}
		});
		return propColumns;
	}

	return slotColumns;
});
/**
 * 展开的列
 */
const computedExpandColumn = computed(() => {
	const columnIndex = computedColumns.value.findIndex(
		(v) => v?.props?.type === 'expand',
	);
	const column = computedColumns.value[columnIndex];

	return {
		column,
		columnIndex,
	};
});
const computedMaxHeight = computed(() => {
	return isNumber(props.maxHeight) ? `${props.maxHeight}px` : props.maxHeight;
});

const tableRef = ref<HTMLElement>();
const tableHeaderRef = ref<HTMLElement>();
const tableBodyRef = ref<HTMLElement>();
const tableHeaderCellRefs = ref<HTMLElement[]>([]);
const tableBodyCellRefs = ref<HTMLElement[]>([]);

/**
 * 表格是否出现了纵向滚动条
 */
const hasVerticalScrollbar = ref(false);
function updateHasVerticalScrollbar() {
	if (tableBodyRef.value) {
		const { offsetWidth, clientWidth } = tableBodyRef.value;
		hasVerticalScrollbar.value = offsetWidth !== clientWidth;
	}
}
useResizeObserver(tableBodyRef, () => {
	updateHasVerticalScrollbar();
});

/**
 * 表格是否出现了横向滚动条
 */
const hasHorizontalScrollbar = ref(false);
function updateHasHorizontalScrollbar() {
	if (tableBodyRef.value) {
		const { offsetHeight, clientHeight } = tableBodyRef.value;
		hasHorizontalScrollbar.value = offsetHeight !== clientHeight;
	}
}
useResizeObserver(tableBodyRef, () => {
	updateHasVerticalScrollbar();
	updateHasHorizontalScrollbar();
});

let prevTableBodyScrollX = ref(0);
const tableBodyScroller = useScroll(tableBodyRef, {
	throttle: 0,
	onScroll() {
		// 表体滚动的时候，实时更新表头的位置
		if (tableHeaderRef.value) {
			let diff = tableBodyScroller.x.value - prevTableBodyScrollX.value;
			tableHeaderRef.value.scrollLeft += diff;
			prevTableBodyScrollX.value = tableBodyScroller.x.value;
		}
		// 判断固定列是否处于可视区域（只在横向滚动时进行判断）
		if (
			tableBodyScroller.directions.left ||
			tableBodyScroller.directions.right
		) {
			updateFixedColumnShadow();
		}
	},
});

/**
 * 固定的单元格出现阴影
 */
type IFixedCell = Map<number, Set<HTMLElement>>;
const fixedLeftCells = ref<IFixedCell>(new Map());
const fixedRightCells = ref<IFixedCell>(new Map());
function updateFixedLeftCells(el: HTMLElement, index: number) {
	if (!fixedLeftCells.value.has(index)) {
		fixedLeftCells.value.set(index, new Set([el]));
	} else {
		fixedLeftCells.value.get(index)!.add(el);
	}
}
function updateFixedRightCells(el: HTMLElement, index: number) {
	if (!fixedRightCells.value.has(index)) {
		fixedRightCells.value.set(index, new Set([el]));
	} else {
		fixedRightCells.value.get(index)!.add(el);
	}
}
// 固定在左侧的最后一列的下标
const lastFixedLeftColumnIndex = computed(() => {
	const keys = [...fixedLeftCells.value.keys()];
	const last = keys.pop();
	return isUndefined(last) ? -1 : last;
});
// 固定在右侧的第一列的下标
const firstFixedRightColumnIndex = computed(() => {
	const keys = [...fixedRightCells.value.keys()];
	const first = keys.shift();
	return isUndefined(first) ? -1 : first;
});
function updateFixedColumnShadow() {
	const lastFixedLeftCells = fixedLeftCells.value.get(
		lastFixedLeftColumnIndex.value,
	);
	const firstFixedRightCells = fixedRightCells.value.get(
		firstFixedRightColumnIndex.value,
	);
	// 对于左侧固定的单元格，最后一列的所有单元格出现阴影
	lastFixedLeftCells?.forEach((cell) => {
		const boundary = !tableBodyScroller.arrivedState.left;
		cell.classList.toggle('has-fixed-shadow', boundary);
	});
	// 对于右侧固定的单元格，第一列的所有单元格出现阴影
	firstFixedRightCells?.forEach((cell) => {
		const boundary = !tableBodyScroller.arrivedState.right;
		cell.classList.toggle('has-fixed-shadow', boundary);
	});
}
watch(hasHorizontalScrollbar, async () => {
	setTimeout(() => {
		updateFixedColumnShadow();
	}, 0);
});

// 纵向滚动条宽度
const verticalScrollbarWidth = ref(0);
// 横向滚动条宽度
const horizontalScrollbarWidth = ref(0);
function updateScrollbarWidth() {
	const div = document.createElement('div');
	div.style.cssText += `position: fixed; left: -99999px; top: -99999px; z-index: -1; overflow: scroll; width: 100px; height: 100px;`;
	document.body.appendChild(div);
	verticalScrollbarWidth.value = div.offsetWidth - div.clientWidth;
	horizontalScrollbarWidth.value = div.offsetHeight - div.clientHeight;
	document.body.removeChild(div);
}
updateScrollbarWidth();

/**
 * 列宽相关
 */
interface IColumnWidth {
	/** 列宽 */
	width: number;
	/** 拖拽表头时的最小宽度 */
	resizeMinWidth: number;
	/** 当前列的宽度是否设置了宽度 */
	isCustom: boolean;
}
const COLUMN_DEFAULT_WIDTH = 120;
// 表体列宽
const bodyColumnWidths = ref<IColumnWidth[]>([]);
// 表头列宽（由于表体可能会出现滚动条，挤压位置，所以分开计算）
const headerColumnWidths = ref<IColumnWidth[]>([]);
watch(tableBodyRef, (newValue) => {
	if (!newValue) {
		return;
	}
	// 根据每列设置的props宽度，计算初始列宽
	let remainingTableWidth = newValue.clientWidth;
	// 对于没有设置宽度的列，会根据(表格剩余的可用宽度 / 未指定宽度的列)计算平均值
	let averageCount = 0;
	let averageWidth = 0;
	let newColumnWidths = computedColumns.value.map((v) => {
		let propsWidth = Number.parseFloat(v?.props?.width);
		let propsMinWidth = Number.parseFloat(
			// @ts-ignore
			v?.props?.minWidth || v?.type?.props?.minWidth?.default,
		);
		let isCustom = !Number.isNaN(propsWidth);
		averageCount += !isCustom ? 1 : 0;
		remainingTableWidth -= isCustom ? propsWidth : 0;
		return {
			width: propsWidth,
			resizeMinWidth: propsMinWidth,
			isCustom,
		};
	});
	if (remainingTableWidth <= 0) {
		averageWidth = COLUMN_DEFAULT_WIDTH;
	} else {
		averageWidth = Math.max(
			divide(remainingTableWidth, averageCount),
			COLUMN_DEFAULT_WIDTH,
		);
	}
	newColumnWidths = newColumnWidths.map((v) => {
		return {
			...v,
			width: v.isCustom ? v.width : averageWidth,
		};
	});

	bodyColumnWidths.value = cloneDeep(newColumnWidths);
	headerColumnWidths.value = cloneDeep(newColumnWidths);
});
watch(hasVerticalScrollbar, () => {
	if (tableBodyRef.value) {
		// 当滚动条显示/隐藏的时候，更新表头最后一列的宽度，避免由于滚动条占位导致表头和表体无法对齐
		headerColumnWidths.value = headerColumnWidths.value.map((v, i) => {
			let newWidth = v.width;
			if (i === headerColumnWidths.value.length - 1) {
				newWidth += verticalScrollbarWidth.value;
			}
			return {
				...v,
				width: newWidth,
			};
		});
	}
});

/**
 * 固定列
 */
interface IFixedColumn {
	index: number;
	left: number;
	right: number;
	width: number;
}
// 固定在左侧的列
const fixedLeftColumns = ref<IFixedColumn[]>([]);
// 固定在右侧的列
const fixedRightColumns = ref<IFixedColumn[]>([]);
watch(
	computedColumns,
	(newValue) => {
		newValue.forEach((v, i) => {
			let fixed = normalizeFixed(v?.props?.fixed);
			if (fixed === 'left') {
				fixedLeftColumns.value.push({
					index: i,
					left: 0,
					right: 0,
					width: 0,
				});
			} else if (fixed === 'right') {
				fixedRightColumns.value.push({
					index: i,
					left: 0,
					right: 0,
					width: 0,
				});
			}
		});
	},
	{ immediate: true },
);
const computedHeaderFixedLeftColumnOffset = computed<IFixedColumn[]>(() => {
	let result = fixedLeftColumns.value.map((v) => {
		let width = headerColumnWidths.value[v.index]?.width || v.width;
		return {
			...v,
			width,
		};
	});
	result = result.map((v, i, o) => {
		let left = i === 0 ? 0 : o[i - 1].left + o[i - 1].width;
		return {
			...v,
			left,
		};
	});
	return result;
});
const computedHeaderFixedRightColumnOffset = computed<IFixedColumn[]>(() => {
	let result = fixedRightColumns.value
		.slice()
		.reverse()
		.map((v) => {
			let width = headerColumnWidths.value[v.index]?.width || v.width;
			return {
				...v,
				width,
			};
		});
	result = result.map((v, i, o) => {
		let right = i === 0 ? 0 : o[i - 1].right + o[i - 1].width;
		return {
			...v,
			right,
		};
	});
	return result;
});

const computedBodyFixedLeftColumnOffset = computed<IFixedColumn[]>(() => {
	let result = fixedLeftColumns.value.map((v) => {
		let width = bodyColumnWidths.value[v.index]?.width || v.width;
		return {
			...v,
			width,
		};
	});
	result = result.map((v, i, o) => {
		let left = i === 0 ? 0 : o[i - 1].left + o[i - 1].width;
		return {
			...v,
			left,
		};
	});
	return result;
});
const computedBodyFixedRightColumnOffset = computed<IFixedColumn[]>(() => {
	let result = fixedRightColumns.value
		.slice()
		.reverse()
		.map((v) => {
			let width = bodyColumnWidths.value[v.index]?.width || v.width;
			return {
				...v,
				width,
			};
		});
	result = result.map((v, i, o) => {
		let right = i === 0 ? 0 : o[i - 1].right + o[i - 1].width;
		return {
			...v,
			right,
		};
	});
	return result;
});

/**
 * 表头拖拽
 */
const isResizerMouseDown = ref(false);
const resizerStartPosition = ref(0);
const resizerIndex = ref(-1);
function handleResizerMouseDown(e: MouseEvent, i: number) {
	isResizerMouseDown.value = true;
	resizerIndex.value = i;
	resizerStartPosition.value = e.pageX;
}
useEventListener(document, 'mouseup', () => {
	isResizerMouseDown.value = false;
});
useEventListener(document, 'mousemove', (e) => {
	if (isResizerMouseDown.value) {
		const resizerEndPosition = e.pageX;
		const diff = subtract(resizerEndPosition, resizerStartPosition.value);
		// 表体所有列的列宽不能小于最小值
		bodyColumnWidths.value = bodyColumnWidths.value.map((v, i) => {
			let width = tableHeaderCellRefs.value[i].offsetWidth;
			if (i === resizerIndex.value) {
				width += diff;
			} else if (i === resizerIndex.value + 1) {
				width -= diff;
			}
			width = Math.max(
				width,
				bodyColumnWidths.value[resizerIndex.value].resizeMinWidth,
			);
			return {
				...v,
				width,
			};
		});
		// 表头所有列的列宽不能小于最小值
		headerColumnWidths.value = headerColumnWidths.value.map((v, i) => {
			let width = tableHeaderCellRefs.value[i].offsetWidth;
			if (i === resizerIndex.value) {
				width += diff;
			} else if (i === resizerIndex.value + 1) {
				width -= diff;
			}
			// 表头的最后一列需要加上滚动条宽度，避免表头和表体无法对齐
			if (i === headerColumnWidths.value.length - 1) {
				width += verticalScrollbarWidth.value;
			}
			width = Math.max(
				width,
				headerColumnWidths.value[resizerIndex.value].resizeMinWidth,
			);
			return {
				...v,
				width,
			};
		});
		resizerStartPosition.value = e.pageX;
	}
});

/**
 * 排序相关
 */
const sortValue = reactive<ITableDefaultSort>({
	...props.defaultSort,
});
watch(
	() => props.data,
	() => {
		sort(sortValue.prop, sortValue.order);
	},
	{ immediate: true, deep: true },
);
function toggleSort(row: ITableColumnProps) {
	const sortBy = row.sortBy;
	const prop = row.prop;
	const sortable = row.sortable;

	if (sortable !== false && prop && sortBy) {
		let currentIndex = sortBy.findIndex((v) => v === sortValue.order);
		if (!currentIndex || currentIndex === -1) {
			currentIndex = 0;
		}
		let nextIndex = currentIndex + 1;
		if (nextIndex > sortBy.length - 1) {
			nextIndex = 0;
		} else if (nextIndex < 0) {
			nextIndex = sortBy.length - 1;
		}

		let nextSort = sortBy[nextIndex];
		sortValue.prop = prop;
		sortValue.order = nextSort;
		// 数据排序
		if (sortable === 'custom') {
			emits('sortChange', row.prop!, nextSort);
		} else {
			sort(sortValue.prop, sortValue.order);
		}
	}
}
/**
 * 【可外部调用】手动排序
 * @param prop 同`defaultSort.prop`
 * @param order 同`defaultSort.order`
 */
function sort(
	prop: ITableDefaultSort['prop'],
	order: ITableDefaultSort['order'],
) {
	sortValue.prop = prop;
	sortValue.order = order;

	if (prop) {
		if (order === 'ascending') {
			data.value.sort((a, b) => (a[prop!] < b[prop!] ? -1 : 1));
		} else if (order === 'descending') {
			data.value.sort((a, b) => (b[prop!] > a[prop!] ? 1 : -1));
		} else if (order === 'none') {
			data.value = cloneDeep(props.data);
		}
	} else {
		data.value = cloneDeep(props.data);
	}
}
/**
 * 【可外部调用】清除排序状态
 */
function clearSort() {
	sort('', 'none');
}

/**
 * 表格单选
 */
const radioValue = ref<ITableBaseRowKey>();
function handleRadioChange(rowKey: ITableBaseRowKey) {}

/**
 * 表格多选
 */
const checkboxValue = reactive<Record<ITableBaseRowKey, boolean>>({});
function handleCheckboxChange(
	rowKey: ITableBaseRowKey,
	row: any,
	column: ITableColumnProps,
	selected: boolean,
) {
	emits('select', {
		rowKey,
		rowKeys: getSelectionRows(),
		row,
		column,
		selected,
	});
}

/**
 * 计算选中的行（单选+多选合并到一个数组里面并去重）
 */
const computedSelectionRows = computed(() => {
	// 选中的单选框
	const selectedRadioKeys = [];
	if (!isUndefined(radioValue.value)) {
		selectedRadioKeys.push(radioValue.value);
	}
	// 选中的复选框
	const selectedCheckboxKeys = Object.keys(checkboxValue).filter(
		(v) => checkboxValue[v],
	);
	// 去重
	const result = [...new Set([...selectedRadioKeys, ...selectedCheckboxKeys])];

	return result;
});
watch(computedSelectionRows, (newValue, oldValue) => {
	if (!isEqual(newValue, oldValue)) {
		emits('selectionChange', newValue);
	}
});

/**
 * 表格全选
 */
const selectAllValue = ref(false);
const selectAllIndeterminate = ref(false);
function handleSelectAllChange(selected: boolean, column: ITableColumnProps) {
	Object.keys(checkboxValue).forEach((v) => {
		checkboxValue[v] = selected;
	});
	emits('selectAll', {
		rowKeys: getSelectionRows(),
		column,
		selected,
	});
}
watch(checkboxValue, (newValue) => {
	let isSelectAll = Object.values(newValue).every(Boolean);
	let isIndeterminate = Object.values(newValue).some(Boolean);
	if (isSelectAll) {
		selectAllValue.value = true;
		selectAllIndeterminate.value = false;
	} else if (isIndeterminate) {
		selectAllIndeterminate.value = true;
		selectAllValue.value = false;
	} else {
		selectAllValue.value = false;
		selectAllIndeterminate.value = false;
	}
});

function normalizeRowKey(row: any, rowIndex: number) {
	const rowKey = isFunction(props.rowKey)
		? props.rowKey({ row, rowIndex })
		: row[props.rowKey];

	if (isNil(rowKey)) {
		return;
	}
	// 初始化复选框map
	if (!has(checkboxValue, rowKey)) {
		checkboxValue[rowKey] = false;
	}

	return rowKey;
}

/**
 * 【单选表格】设置当前选中的行
 * @param rowKey
 */
function setCurrentRow(rowKey: ITableBaseRowKey) {
	radioValue.value = rowKey;
}

/**
 * 【单选+多选表格】清空当前选中的所有行
 * @param rowKey
 */
function clearSelection() {
	radioValue.value = undefined;
	Object.keys(checkboxValue).forEach((v) => {
		checkboxValue[v] = false;
	});
}
/**
 * 【单选+多选表格】获取当前选中的所有行
 */
function getSelectionRows() {
	return computedSelectionRows.value;
}

/**
 * 【多选表格】切换单行的选择状态
 * @description 如果指定了第二个参数，那么会直接设置该行是否选中
 */
function toggleRowSelection(rowKey: ITableBaseRowKey, selected?: boolean) {
	if (has(checkboxValue, rowKey)) {
		let newSelected = isUndefined(selected) ? !checkboxValue[rowKey] : selected;
		checkboxValue[rowKey] = newSelected;
	}
}

/**
 * 【多选表格】切换表头的全选状态
 * @description 如果指定了第一个参数，那么会直接设置是否选中
 */
function toggleAllSelection(selected?: boolean) {
	let newSelected = isUndefined(selected) ? !selectAllValue.value : selected;
	Object.keys(checkboxValue).forEach((v) => {
		checkboxValue[v] = newSelected;
	});
}

/**
 * 展开的行
 */
const expandValue = reactive(new Map());
function toggleRowExpansion(rowKey: ITableBaseRowKey, expanded?: boolean) {
	expandValue.set(
		rowKey,
		isUndefined(expanded) ? !expandValue.get(rowKey) : expanded,
	);
}

/**
 * 树形数据
 */
const treeProps = reactive<Required<ITableTreeProps>>({
	children: 'children',
	hasChildren: 'hasChildren',
	...props.treeProps,
});
const treeValue = reactive<
	Map<
		ITableBaseRowKey,
		{
			visible: boolean;
		}
	>
>(new Map());
/**
 * 异步获取树数据
 * @param rowKey
 * @param row
 * @param rowIndex
 * @param column
 * @param columnIndex
 */
function loadTreeData(
	rowKey: ITableBaseRowKey,
	row: any,
	rowIndex: number,
	column: ITableColumnProps,
	columnIndex: number,
) {
	if (!treeValue.get(rowKey)) {
		treeValue.set(rowKey, {
			visible: false,
		});
	}
	const nextVisible = !treeValue.get(rowKey)?.visible;
	treeValue.get(rowKey)!.visible = nextVisible;
}

/**
 * 递归生成树形表格
 * @param row
 * @param options
 */
function RecursiveRow(
	row: {
		data: ITableData[];
		parentLevel: number;
		isRoot: boolean;
	},
	options: { emit: any },
): any {
	return (
		Array.isArray(row.data) &&
		row.data.map((v, i) => {
			const hasChildren =
				v[treeProps.hasChildren] ||
				(Array.isArray(v[treeProps.children]) && v[treeProps.children].length);

			return (
				<Fragment>
					<tr
						class={[
							'v3-table__row',
							`v3-table__row--level-${row.isRoot ? row.parentLevel : row.parentLevel + 1}`,
							normalizeRowKey(v, i) === radioValue ||
							checkboxValue[normalizeRowKey(v, i)] === true
								? 'is-selected'
								: '',
							expandValue.get(normalizeRowKey(v, i)) ? 'is-expanded' : '',
							treeValue.get(normalizeRowKey(v, i))?.visible
								? 'is-tree-expanded'
								: '',
							typeof props.rowClassName === 'function'
								? props.rowClassName({ row: v, rowIndex: i })
								: props.rowClassName,
						]}
					>
						{computedColumns.value.map((vv, ii) => {
							return h(vv, null, {
								default: (scope: { props: Required<ITableColumnProps> }) => {
									return (
										<td
											class={[
												'v3-table__cell',
												normalizeFixed(scope.props.fixed) ? 'is-fixed' : '',
												normalizeFixed(scope.props.fixed)
													? `is-fixed-${normalizeFixed(scope.props.fixed)}`
													: '',
												`is-align-${scope.props.align}`,
												scope.props.showOverflowTooltip
													? 'show-overflow-tooltip'
													: '',
												scope.props.type === 'default'
													? ''
													: `is-type-${scope.props.type}`,
												typeof props.cellClassName === 'function'
													? props.cellClassName({
															row: v,
															rowIndex: i,
															column: scope.props,
															columnIndex: ii,
														})
													: props.cellClassName,
												scope.props.className,
											]}
											style={{
												left:
													normalizeFixed(scope.props.fixed) === 'left'
														? computedBodyFixedLeftColumnOffset.value.find(
																(vv) => vv.index === ii,
															)
															? `${computedBodyFixedLeftColumnOffset.value.find((vv) => vv.index === ii)?.left}px`
															: 'auto'
														: 'auto',
												right:
													normalizeFixed(scope.props.fixed) === 'right'
														? computedBodyFixedRightColumnOffset.value.find(
																(vv) => vv.index === ii,
															)
															? `${computedBodyFixedRightColumnOffset.value.find((vv) => vv.index === ii)?.right}px`
															: 'auto'
														: 'auto',
											}}
											ref={(el) => (
												tableBodyCellRefs.value.push(el as HTMLElement),
												normalizeFixed(scope.props.fixed) === 'left'
													? updateFixedLeftCells(el as HTMLElement, ii)
													: normalizeFixed(scope.props.fixed) === 'right'
														? updateFixedRightCells(el as HTMLElement, ii)
														: void 0
											)}
										>
											<div class="v3-table__cell-inner">
												{/* 树形数据缩进填充 */}
												{!row.isRoot && (
													<div
														class="v3-table__cell-tree-indent"
														style={{
															display: 'inline-block',
															height: '1em',
															width: `calc(${10 * (row.parentLevel + 1)}px + ${ii === 0 && hasChildren ? 0 : 1}em)`,
															verticalAlign: 'middle',
														}}
													></div>
												)}
												{/* 树形数据折叠按钮 */}
												{ii === 0 &&
													hasChildren &&
													h(V3Icon, {
														type: 'Right',
														class: 'v3-table__cell-tree-trigger',
														onClick: () =>
															loadTreeData(
																normalizeRowKey(v, i),
																v,
																i,
																scope.props,
																ii,
															),
													})}
												{/* 默认单元格 */}
												{scope.props.type === 'default' && (
													<Fragment>
														{(vv?.children as any)?.default?.({
															row: i,
															rowIndex: i,
															columnIndex: ii,
														})}
														{scope.props.showOverflowTooltip && (
															<V3Tooltip>
																{scope.props.formatter
																	? scope.props.formatter(v)
																	: v[vv?.props?.prop]}
															</V3Tooltip>
														)}
														{!(vv?.children as any)?.default &&
															!scope.props.showOverflowTooltip && (
																<span>
																	{scope.props.formatter
																		? scope.props.formatter(v)
																		: v[vv?.props?.prop]}
																</span>
															)}
													</Fragment>
												)}
												{/* 序号单元格 */}
												{scope.props.type === 'index' && <span>{i + 1}</span>}
												{/* 单选单元格 */}
												{scope.props.type === 'radio' &&
													h(V3Radio, {
														modelValue: radioValue.value,
														'onUpdate:modelValue': (vvv) =>
															options.emit('update:modelValue', vvv),
														label: normalizeRowKey(v, i),
														onChange: handleRadioChange,
													})}
												{/* 多选框单元格 */}
												{scope.props.type === 'checkbox' &&
													h(V3Checkbox, {
														modelValue: checkboxValue[normalizeRowKey(v, i)],
														'onUpdate:modelValue': (vvv) =>
															options.emit('update:modelValue', vvv),
														onChange: ($event) =>
															handleCheckboxChange(
																normalizeRowKey(v, i),
																v,
																scope.props,
																$event,
															),
													})}
												{/* 可展开单元格 */}
												{scope.props.type === 'expand' &&
													h(V3Icon, {
														type: 'Right',
														onClick: () =>
															toggleRowExpansion(normalizeRowKey(v, i)),
													})}
											</div>
										</td>
									);
								},
							});
						})}
					</tr>
					{/* 展开行 */}
					{computedExpandColumn.value.column && (
						<tr
							style={{
								display: expandValue.get(normalizeRowKey(v, i))
									? 'block'
									: 'none',
							}}
							class="v3-table__row v3-table__row--expansion"
						>
							{h(computedExpandColumn.value.column, null, {
								default: (scope: { props: ITableColumnProps }) => {
									return (
										<td
											class="v3-table__cell"
											colspan={computedColumns.value.length}
										>
											<div class="v3-table__cell-inner">
												{(computedExpandColumn.value.column?.children as any)
													?.default ? (
													h(
														(computedExpandColumn.value.column?.children as any)
															?.default,
														{
															row: v,
															rowIndex: i,
															columnIndex:
																computedExpandColumn.value.columnIndex,
														},
													)
												) : (
													<span>
														{scope.props.formatter
															? scope.props.formatter(v)
															: v[
																	computedExpandColumn.value.column?.props?.prop
																]}
													</span>
												)}
											</div>
										</td>
									);
								},
							})}
						</tr>
					)}
					{
						<RecursiveRow
							data={v[treeProps.children]}
							isRoot={false}
							parentLevel={row.isRoot ? row.parentLevel : row.parentLevel + 1}
						/>
					}
				</Fragment>
			);
		})
	);
}

defineExpose({
	sort,
	clearSort,
	setCurrentRow,
	clearSelection,
	getSelectionRows,
	toggleRowSelection,
	toggleAllSelection,
	toggleRowExpansion,
});
</script>
<style lang="scss">
@import './Table.scss';
</style>
