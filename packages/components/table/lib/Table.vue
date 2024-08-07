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
						<template v-for="(v, i) in headerColumnWidths" :key="i">
							<col
								v-if="v.width"
								:style="{
									width: `${v.width ? `${v.width}px` : 'auto'}`,
								}"
								class="v3-table__col v3-table__header-col"
							/>
						</template>
					</colgroup>
					<thead>
						<tr
							:class="`${typeof props.headerRowClassName === 'function' ? props.headerRowClassName({ row: null, rowIndex: 0 }) : props.headerRowClassName}`"
						>
							<template v-for="(v, i) in computedColumns" :key="i">
								<component :is="v">
									<template #default="scope">
										<th
											:class="`v3-table__cell v3-table__header-cell ${normalizeFixed(scope.props.fixed) ? 'is-fixed' : ''} ${normalizeFixed(scope.props.fixed) ? `is-fixed-${normalizeFixed(scope.props.fixed)}` : ''} ${scope.props.resizable ? 'is-resizable' : ''} is-align-${scope.props.headerAlign} ${typeof props.headerCellClassName === 'function' ? props.headerCellClassName({ row: null, rowIndex: 0, column: scope.props, columnIndex: i }) : props.headerCellClassName} ${scope.props.labelClassName}`"
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
												<component
													v-if="(v?.children as any)?.label"
													:is="(v?.children as any)?.label"
												></component>
												<span v-else>{{ scope.props.label }}</span>
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
			v-if="props.data.length"
			:class="{
				'v3-table__body-wrapper': true,
			}"
		>
			<div class="v3-table__body-inner" ref="tableBodyRef">
				<table class="v3-table__body">
					<colgroup>
						<template v-for="(v, i) in bodyColumnWidths" :key="i">
							<col
								v-if="v.width"
								:style="{
									width: `${v.width ? `${v.width}px` : 'auto'}`,
								}"
								class="v3-table__col v3-table__body-col"
							/>
						</template>
					</colgroup>
					<tbody>
						<tr
							v-for="(v, i) in data"
							:key="i"
							:class="`v3-table__row v3-table__row-${i} ${typeof props.rowClassName === 'function' ? props.rowClassName({ row: v, rowIndex: i }) : props.rowClassName}`"
						>
							<template v-for="(vv, ii) in computedColumns" :key="ii">
								<component :is="vv">
									<template #default="scope">
										<td
											:class="`v3-table__cell v3-table__body-cell v3-table__cell-${i}-${ii} ${normalizeFixed(scope.props.fixed) ? 'is-fixed' : ''} ${normalizeFixed(scope.props.fixed) ? `is-fixed-${normalizeFixed(scope.props.fixed)}` : ''} is-align-${scope.props.align} ${typeof props.cellClassName === 'function' ? props.cellClassName({ row: v, rowIndex: i, column: scope.props, columnIndex: ii }) : props.cellClassName} ${scope.props.className}`"
											:style="{
												left:
													normalizeFixed(scope.props.fixed) === 'left'
														? computedBodyFixedLeftColumnOffset.find(
																(vv) => vv.index === ii,
															)
															? `${computedBodyFixedLeftColumnOffset.find((vv) => vv.index === ii)?.left}px`
															: 'auto'
														: 'auto',
												right:
													normalizeFixed(scope.props.fixed) === 'right'
														? computedBodyFixedRightColumnOffset.find(
																(vv) => vv.index === ii,
															)
															? `${computedBodyFixedRightColumnOffset.find((vv) => vv.index === ii)?.right}px`
															: 'auto'
														: 'auto',
											}"
											:ref="(el) => ((tableBodyCellRefs.push(el as HTMLElement)), (
												  normalizeFixed(scope.props.fixed) === 'left' 
														? updateFixedLeftCells(el as HTMLElement, ii)
														: normalizeFixed(scope.props.fixed) === 'right' 
															? updateFixedRightCells(el as HTMLElement, ii)
															: void 0
											))"
										>
											<div class="v3-table__cell-inner">
												<component
													v-if="(vv?.children as any)?.default"
													:is="(vv?.children as any)?.default"
													:row="v"
													:rowIndex="i"
													:columnIndex="ii"
												></component>
												<span v-else>{{
													scope.props.formatter
														? scope.props.formatter(v)
														: v[vv?.props?.prop]
												}}</span>
											</div>
										</td>
									</template>
								</component>
							</template>
						</tr>
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
import { VNode, computed, onMounted, ref, useSlots, watch } from 'vue';

import {
	divide,
	isNumber,
	isStrictObject,
	isString,
	isUndefined,
	subtract,
} from '@common/utils';
import '@common/utils/index';
import { V3LoadingDirective, V3TableColumn } from '@components/main';
import useEventListener from '@hooks/useEventListener';
import useResizeObserver from '@hooks/useResizeObserver';
import { useScroll } from '@vueuse/core';

import { ITableColumnFixed, ITableProps } from '@/public/typings';

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
	rowClassName: '',
	cellClassName: '',
	headerRowClassName: '',
	headerCellClassName: '',
	rowKey: '',
	/** 表格为空时展示的文本，也可通过 slot=empty 自定义 */
	emptyText: '暂无数据',
	/** 表格是否加载中 */
	loading: false,
});
const slots = useSlots();

const computedColumns = computed(() => {
	// table-column有可能是通过 v-for 遍历出来的，也可能是独立组件
	let columns: VNode[] = [];
	let children = slots?.default?.();
	if (Array.isArray(children)) {
		children.forEach((v) => {
			if (isStrictObject(v) && (v?.type as any)?.name === V3TableColumn.name) {
				columns.push(v);
			} else if (Array.isArray(v?.children)) {
				let _children: any[] = v?.children.filter(
					// @ts-ignore
					(vv) => isStrictObject(vv) && vv?.type?.name === V3TableColumn.name,
				);
				columns.push(..._children);
			}
		});
	}
	return columns;
});

const computedMaxHeight = computed(() => {
	return isNumber(props.maxHeight) ? `${props.maxHeight}px` : props.maxHeight;
});

const tableRef = ref<HTMLElement>();
const tableHeaderRef = ref<HTMLElement>();
const tableBodyRef = ref<HTMLElement>();
const tableHeaderCellRefs = ref<HTMLElement[]>([]);
const tableBodyCellRefs = ref<HTMLElement[]>([]);

// 表格是否出现了纵向滚动条
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

// 表格是否出现了横向滚动条
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

// 固定的单元格出现阴影
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

// 列宽相关
interface IColumnWidth {
	width: number;
	/** 拖拽表头时的最小宽度 */
	resizeMinWidth: number;
	/** 当前列的宽度是否自定义的宽度 */
	isCustom: boolean;
}
const COLUMN_DEFAULT_WIDTH = 120;
// 表体列宽
const bodyColumnWidths = ref<IColumnWidth[]>([]);
// 表头列宽（由于表体可能会出现滚动条，挤压位置，所以分开计算）
const headerColumnWidths = ref<IColumnWidth[]>([]);
onMounted(() => {
	let newColumnWidths = computedColumns.value.map((v) => {
		let propsWidth = Number.parseFloat(v?.props?.width);
		let propsMinWidth = Number.parseFloat(
			// @ts-ignore
			v?.props?.minWidth || v?.type?.props?.minWidth?.default,
		);
		return {
			width: propsWidth || COLUMN_DEFAULT_WIDTH,
			resizeMinWidth: propsMinWidth,
			isCustom: !Number.isNaN(propsWidth),
		};
	});
	bodyColumnWidths.value = structuredClone(newColumnWidths);
	headerColumnWidths.value = structuredClone(newColumnWidths);
});
watch(hasVerticalScrollbar, () => {
	if (tableBodyRef.value) {
		// 当滚动条显示/隐藏的时候，更新列宽，避免由于滚动条占位导致表头和表体无法对齐
		let tableWidth = tableBodyRef.value.clientWidth;
		let averageCount = bodyColumnWidths.value.filter((v) => !v.isCustom).length;
		if (averageCount) {
			let averageWidth = divide(tableWidth, averageCount);
			bodyColumnWidths.value = bodyColumnWidths.value.map((v, i) => {
				let width = !v.isCustom
					? Math.max(averageWidth, COLUMN_DEFAULT_WIDTH)
					: v.width;
				return {
					...v,
					width,
				};
			});
			headerColumnWidths.value = headerColumnWidths.value.map((v, i) => {
				let width = !v.isCustom
					? Math.max(averageWidth, COLUMN_DEFAULT_WIDTH)
					: v.width;
				// 出现滚动条的时候，需要更新表头最后一列的宽度（需加上滚动条宽度）
				if (
					computedColumns.value[i]?.props?.fixed !== false &&
					i === computedColumns.value.length - 1
				) {
					width += verticalScrollbarWidth.value;
				}
				return {
					...v,
					width,
				};
			});
		}
	}
});

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

// 表头拖拽
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
</script>
<style lang="scss">
@import './Table.scss';
</style>
