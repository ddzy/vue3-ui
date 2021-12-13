<template>
	<div
		class="v3-carousel"
		:class="{
			'is-empty': !state.carouselItemInstanceList.length,
			'is-autoplay': props.autoplay,
			'is-disabled': props.disabled,
			'is-show-indicator': props.showIndicator,
			[`is-effect-${props.effect}`]: true,
			[`is-${props.direction}`]: true,
			[`is-show-arrow-${props.showArrow}`]: true,
			[`is-indicator-${props.indicatorType}`]: true,
		}"
		:style="{
			width: props.width ? `${props.width}px` : '100%',
			height: props.height ? `${props.height}px` : '100%',
		}"
		@mouseenter="handleCarouselMouseEnter"
		@mouseleave="handleCarouselMouseLeave"
	>
		<!-- 轮播列表 -->
		<slot name="default"></slot>

		<!-- 左切换箭头 -->
		<div
			class="v3-carousel__arrow is-left"
			:class="{
				'is-show': state.showArrow,
			}"
			@click="slidePrev"
		>
			<slot name="arrowLeft" v-if="context.slots.arrowLeft"></slot>
			<div v-else class="v3-carousel-arrow__inner">
				<i class="v3-icon v3-icon-arrow-left"></i>
			</div>
		</div>

		<!-- 右切换箭头 -->
		<div
			class="v3-carousel__arrow is-right"
			:class="{
				'is-show': state.showArrow,
			}"
			@click="slideNext"
		>
			<slot name="arrowRight" v-if="context.slots.arrowRight"></slot>
			<div v-else class="v3-carousel-arrow__inner">
				<i class="v3-icon v3-icon-arrow-right"></i>
			</div>
		</div>

		<!-- 导航按钮 -->
		<div
			v-if="props.showIndicator"
			class="v3-carousel__indicator"
			@click="state.isSlideByOrder = false"
		>
			<slot v-if="context.slots.indicator" name="indicator"></slot>
			<ul v-else class="v3-carousel-indicator__list">
				<li
					v-for="(v, i) in state.carouselItemInstanceList"
					class="v3-carousel-indicator__item"
					:key="i"
					:class="{
						'is-active': state.activeIndex === i,
					}"
					@click="handleIndicatorItemClick(i)"
				></li>
			</ul>
		</div>
	</div>
</template>
<script lang="ts">
import * as TYPES from '@/public/types/carousel';
import {
	ComponentInternalInstance,
	computed,
	defineComponent,
	getCurrentInstance,
	PropType,
	provide,
	reactive,
	ref,
	watch,
	nextTick,
	onMounted,
	onBeforeUnmount,
} from 'vue';
import { CAROUSEL_INSTANCE_PROVIDE } from '@common/constants/provide-symbol';
import * as UTILS from '@common/utils/index';

interface IState {
	carouselItemInstanceList: any[];
	showArrow: boolean;
	slideDirection: 'prev' | 'next';
	isSlideFirstly: boolean;
	activeIndex: number;
	autoplayTimer: any;
	autoplay: {
		interval: number;
		pauseOnHover: boolean;
	};
	isSlideByOrder: boolean;
}

export default defineComponent({
	name: 'V3Carousel',
	components: {},
	props: {
		modelValue: {
			type: Number,
			default: -1,
		},
		/** 默认要展示的轮播图下标 */
		defaultIndex: {
			type: Number,
			default: 0,
		},
		/** 轮播图容器宽度 */
		width: {
			type: Number,
			default: 0,
		},
		/** 轮播图容器高度 */
		height: {
			type: Number,
			default: 0,
		},
		/** 轮播图形式 */
		effect: {
			type: String as PropType<TYPES.ICarouselEffect>,
			default: 'slide',
			validator(v: string) {
				return ['slide', 'fade'].includes(v);
			},
		},
		/** 是否自动播放 */
		autoplay: {
			type: [Boolean, Object] as PropType<TYPES.ICarouselAutoplay>,
			default: false,
		},
		/** 同 CSS 属性 transition-duration */
		duration: {
			type: Number,
			default: 300,
		},
		/** 同 CSS 属性 transition-timing-function */
		timingFunction: {
			type: String,
			default: 'cubic-bezier(0.17, 0.84, 0.44, 1)',
		},
		/** 是否禁用轮播图（不响应一切事件和切换动作） */
		disabled: {
			type: Boolean,
			default: false,
		},
		/** 轮播图的方向 */
		direction: {
			type: String as PropType<TYPES.ICarouselDirection>,
			default: 'horizontal',
			validator(v: string) {
				return ['horizontal', 'vertical'].includes(v);
			},
		},
		/** 是否显示切换箭头 */
		showArrow: {
			type: String as PropType<TYPES.ICarouselShowArrow>,
			default: 'always',
			validator(v: string) {
				return ['always', 'hover', 'never'].includes(v);
			},
		},
		/** 是否显示导航按钮 */
		showIndicator: {
			type: Boolean,
			default: true,
		},
		/** 导航按钮的类型 */
		indicatorType: {
			type: String as PropType<TYPES.ICarouselIndicatorType>,
			default: 'dot',
			validator(v: string) {
				return ['dot', 'line'].includes(v);
			},
		},
	},
	setup(props: TYPES.ICarouselProps, context) {
		const state: IState = reactive({
			/** 轮播项实例列表 */
			carouselItemInstanceList: [],
			/** 箭头是否显示 */
			showArrow: false,
			/** 切换方向（不同的切换方向会应用不同的动画） */
			slideDirection: 'next',
			/** 是否首次进行轮播（首次不需要动画效果） */
			isSlideFirstly: false,
			/** 当前的轮播图下标 */
			activeIndex: props.defaultIndex,
			autoplayTimer: 0,
			/** 自动轮播的配置 */
			autoplay: {
				interval: 2000,
				/** 鼠标悬停于轮播图容器内，是否停止播放 */
				pauseOnHover: true,
			},
			/** 是否按照顺序切换轮播（便于计算滑动的方向） */
			isSlideByOrder: false,
		});
		const app = ref(getCurrentInstance()).value as ComponentInternalInstance;

		provide(CAROUSEL_INSTANCE_PROVIDE, app);

		watch(
			() => props.modelValue,
			() => {
				state.activeIndex = props.modelValue;
			},
			{ immediate: false }
		);

		watch(
			() => props.showArrow,
			() => {
				if (props.showArrow === 'always') {
					state.showArrow = true;
				} else {
					state.showArrow = false;
				}
			},
			{ immediate: true }
		);

		watch(
			() => props.autoplay,
			() => {
				if (UTILS.isStrictObject(props.autoplay)) {
					state.autoplay = {
						...state.autoplay,
						...(props.autoplay as object),
					};
				}
			},
			{ deep: true, immediate: true }
		);

		watch(
			() => state.activeIndex,
			(newActiveIndex, oldActiveIndex) => {
				if (
					newActiveIndex === 0 &&
					oldActiveIndex === state.carouselItemInstanceList.length - 1
				) {
					state.slideDirection = state.isSlideByOrder ? 'next' : 'prev';
				} else if (
					newActiveIndex === state.carouselItemInstanceList.length - 1 &&
					oldActiveIndex === 0
				) {
					state.slideDirection = state.isSlideByOrder ? 'prev' : 'next';
				} else {
					state.slideDirection =
						newActiveIndex > oldActiveIndex ? 'next' : 'prev';
				}

				state.isSlideFirstly = false;

				nextTick(() => {
					slideTo(newActiveIndex);
				});
			},
			{ immediate: false }
		);

		onMounted(() => {
			state.isSlideFirstly = true;

			nextTick(() => {
				slideTo(state.activeIndex);
			});

			if (props.autoplay) {
				handleDocumentVisibilityChange();
				document.addEventListener(
					'visibilitychange',
					handleDocumentVisibilityChange
				);
			}
		});

		onBeforeUnmount(() => {
			props.autoplay &&
				document.removeEventListener(
					'visibilitychange',
					handleDocumentVisibilityChange
				);
		});

		/**
		 * 收集 V3CarouselItem 组件实例，统一管理
		 */
		function appendCarouselItemInstanceToList(instance: any) {
			state.carouselItemInstanceList = state.carouselItemInstanceList.concat(
				instance
			);
		}

		function slidePrev() {
			state.isSlideByOrder = true;

			const newActiveIndex =
				state.activeIndex - 1 < 0
					? state.carouselItemInstanceList.length - 1
					: state.activeIndex - 1;
			if (props.modelValue >= 0) {
				context.emit('update:modelValue', newActiveIndex);
			} else {
				state.activeIndex = newActiveIndex;
			}
		}

		function slideNext() {
			state.isSlideByOrder = true;

			const newActiveIndex =
				state.activeIndex + 1 > state.carouselItemInstanceList.length - 1
					? 0
					: state.activeIndex + 1;
			if (props.modelValue >= 0) {
				context.emit('update:modelValue', newActiveIndex);
			} else {
				state.activeIndex = newActiveIndex;
			}
		}

		function slideTo(index: number) {
			state.carouselItemInstanceList.forEach((v, i) => {
				v.state.isShow = i === index;
			});
		}

		function handleDocumentVisibilityChange() {
			// 只当页面为可见状态时才启动自动轮播
			if (!document.hidden) {
				state.autoplayTimer = window.setInterval(() => {
					slideNext();
				}, state.autoplay.interval);
			} else {
				window.clearInterval(state.autoplayTimer);
			}
		}

		function handleCarouselMouseEnter() {
			if (props.showArrow === 'hover') {
				state.showArrow = true;
			}

			if (props.autoplay && state.autoplay.pauseOnHover) {
				window.clearInterval(state.autoplayTimer);
			}
		}

		function handleCarouselMouseLeave() {
			if (props.showArrow === 'hover') {
				state.showArrow = false;
			}

			if (props.autoplay && state.autoplay.pauseOnHover) {
				handleDocumentVisibilityChange();
			}
		}

		function handleIndicatorItemClick(rowIndex: number) {
			if (props.modelValue >= 0) {
				context.emit('update:modelValue', rowIndex);
			} else {
				state.activeIndex = rowIndex;
			}
		}

		return {
			state,
			props,
			context,
			appendCarouselItemInstanceToList,
			slidePrev,
			slideNext,
			slideTo,
			handleCarouselMouseEnter,
			handleCarouselMouseLeave,
			handleIndicatorItemClick,
		};
	},
});
</script>
<style lang="scss" scoped>
@import './Carousel.scss';
</style>
