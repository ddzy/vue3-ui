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
									<span>{{ v[vv?.props?.prop] }}</span>
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
import {
	VNodeNormalizedChildren,
	cloneVNode,
	computed,
	h,
	useSlots,
} from 'vue';

import { isFunction, isStrictObject } from '@common/utils';

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

const computedHeaderColumns = computed(() => {
	const columns = slots?.default?.() || [];
	let result = columns.map((v) => {
		let clonedColumn = cloneVNode(v);
		let children: VNodeNormalizedChildren = null;
		if (
			clonedColumn.children &&
			isStrictObject(clonedColumn.children) &&
			isFunction((clonedColumn.children as any).label)
		) {
			children = {
				default: h((clonedColumn.children as any).label),
			};
		} else {
			children = [
				h('span', null, {
					default: () => clonedColumn?.props?.label,
				}),
			];
		}
		clonedColumn.children = children;

		return clonedColumn;
	});

	return result;
});
const computedBodyColumns = computed(() => {
	const columns = slots?.default?.() || [];
	let result = columns.map((v) => {
		let clonedColumn = cloneVNode(v);
		let children: VNodeNormalizedChildren = null;
		if (
			clonedColumn.children &&
			isStrictObject(clonedColumn.children) &&
			isFunction((clonedColumn.children as any).default)
		) {
			children = {
				default: (clonedColumn.children as any).default,
			};
		} else {
			children = [];
		}
		clonedColumn.children = children;

		return clonedColumn;
	});

	return result;
});
</script>
<style lang="scss">
@import './Table.scss';
</style>
