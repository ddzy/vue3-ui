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
					v-if="computedShowFastBtn"
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
					v-if="computedShowFastBtn"
					class="v3-pagination__pages-fast-backward"
					@mouseenter="isHoverFastBackward = true"
					@mouseleave="isHoverFastBackward = false"
					@click="handleFastBackwardClick"
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
					v-if="computedShowFastBtn"
					class="v3-pagination__pages-fast-forward"
					@mouseenter="isHoverFastForward = true"
					@mouseleave="isHoverFastForward = false"
					@click="handleFastForwardClick"
				>
					<V3Icon v-if="!isHoverFastForward" :type="'More'" />
					<V3Icon v-else :type="'DoubleRight'" />
				</div>
				<div
					v-if="computedShowFastBtn"
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
import { usePrevious } from '@vueuse/core';
import { isNil, isNumber, sortBy } from 'lodash-es';

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
 * 上次选中第几页
 */
const prevPage = usePrevious<number>(currentPage);
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
 * 页码区域需要固定展示4个按钮：首页页码、左快进、右快进、尾页页码
 */
const computedShowFastBtn = computed(() => {
	return props.displayPageCount - 4 > 0;
});
const pageStep = ref(1);
/**
 * 当前展示的所有页码
 */
const computedCurrentPages = computed<number[]>((oldPages) => {
	// 页码可展示的个数
	let availablePageCount = 0;
	if (computedShowFastBtn.value) {
		availablePageCount = props.displayPageCount - 4;
	} else {
		availablePageCount = props.displayPageCount;
	}
	let pages = new Array(
		Math.min(availablePageCount, computedTotalPage.value - 2),
	).fill(null);

	if (!pages.length) {
		return pages;
	}

	// 如果当前选中最大页码
	if (currentPage.value === computedTotalPage.value) {
		if (computedShowFastBtn.value) {
			pages = pages.map((v, i) => {
				return computedTotalPage.value - pages.length + i;
			});
		} else {
			pages = pages.map((v, i) => {
				return computedTotalPage.value + 1 - pages.length + i;
			});
		}
	} else if (currentPage.value === 1) {
		// 当前选中最小页码
		if (computedShowFastBtn.value) {
			pages = pages.map((v, i) => {
				return i + 2;
			});
		} else {
			pages = pages.map((v, i) => {
				return i + 1;
			});
		}
	} else {
		// 选中其他页码
		// 页码列表最小值
		let minPage = computedShowFastBtn.value ? 2 : 1;
		// 页码列表最大值
		let maxPage = computedShowFastBtn.value
			? computedTotalPage.value - 1
			: computedTotalPage.value;
		// 选中的页码始终保持在最中间
		let middleIndex = Math.floor(pages.length / 2);
		pages[middleIndex] = currentPage.value;
		for (let i = middleIndex + 1; i < pages.length; i++) {
			// 从中间的页码往上递增，如果页码超过最大值，则用最小页码递减来填充
			let _maxPage = Math.max(...pages.filter((v) => !isNil(v)));
			let _page = _maxPage + 1;
			if (_page > maxPage) {
				let _minPage = Math.min(...pages.filter((v) => !isNil(v)));
				_page = _minPage - 1;
			}
			pages[i] = _page;
		}
		for (let i = middleIndex - 1; i >= 0; i--) {
			// 从中间的页码往下递减，如果页码小于最小值，则用最大页码递增来填充
			let _minPage = Math.min(...pages.filter((v) => !isNil(v)));
			let _page = _minPage - 1;
			if (_page < minPage) {
				let _maxPage = Math.max(...pages.filter((v) => !isNil(v)));
				_page = _maxPage + 1;
			}
			pages[i] = _page;
		}
	}
	// 由于页码填充，所以需要重新排序
	pages = sortBy(pages).filter((v) => !isNil(v));

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
	pageStep.value = 1;
	currentPage.value = newCurrentPage;
}
function handlePageClick(v: number) {
	if (props.disabled) {
		return;
	}
	pageStep.value = 1;
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
	pageStep.value = 1;
	currentPage.value = newCurrentPage;
}
function handleFirstPageClick() {
	if (props.disabled) {
		return;
	}
	pageStep.value = 1;
	currentPage.value = 1;
}
function handleLastPageClick() {
	if (props.disabled) {
		return;
	}
	pageStep.value = 1;
	currentPage.value = computedTotalPage.value;
}
function handleFastBackwardClick() {
	if (props.disabled) {
		return;
	}
	// 页码列表最小值
	let minPage = computedShowFastBtn.value ? 2 : 1;
	// 当前页码列表的最小值
	let currentMinPage = computedCurrentPages.value[0];
	let newPageStep = 0;
	if (currentMinPage === minPage) {
		newPageStep = 0;
	} else if (currentPage.value === computedTotalPage.value) {
		// 如果当前选中最大页码，那么需要多回退1个页码
		newPageStep =
			currentMinPage - (computedCurrentPages.value.length + 1) < minPage
				? currentMinPage - minPage
				: computedCurrentPages.value.length + 1;
	} else {
		newPageStep =
			currentMinPage - computedCurrentPages.value.length < minPage
				? currentMinPage - minPage
				: computedCurrentPages.value.length;
	}
	let newCurrentPage = currentPage.value - newPageStep;
	pageStep.value = newPageStep;
	currentPage.value = newCurrentPage;
}
function handleFastForwardClick() {
	if (props.disabled) {
		return;
	}
	// 页码列表最大值
	let maxPage = computedShowFastBtn.value
		? computedTotalPage.value - 1
		: computedTotalPage.value;
	// 当前页码列表的最大值
	let currentMaxPage =
		computedCurrentPages.value[computedCurrentPages.value.length - 1];
	let newPageStep = 0;
	if (currentMaxPage === maxPage) {
		newPageStep = 0;
	} else if (currentPage.value === 1) {
		// 如果当前选中最小页码，那么需要多前进1个页码
		newPageStep =
			currentMaxPage + (computedCurrentPages.value.length + 1) > maxPage
				? maxPage - currentMaxPage
				: computedCurrentPages.value.length + 1;
	} else {
		newPageStep =
			currentMaxPage + computedCurrentPages.value.length > maxPage
				? maxPage - currentMaxPage
				: computedCurrentPages.value.length;
	}
	let newCurrentPage = currentPage.value + newPageStep;
	pageStep.value = newPageStep;
	currentPage.value = newCurrentPage;
}
</script>
<style lang="scss">
@import './Pagination.scss';
</style>
