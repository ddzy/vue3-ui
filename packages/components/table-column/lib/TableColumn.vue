<template>
	<slot v-bind="{ props }"></slot>
</template>
<script lang="ts" setup>
import { ITableColumnProps } from '@/public/typings';

defineOptions({
	name: 'V3TableColumn',
});

const props = withDefaults(defineProps<ITableColumnProps>(), {
	/** data数据对应key */
	prop: '',
	/** 表头标题 */
	label: '',
	/** 表格列的类型 */
	type: 'default',
	align: 'left',
	headerAlign: 'left',
	width: '',
	/** 该列的最小宽度 */
	minWidth: '30',
	/** 本列是否固定 */
	fixed: false,
	/** 本列是否可排序 */
	sortable: false,
	/** 排序顺序，默认为：（无 => 升序 => 降序） */
	sortBy: () => ['none', 'ascending', 'descending'],
	resizable: false,
	className: '',
	labelClassName: '',
	showOverflowTooltip: false,
});
</script>
<style lang="scss">
@import './TableColumn.scss';
</style>
