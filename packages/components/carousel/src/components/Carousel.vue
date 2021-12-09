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
		<transition-group
			tag="div"
			class="v3-carousel__list"
			:name="
				state.isSlideFirstly
					? ''
					: props.effect === 'slide'
					? `v3-carousel-item-${props.effect}-${state.slideDirection}`
					: `v3-carousel-item-${props.effect}`
			"
			@after-leave="handleTransitionAfterLeave"
		>
			<slot name="default"></slot>
		</transition-group>

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
		<div class="v3-carousel__indicator"></div>
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
} from 'vue';
import { CAROUSEL_INSTANCE_PROVIDE } from '@common/constants/provide-symbol';

interface IState {
	carouselItemInstanceList: any[];
	showArrow: boolean;
	isCarouselTransitionEnd: boolean;
	slideDirection: 'prev' | 'next';
	isSlideFirstly: boolean;
}

export default defineComponent({
	name: 'V3Carousel',
	components: {},
	props: {
		modelValue: {
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
			type: Boolean,
			default: true,
		},
		/** 鼠标悬浮于轮播图区域上方时，是否停止自动切换 */
		pauseOnHover: {
			type: Boolean,
			default: true,
		},
		/** 同 CSS 属性 transition-duration */
		duration: {
			type: Number,
			default: 600,
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
			/** 当前页的轮播图是否切换结束 */
			isCarouselTransitionEnd: true,
			/** 切换方向 */
			slideDirection: 'next',
			/** 是否首次进行轮播（首次不需要动画效果） */
			isSlideFirstly: false,
		});
		const app = ref(getCurrentInstance()).value as ComponentInternalInstance;

		provide(CAROUSEL_INSTANCE_PROVIDE, app);

		watch(
			() => props.modelValue,
			() => {
				nextTick(() => {
					state.carouselItemInstanceList.forEach((v, i) => {
						v.state.isShow = i === props.modelValue;
					});
				});
			},
			{ immediate: true }
		);

		watch(
			() => props.modelValue,
			() => {
				state.isSlideFirstly = false;
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

		onMounted(() => {
			state.isSlideFirstly = true;
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
			// 必须等到上一次切换完成之后才能继续点击
			if (!state.isCarouselTransitionEnd) {
				return;
			}

			state.slideDirection = 'prev';

			const newModelValue =
				props.modelValue - 1 < 0
					? state.carouselItemInstanceList.length - 1
					: props.modelValue - 1;
			context.emit('update:modelValue', newModelValue);

			state.isCarouselTransitionEnd = false;
		}

		function slideNext() {
			// 必须等到上一次切换完成之后才能继续点击
			if (!state.isCarouselTransitionEnd) {
				return;
			}

			state.slideDirection = 'next';

			const newModelValue =
				props.modelValue + 1 > state.carouselItemInstanceList.length - 1
					? 0
					: props.modelValue + 1;
			context.emit('update:modelValue', newModelValue);

			state.isCarouselTransitionEnd = false;
		}

		function handleCarouselMouseEnter() {
			if (props.showArrow === 'hover') {
				state.showArrow = true;
			}
		}

		function handleCarouselMouseLeave() {
			if (props.showArrow === 'hover') {
				state.showArrow = false;
			}
		}

		function handleTransitionAfterLeave() {
			state.isCarouselTransitionEnd = true;
		}

		return {
			state,
			props,
			context,
			appendCarouselItemInstanceToList,
			slidePrev,
			slideNext,
			handleCarouselMouseEnter,
			handleCarouselMouseLeave,
			handleTransitionAfterLeave,
		};
	},
});
</script>
<style lang="scss" scoped>
@import './Carousel.scss';
</style>
