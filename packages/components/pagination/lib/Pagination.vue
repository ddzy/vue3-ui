<template>
	<div class="v3-pagination">
		<slot></slot>
		<div class="v3-pagination__controller">
			<div class="v3-pagination__page-jumper">
				<span>跳至</span>
				<V3Input
					v-model="customPage"
					:size="'small'"
					:placeholder="''"
					@input="handleInput"
				/>
			</div>
			<div class="v3-pagination__pages">
				<div class="v3-pagination__pages-prev">
					<V3Icon :type="'Left'" />
				</div>
				<div class="v3-pagination__pages-item">1</div>
				<div class="v3-pagination__pages-item">2</div>
				<div class="v3-pagination__pages-item">3</div>
				<div class="v3-pagination__pages-item">4</div>
				<div class="v3-pagination__pages-item">5</div>
				<div class="v3-pagination__pages-next">
					<V3Icon :type="'Right'" />
				</div>
			</div>
			<div class="v3-pagination__page-size-picker">
				<V3Select v-model="customPageSize" size="small">
					<V3SelectOption
						v-for="v in props.pageSizes"
						:key="isNumber(v) ? v : v.value"
						:label="isNumber(v) ? `${v}` : v.label"
						:value="isNumber(v) ? v : v.value"
					/>
				</V3Select>
			</div>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

import { V3Icon, V3Input, V3Select } from '@components/main';
import { isNumber } from 'lodash-es';

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
	displayOrder: () => ['page-jumper', 'pages', 'page-size-picker'],
	displayPageCount: 9,
	onPageChange: undefined,
	onPageSizeChange: undefined,
});

/**
 * 跳至第n页
 */
const customPage = ref();
function handleInput(v: string) {
	customPage.value = Number.parseInt(v.replace(/[^0-9]/g, '')) || '';
}

/**
 * n条/页
 */
const customPageSize = ref(10);
</script>
<style lang="scss">
@import './Pagination.scss';
</style>
