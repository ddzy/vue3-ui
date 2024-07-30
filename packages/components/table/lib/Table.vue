<template>
	<div
		:class="{
			'v3-table': true,
			'has-header': props.showHeader,
			'has-border': props.border,
			'has-scrollbar': hasScrollbar,
			'is-stripe': props.stripe,
			'is-highlight': props.highlightHoverRow,
		}"
		:style="{
			maxHeight: computedMaxHeight,
		}"
	>
		<div
			v-if="props.showHeader"
			:class="{
				'v3-table__header': true,
				'has-shadow': !arrivedState.top,
			}"
		>
			<table class="v3-table__header-inner">
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
										<div class="v3-table__cell-resizer"></div>
									</th>
								</template>
							</component>
						</template>
						<!-- 填充滚动条宽度 -->
						<th
							v-show="hasScrollbar"
							:style="{
								width: `${scrollbarWidth}px`,
							}"
							class="v3-table__header-thumb"
						></th>
					</tr>
				</thead>
			</table>
		</div>
		<div
			ref="tableBodyRef"
			:class="{
				'v3-table__body': true,
				'has-bottom-border': !arrivedState.bottom,
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
import { computed, onMounted, ref, useSlots } from 'vue';

import { isNumber, isStrictObject } from '@common/utils';
import '@common/utils/index';
import { V3TableColumn } from '@components/main';
import useElementBounding from '@hooks/useElementBounding';
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
	border: true,
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

const tableBodyRef = ref<HTMLElement>();
const tableHeaderCellRefs = ref<HTMLElement[]>([]);

// 表格是否出现了滚动条
const hasScrollbar = ref(false);
function updateHasScrollbar() {
	if (tableBodyRef.value) {
		const { offsetWidth, clientWidth } = tableBodyRef.value;
		hasScrollbar.value = offsetWidth !== clientWidth;
	}
}
useResizeObserver(tableBodyRef, () => {
	updateHasScrollbar();
});
const { arrivedState } = useScroll(tableBodyRef, {
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
onMounted(() => {
	columnWidths.value = tableHeaderCellRefs.value.map((v) => {
		const { width } = useElementBounding(v);
		return width.value;
	});
});

function ReusableColgroup(props: { isHeader?: boolean }) {
	return (
		<colgroup>
			{columnWidths.value.map((v, i) => {
				return (
					<col
						key={i}
						class={`v3-table__col ${props.isHeader ? 'v3-table__header-col' : 'v3-table__body-col'}`}
						width={v || 'auto'}
					></col>
				);
			})}
		</colgroup>
	);
}
</script>
<style lang="scss">
@import './Table.scss';
</style>
