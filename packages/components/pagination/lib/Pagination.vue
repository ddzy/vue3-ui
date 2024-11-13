<template>
	<div class="v3-pagination">分页</div>
</template>
<script lang="ts" setup>
import { IPaginationProps } from '@/public/typings';

defineOptions({
	name: 'V3Pagination',
});

const props = withDefaults(defineProps<IPaginationProps>(), {
	page: 1,
	pageSize: 20,
	total: 0,
	pageSizes: () => [
		{
			label: `10条/页`,
			value: 10,
		},
		{
			label: `20条/页`,
			value: 20,
		},
		{
			label: `50条/页`,
			value: 50,
		},
		{
			label: `100条/页`,
			value: 100,
		},
	],
	showPageSizePicker: true,
	showPageJumper: true,
	displayOrder: () => ['pages', 'page-size-picker', 'page-jumper'],
	displayPageCount: 9,
	onPageChange: undefined,
	onPageSizeChange: undefined,
});
</script>
<style lang="scss">
@import './Pagination.scss';
</style>
