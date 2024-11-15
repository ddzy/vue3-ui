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
				<div
					:class="[
						'v3-pagination__pages-prev',
						(props.disabled || currentPage <= 1) && 'is-disabled',
					]"
					@click="handlePrevPageClick"
				>
					<V3Icon :type="'Left'" />
				</div>
				<div
					v-if="props.displayPageCount - 4 > 0"
					:class="[
						'v3-pagination__pages-first',
						'v3-pagination__pages-item',
						currentPage === 1 && 'is-active',
					]"
					@click="handleFirstPageClick"
				>
					1
				</div>
				<div
					v-if="props.displayPageCount - 4 > 0"
					class="v3-pagination__pages-fast-backward"
					@mouseenter="isHoverFastBackward = true"
					@mouseleave="isHoverFastBackward = false"
				>
					<V3Icon v-if="!isHoverFastBackward" :type="'More'" />
					<V3Icon v-else :type="'DoubleLeft'" />
				</div>
				<div
					v-for="v in computedCurrentPages"
					:key="v"
					:class="[
						'v3-pagination__pages-item',
						currentPage === v && 'is-active',
					]"
					@click="handlePageClick(v)"
				>
					{{ v }}
				</div>
				<div
					v-if="props.displayPageCount - 4 > 0"
					class="v3-pagination__pages-fast-forward"
					@mouseenter="isHoverFastForward = true"
					@mouseleave="isHoverFastForward = false"
				>
					<V3Icon v-if="!isHoverFastForward" :type="'More'" />
					<V3Icon v-else :type="'DoubleRight'" />
				</div>
				<div
					v-if="props.displayPageCount - 4 > 0"
					:class="[
						'v3-pagination__pages-last',
						'v3-pagination__pages-item',
						currentPage === computedTotalPage && 'is-active',
					]"
					@click="handleLastPageClick"
				>
					{{ computedTotalPage }}
				</div>
				<div
					:class="[
						'v3-pagination__pages-next',
						(props.disabled || currentPage >= computedTotalPage) &&
							'is-disabled',
					]"
					@click="handleNextPageClick"
				>
					<V3Icon :type="'Right'" />
				</div>
			</div>
			<div class="v3-pagination__page-size-picker">
				<V3Select v-model="currentPageSize" size="small">
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
import { computed, ref } from 'vue';

import { divide } from '@common/utils';
import { V3Icon, V3Input, V3Select } from '@components/main';
import { isNumber } from 'lodash-es';

import { IPaginationProps } from '@/public/typings';

defineOptions({
	name: 'V3Pagination',
});

const props = withDefaults(defineProps<IPaginationProps>(), {
	defaultPage: 1,
	defaultPageSize: 20,
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
	disabled: false,
	onPageChange: undefined,
	onPageSizeChange: undefined,
});

/**
 * 跳至第n页
 */
const customPage = ref();
function handleInput(e: InputEvent) {
	const target = e.target as HTMLInputElement;
	let value = target.value;
	let valueToNumber = Number.parseInt(value.replace(/[^0-9]/g, ''));
	customPage.value = !isNaN(valueToNumber) ? `${valueToNumber}` : undefined;
}
const computedCustomPage = computed(() => {
	return Number.parseInt(customPage.value);
});

/**
 * hover时切换更多按钮的显示
 */
const isHoverFastForward = ref(false);
const isHoverFastBackward = ref(false);

/**
 * 当前选中第几页
 */
const currentPage = ref(props.defaultPage);
/**
 * 每页条数
 */
const currentPageSize = ref(props.defaultPageSize);
/**
 * 总页数
 */
const computedTotalPage = computed(() => {
	return Math.ceil(divide(props.total, currentPageSize.value));
});
/**
 * 当前展示的所有页码
 */
const computedCurrentPages = computed(() => {
	// 页码可展示的个数
	// 需要注意：页码区域需要固定展示4个：首页页码、左快进、右快进、尾页页码
	let availablePageCount = 0;
	if (props.displayPageCount - 4 > 0) {
		availablePageCount = props.displayPageCount - 4;
	} else {
		availablePageCount = props.displayPageCount;
	}

	let pages = new Array(Math.min(availablePageCount, currentPage.value));
	// 如果当前选中最大页码
	if (currentPage.value === computedTotalPage.value) {
		if (props.displayPageCount - 4 > 0) {
			for (let i = pages.length - 1, j = 1; i >= 0; i--, j++) {
				pages[i] = computedTotalPage.value - j;
			}
		} else {
			for (let i = pages.length - 1, j = 0; i >= 0; i--, j++) {
				pages[i] = computedTotalPage.value - j;
			}
		}
	} else if (currentPage.value === 1) {
		// 当前选中最小页码
		if (props.displayPageCount - 4 > 0) {
			for (let i = 0, j = 1; i < pages.length; i++, j++) {
				pages[i] = 1 + j;
			}
		} else {
			for (let i = 0, j = 0; i < pages.length; i++, j++) {
				pages[i] = 1 + j;
			}
		}
	} else {
		// 选中其他页码
		// 中间的页码
		let middleOfPages = Math.floor(pages.length / 2);
		if (currentPage.value === computedTotalPage.value - 1) {
			middleOfPages = pages.length - 1;
		} else if (currentPage.value === 2) {
			middleOfPages = 0;
		}
		pages[middleOfPages] = currentPage.value;
		for (let i = middleOfPages - 1; i >= 0; i--) {
			pages[i] = pages[i + 1] - 1;
		}
		for (let i = middleOfPages + 1; i < pages.length; i++) {
			pages[i] = pages[i - 1] + 1;
		}
	}

	return pages;
});
function handlePrevPageClick() {
	if (props.disabled) {
		return;
	}
	let newCurrentPage = currentPage.value - 1;
	if (newCurrentPage < 1) {
		return;
	}
	currentPage.value = newCurrentPage;
}
function handlePageClick(v: number) {
	currentPage.value = v;
}
function handleNextPageClick() {
	if (props.disabled) {
		return;
	}
	let newCurrentPage = currentPage.value + 1;
	if (newCurrentPage > computedTotalPage.value) {
		return;
	}
	currentPage.value = newCurrentPage;
}
function handleFirstPageClick() {
	if (props.disabled) {
		return;
	}
	currentPage.value = 1;
}
function handleLastPageClick() {
	if (props.disabled) {
		return;
	}
	currentPage.value = computedTotalPage.value;
}
</script>
<style lang="scss">
@import './Pagination.scss';
</style>
