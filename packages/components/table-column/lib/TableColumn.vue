<template>
	<slot v-bind="{ props }"></slot>
</template>
<script lang="ts" setup>
import { ITableColumnProps } from '@/public/typings';

defineOptions({
	name: 'V3TableColumn',
});

const props = withDefaults(defineProps<ITableColumnProps>(), {
	/** 对应 data 中的数据 */
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
	/** 当不为自定义排序时，采用的排序策略（等同于 Array.sort 方法） */
	sortMethod: () => -1,
	resizable: false,
	className: '',
	labelClassName: '',
});
</script>
<style lang="scss">
@import './TableColumn.scss';
</style>
