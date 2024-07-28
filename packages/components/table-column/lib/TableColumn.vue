<template>
	<slot v-bind="attrs"></slot>
</template>
<script lang="ts" setup>
import { useAttrs, useSlots } from 'vue';

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
	align: 'center',
	headerAlign: 'center',
	width: 'auto',
	minWidth: 'none',
	/** 本列是否固定 */
	fixed: false,
	/** 本列是否可排序 */
	sortable: false,
	/** 当不为自定义排序时，采用的排序策略（等同于 Array.sort 方法） */
	sortMethod: () => -1,
	resizable: true,
	formatter: (row: any) => row,
	className: '',
	labelClassName: '',
});
const slots = useSlots();
const attrs = useAttrs();
</script>
<style lang="scss">
@import './TableColumn.scss';
</style>
