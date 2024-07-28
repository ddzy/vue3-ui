<template>
	<div class="v3-table">
		<div class="v3-table__header">
			<div class="v3-table__header-inner">
				<table>
					<thead>
						<tr>
							<td v-for="(v, i) in computedHeaderColumns" :key="i">
								<component :is="v"></component>
							</td>
						</tr>
					</thead>
				</table>
			</div>
		</div>
		<div class="v3-table__body">
			<div class="v3-table__body-inner">
				<table>
					<tbody>
						<tr v-for="(v, i) in data" :key="i">
							<td v-for="(vv, ii) in computedBodyColumns" :key="ii">
								<component :is="vv">
									<component
										v-if="(vv?.children as any)?.default"
										:is="(vv?.children as any)?.default"
										:row="v"
										:rowIndex="i"
										:columnIndex="ii"
									></component>
									<span v-else>{{ v[vv?.props?.prop] }}</span>
								</component>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { computed, h, useSlots } from 'vue';

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
	border: true,
	/** 是否显示条纹 */
	stripe: true,
	/** 表格高度 */
	height: 'auto',
	/** 表格最大高度 */
	maxHeight: 'none',
	/** 表格尺寸 */
	size: 'medium',
	/** 是否显示表头 */
	showHeader: true,
	/** 是否高亮当前hover的行 */
	highlightCurrentRow: true,
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
const computedHeaderColumns = computed(() => {
	const result = computedColumns.value.map((v) => {
		return h(V3TableColumn, v.props, {
			// @ts-ignore
			default: v?.children?.label || (() => h('span', null, v?.props?.label)),
		});
	});
	return result;
});
const computedBodyColumns = computed(() => {
	const result = computedColumns.value.map((v) => {
		return h(V3TableColumn, v.props, {
			// @ts-ignore
			default: v?.children?.default,
		});
	});
	return result;
});
</script>
<style lang="scss">
@import './Table.scss';
</style>
