<template>
	<div
		:class="{
			'v3-table': true,
			'has-header': props.showHeader,
		}"
	>
		<div class="v3-table__header">
			<div class="v3-table__header-inner">
				<table>
					<thead>
						<tr>
							<template v-for="(v, i) in computedColumns" :key="i">
								<component :is="v">
									<template #default="scope">
										<td
											:class="{
												[`is-align-${scope.props.headerAlign}`]: true,
											}"
										>
											<div class="v3-table__cell">
												<component
													v-if="(v?.children as any)?.label"
													:is="(v?.children as any)?.label"
												></component>
												<span v-else>{{ scope.props.label }}</span>
											</div>
										</td>
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
						<tr v-for="(v, i) in data" :key="i">
							<template v-for="(vv, ii) in computedColumns" :key="ii">
								<component :is="vv">
									<template #default="scope">
										<td
											:class="{
												[`is-align-${scope.props.align}`]: true,
											}"
										>
											<div class="v3-table__cell">
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
</script>
<style lang="scss">
@import './Table.scss';
</style>
