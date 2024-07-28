<template>
	<div
		:class="{
			'v3-table': true,
			'has-header': props.showHeader,
			'has-border': props.border,
			'is-stripe': props.stripe,
			'is-highlight': props.highlightHoverRow,
		}"
	>
		<div v-if="props.showHeader" class="v3-table__header">
			<div class="v3-table__header-inner">
				<table>
					<thead>
						<tr
							:class="`${typeof props.headerRowClassName === 'function' ? props.headerRowClassName({ row: null, rowIndex: 0 }) : props.headerRowClassName}`"
						>
							<template v-for="(v, i) in computedColumns" :key="i">
								<component :is="v">
									<template #default="scope">
										<th
											:class="`v3-table__cell is-align-${scope.props.headerAlign} ${typeof props.headerCellClassName === 'function' ? props.headerCellClassName({ row: null, rowIndex: 0, column: scope.props, columnIndex: i }) : props.headerCellClassName}`"
										>
											<div class="v3-table__cell-inner">
												<component
													v-if="(v?.children as any)?.label"
													:is="(v?.children as any)?.label"
												></component>
												<span v-else>{{ scope.props.label }}</span>
											</div>
										</th>
									</template>
								</component>
							</template>
						</tr>
					</thead>
				</table>
			</div>
		</div>
		<div class="v3-table__body">
			<div class="v3-table__body-inner">
				<table>
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
											:class="`v3-table__cell v3-table__cell-${i}-${ii} is-align-${scope.props.align} ${typeof props.cellClassName === 'function' ? props.cellClassName({ row: v, rowIndex: i, column: scope.props, columnIndex: ii }) : props.cellClassName}`"
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
	</div>
</template>
<script lang="ts" setup>
import { computed, useSlots } from 'vue';

import { isStrictObject } from '@common/utils';
import { V3TableColumn } from '@components/main';

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
</script>
<style lang="scss">
@import './Table.scss';
</style>
