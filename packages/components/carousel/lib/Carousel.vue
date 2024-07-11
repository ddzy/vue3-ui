<template>
	<div
		:class="{
			'v3-carousel': true,
			'is-empty': !carouselItems.length,
			'is-autoplay': props.autoplay,
			'is-disabled': props.disabled,
			'is-show-indicator': props.showIndicator,
			[`is-effect-${props.effect}`]: true,
			[`is-${props.direction}`]: true,
			[`is-show-arrow-${props.showArrow}`]: true,
			[`is-indicator-type-${props.indicatorType}`]: true,
			[`is-indicator-position-${props.indicatorPosition}`]: true,
		}"
		:style="{
			width: props.width,
			height: props.height,
		}"
		@mouseenter="handleCarouselMouseEnter"
		@mouseleave="handleCarouselMouseLeave"
	>
		<!-- 轮播列表 -->
		<slot></slot>

		<!-- 左切换箭头 -->
		<div
			:class="{
				'v3-carousel__arrow': true,
				'is-left': true,
				'is-show': showArrow,
			}"
			@click="slidePrev"
		>
			<slot name="arrowLeft" v-if="slots.arrowLeft"></slot>
			<div v-else class="v3-carousel-arrow__inner">
				<V3Icon type="Left" />
			</div>
		</div>

		<!-- 右切换箭头 -->
		<div
			:class="{
				'v3-carousel__arrow is-right': true,
				'is-right': true,
				'is-show': showArrow,
			}"
			@click="slideNext"
		>
			<slot name="arrowRight" v-if="slots.arrowRight"></slot>
			<div v-else class="v3-carousel-arrow__inner">
				<V3Icon type="Right" />
			</div>
		</div>

		<!-- 导航按钮 -->
		<div v-if="props.showIndicator" class="v3-carousel__indicator">
			<slot v-if="slots.indicator" name="indicator"></slot>
			<ul v-else class="v3-carousel-indicator__list">
				<li
					v-for="(v, i) in carouselItems"
					:key="i"
					:class="{
						'v3-carousel-indicator__item': true,
						'is-active': model === i,
						'is-disabled': props.disabled,
					}"
					@click="handleIndicatorItemClick(i)"
					@mouseenter="handleIndicatorItemMouseEnter(i)"
				></li>
			</ul>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { computed, nextTick, provide, ref, useSlots, watch } from 'vue';

import { CAROUSEL_PROVIDE } from '@common/constants/provide-symbol';
import { isStrictObject } from '@common/utils';
import V3Icon from '@components/icon/main';
import useEventListener from '@hooks/useEventListener';

import {
	ICarouselItemProvide,
	ICarouselProps,
	ICarouselProvide,
} from '@/public/typings';

defineOptions({
	name: 'V3Carousel',
});

const props = withDefaults(defineProps<ICarouselProps>(), {
	/** 轮播图容器宽度 */
	width: '100%',
	/** 轮播图容器高度 */
	height: '100%',
	/** 轮播图动画形式 */
	effect: 'slide',
	/** 是否自动播放 */
	autoplay: false,
	/** 同 CSS 属性 transition-duration */
	duration: 300,
	/** 同 CSS 属性 transition-timing-function */
	timingFunction: 'ease',
	/** 是否禁用轮播图（不响应一切事件和切换动作） */
	disabled: false,
	/** 轮播图的方向 */
	direction: 'horizontal',
	/** 是否显示切换箭头 */
	showArrow: 'always',
	/** 是否显示导航按钮 */
	showIndicator: true,
	/** 导航按钮的类型 */
	indicatorType: 'dot',
	/** 导航按钮的位置 */
	indicatorPosition: 'bottom',
});
const slots = useSlots();

// 存储所有 CarouselItem，统一调度
const carouselItems = ref<ICarouselItemProvide[]>([]);
function addCarouselItem(row: ICarouselItemProvide) {
	carouselItems.value.push(row);
}

const model = defineModel({
	default: 0,
});
watch(
	model,
	async (newValue) => {
		await nextTick();
		carouselItems.value.forEach((v, i) => {
			v.updateActive(i === newValue);
		});
	},
	{ immediate: true },
);

// 是否显示箭头
const showArrow = ref(false);
watch(
	() => props.showArrow,
	(newValue) => {
		if (newValue === 'always') {
			showArrow.value = true;
		}
	},
	{ immediate: true },
);

// 自动轮播
const computedAutoPlay = computed(() => {
	const autoplayOptions = {
		interval: 3000,
		pauseOnHover: true,
	};
	return props.autoplay === false
		? false
		: props.autoplay === true
			? autoplayOptions
			: isStrictObject(props.autoplay)
				? {
						...autoplayOptions,
						...props.autoplay,
					}
				: autoplayOptions;
});
const autoplayTimer = ref(0);
function startAutoplay() {
	if (computedAutoPlay.value) {
		autoplayTimer.value = window.setInterval(() => {
			slideNext();
		}, computedAutoPlay.value.interval);
	}
}
function endAutoplay() {
	window.clearInterval(autoplayTimer.value);
}
watch(
	computedAutoPlay,
	(newValue) => {
		if (!props.disabled && newValue) {
			startAutoplay();
			useEventListener(document, 'visibilitychange', () => {
				// 只当页面可见时才启动自动轮播
				if (!document.hidden) {
					startAutoplay();
				} else {
					endAutoplay();
				}
			});
		}
	},
	{ immediate: true },
);

// 轮播滚动方向
const slideDirection = ref<'next' | 'prev'>('next');
watch(model, (newValue, oldValue) => {
	if (newValue === 0 && oldValue === carouselItems.value.length - 1) {
		slideDirection.value = 'next';
	} else if (newValue === carouselItems.value.length - 1 && oldValue === 0) {
		slideDirection.value = 'prev';
	} else {
		slideDirection.value = newValue - oldValue < 0 ? 'prev' : 'next';
	}
});

function handleCarouselMouseEnter() {
	if (props.disabled) {
		return;
	}
	if (props.showArrow === 'hover') {
		showArrow.value = true;
	}
	if (computedAutoPlay.value && computedAutoPlay.value.pauseOnHover) {
		endAutoplay();
	}
}

function handleCarouselMouseLeave() {
	if (props.disabled) {
		return;
	}
	if (props.showArrow === 'hover') {
		showArrow.value = false;
	}
	if (computedAutoPlay.value && computedAutoPlay.value.pauseOnHover) {
		startAutoplay();
	}
}

function handleIndicatorItemClick(rowIndex: number) {
	if (props.disabled) {
		return;
	}
	model.value = rowIndex;
}

function handleIndicatorItemMouseEnter(rowIndex: number) {
	if (props.disabled) {
		return;
	}
	model.value = rowIndex;
}

function slideNext() {
	if (props.disabled) {
		return;
	}
	const newModelValue =
		model.value + 1 > carouselItems.value.length - 1 ? 0 : model.value + 1;
	model.value = newModelValue;
}

function slidePrev() {
	if (props.disabled) {
		return;
	}
	const newModelValue =
		model.value - 1 < 0 ? carouselItems.value.length - 1 : model.value - 1;
	model.value = newModelValue;
}

provide<ICarouselProvide>(CAROUSEL_PROVIDE, {
	props,
	slideDirection,
	addCarouselItem,
});
</script>
<style lang="scss">
@import './Carousel.scss';
</style>
