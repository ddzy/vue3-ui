<template>
	<div
		:class="{
			'v3-table': true,
			'has-header': props.showHeader,
			'has-border': props.border,
			'has-vertical-scrollbar': hasVerticalScrollbar,
			'is-stripe': props.stripe,
			'is-highlight': props.highlightHoverRow,
			'is-resizing': isResizerMouseDown,
			'show-left-border': true,
			'show-right-border': true,
		}"
		:style="{
			maxHeight: computedMaxHeight,
		}"
		ref="tableRef"
	>
		<div v-if="props.showHeader" class="v3-table__header">
			<table
				:class="{
					'v3-table__header-inner': true,
					'has-shadow': !arrivedState.top,
				}"
				:style="{
					transform: `translate3d(-${x}px, 0, 0)`,
				}"
			>
				<reusable-colgroup :isHeader="true"></reusable-colgroup>
				<thead>
					<tr
						:class="`${typeof props.headerRowClassName === 'function' ? props.headerRowClassName({ row: null, rowIndex: 0 }) : props.headerRowClassName}`"
					>
						<template v-for="(v, i) in computedColumns" :key="i">
							<component :is="v">
								<template #default="scope">
									<th
										:class="`v3-table__cell v3-table__header-cell ${scope.props.resizable ? 'is-resizable' : ''} is-align-${scope.props.headerAlign} ${typeof props.headerCellClassName === 'function' ? props.headerCellClassName({ row: null, rowIndex: 0, column: scope.props, columnIndex: i }) : props.headerCellClassName} ${scope.props.labelClassName}`"
										ref="tableHeaderCellRefs"
									>
										<div class="v3-table__cell-inner">
											<component
												v-if="(v?.children as any)?.label"
												:is="(v?.children as any)?.label"
											></component>
											<span v-else>{{ scope.props.label }}</span>
										</div>
										<div
											class="v3-table__cell-resizer"
											@mousedown="handleResizerMouseDown($event, i)"
										></div>
									</th>
								</template>
							</component>
						</template>
						<!-- 填充滚动条宽度 -->
						<th
							v-show="hasVerticalScrollbar"
							:style="{
								width: `${scrollbarWidth}px`,
							}"
							class="v3-table__header-gap"
						></th>
					</tr>
				</thead>
			</table>
		</div>
		<div
			ref="tableBodyRef"
			:class="{
				'v3-table__body': true,
				'show-bottom-border': !arrivedState.bottom,
			}"
		>
			<table
				:class="{
					'v3-table__body-inner': true,
				}"
			>
				<reusable-colgroup></reusable-colgroup>
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
										:class="`v3-table__cell v3-table__body-cell v3-table__cell-${i}-${ii} is-align-${scope.props.align} ${typeof props.cellClassName === 'function' ? props.cellClassName({ row: v, rowIndex: i, column: scope.props, columnIndex: ii }) : props.cellClassName} ${scope.props.className}`"
									>
										<div class="v3-table__cell-inner">
											<component
												v-if="(vv?.children as any)?.default"
												:is="(vv?.children as any)?.default"
												:row="v"
												:rowIndex="i"
												:columnIndex="ii"
											></component>
											<span v-else>{{ v[vv?.props?.prop] }}</span>
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
</template>
<script lang="tsx" setup>
import { computed, ref, useSlots, watch } from 'vue';

import { add, divide, isNumber, isStrictObject, subtract } from '@common/utils';
import '@common/utils/index';
import { V3TableColumn } from '@components/main';
import useEventListener from '@hooks/useEventListener';
import useResizeObserver from '@hooks/useResizeObserver';
import { useScroll } from '@vueuse/core';

import { ITableProps } from '@/public/typings';

defineOptions({
	name: 'V3Table',
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
});
const slots = useSlots();

const computedColumns = computed(() => {
	const columns = (slots?.default?.() || []).filter(
		(v) =>
			isStrictObject(v.type) && (v.type as any).name === V3TableColumn.name,
	);
	return columns;
});

const computedMaxHeight = computed(() => {
	return isNumber(props.maxHeight) ? `${props.maxHeight}px` : props.maxHeight;
});

const tableRef = ref<HTMLElement>();
const tableBodyRef = ref<HTMLElement>();
const tableHeaderCellRefs = ref<HTMLElement[]>([]);

// 表格是否出现了纵向滚动条
const hasVerticalScrollbar = ref(false);
function updateHasScrollbar() {
	if (tableBodyRef.value) {
		const { offsetWidth, clientWidth } = tableBodyRef.value;
		hasVerticalScrollbar.value = offsetWidth !== clientWidth;
	}
}
useResizeObserver(tableBodyRef, () => {
	updateHasScrollbar();
});
const { arrivedState, x } = useScroll(tableBodyRef, {
	throttle: 0,
});

// 滚动条宽度
const scrollbarWidth = ref(0);
function updateScrollbarWidth() {
	const div = document.createElement('div');
	div.style.cssText += `position: fixed; left: -99999px; top: -99999px; z-index: -1; overflow: scroll; width: 100px; height: 100px;`;
	document.body.appendChild(div);
	scrollbarWidth.value = div.offsetWidth - div.clientWidth;
	document.body.removeChild(div);
}
updateScrollbarWidth();

// 列宽
const columnWidths = ref<number[]>([]);
watch(
	[hasVerticalScrollbar, tableRef],
	([newHasVerticalScrollbar, newTableRef]) => {
		if (!newTableRef) {
			return;
		}
		// 一般表格数据都是异步获取的，所以需要根据滚动条的变化，计算表格的初始宽度
		let tableWidth = newTableRef.clientWidth;
		if (newHasVerticalScrollbar) {
			tableWidth -= scrollbarWidth.value;
		}
		let propsTotalWidth = computedColumns.value.reduce((total, current) => {
			let propsWidth = Number.parseFloat(current?.props?.width) || 0;
			total = add(total, propsWidth);
			return total;
		}, 0);
		// 如果指定的所有列宽总和超出表格宽度
		// 如果指定了列宽，则该列使用指定的宽度，剩余的列宽 = 表格初始宽度 / 列的个数
		if (propsTotalWidth > tableWidth) {
			let averageCount = computedColumns.value.length;
			let averageWidth = Math.floor(divide(tableWidth, averageCount));
			columnWidths.value = computedColumns.value.map((v) => {
				let propsWidth = Number.parseFloat(v?.props?.width);
				return !Number.isNaN(propsWidth) ? propsWidth : averageWidth;
			});
		} else {
			// 反之
			// 如果指定了列宽，则该列使用指定的宽度，剩余的列宽 = (表格初始宽度 - 指定了宽度的列的总宽度) / 未指定宽度的列的个数
			let newColumnWidths = computedColumns.value.map((v) => {
				let propsWidth = Number.parseFloat(v?.props?.width);
				if (!Number.isNaN(propsWidth)) {
					tableWidth = subtract(tableWidth, propsWidth);
				}
				return propsWidth;
			});
			let averageCount = newColumnWidths.filter((v) => Number.isNaN(v)).length;
			let averageWidth = Math.floor(divide(tableWidth, averageCount));
			newColumnWidths = newColumnWidths.map((v) =>
				Number.isNaN(v) ? averageWidth : v,
			);
			columnWidths.value = newColumnWidths;
		}
	},
	{ immediate: true },
);

function ReusableColgroup(props: { isHeader?: boolean }) {
	return (
		<colgroup>
			{columnWidths.value.map((v, i) => {
				return (
					<col
						key={i}
						class={`v3-table__col ${props.isHeader ? 'v3-table__header-col' : 'v3-table__body-col'}`}
						width={v}
					></col>
				);
			})}
		</colgroup>
	);
}

// 表头拖拽大小
const isResizerMouseDown = ref(false);
const resizerStartPosition = ref(0);
const resizerIndex = ref(-1);
function handleResizerMouseDown(e: MouseEvent, i: number) {
	isResizerMouseDown.value = true;
	resizerIndex.value = i;
	resizerStartPosition.value = e.pageX;
}
useEventListener(document, 'mouseup', (e) => {
	if (isResizerMouseDown.value) {
		isResizerMouseDown.value = false;
		let newColumnWidths = columnWidths.value.slice();
		const resizerEndPosition = e.pageX;
		const diff = subtract(resizerEndPosition, resizerStartPosition.value);
		if (resizerIndex.value !== -1 && tableRef.value) {
			// 更新拖拽线左侧一列的宽度
			newColumnWidths[resizerIndex.value] += diff;
			// 表格初始宽度
			let tableWidth = tableRef.value.clientWidth;
			if (hasVerticalScrollbar.value) {
				tableWidth -= scrollbarWidth.value;
			}
			// 拖拽后所有列的总宽度
			let totalColumnWidth = newColumnWidths.reduce((total, current) => {
				total += current;
				return total;
			}, 0);
			// 拖拽线右侧一列的宽度
			let rightColumnWidth = newColumnWidths[resizerIndex.value + 1];
			if (totalColumnWidth <= tableWidth) {
				// 如果拖拽后列的总宽度没有超出表格初始宽度，那么还需要重新计算拖拽线右侧一列的宽度
				rightColumnWidth = newColumnWidths.reduce(
					(total, current, currentIndex) => {
						if (currentIndex !== resizerIndex.value + 1) {
							total -= current;
						}
						return total;
					},
					tableWidth,
				);
			}
			newColumnWidths[resizerIndex.value + 1] = rightColumnWidth;
			// 更新每一列的宽度，每列的宽度不能小于最小值
			newColumnWidths = newColumnWidths.map((v, i) => {
				let minWidth = Number.parseFloat(
					computedColumns.value[i]?.props?.minWidth ||
						// @ts-ignore
						computedColumns.value[i]?.type?.props?.minWidth?.default,
				);
				return Math.max(v, minWidth);
			});

			columnWidths.value = newColumnWidths;
		}
	}
});
</script>
<style lang="scss">
@import './Table.scss';
</style>
