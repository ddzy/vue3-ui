<template>
	<div
		class="v3-carousel"
		:class="{
			'is-empty': !computedChildrenLength,
			'is-autoplay': props.autoplay,
			'is-disabled': props.disabled,
			'is-show-indicator': props.showIndicator,
			[`is-effect-${props.effect}`]: true,
			[`is-${props.direction}`]: true,
			[`is-show-arrow-${props.showArrow}`]: true,
			[`is-indicator-${props.indicatorType}`]: true,
		}"
	>
		<slot></slot>
	</div>
</template>
<script lang="ts">
import * as TYPES from '@/public/types/carousel';
import { computed, defineComponent, PropType, reactive, watch } from 'vue';

interface IState {}

export default defineComponent({
	name: 'V3Carousel',
	components: {},
	props: {
		modelValue: {
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
		const state: IState = reactive({});

		/**
		 * 计算 slot 的长度（即判断内容是否为空）
		 */
		const computedChildrenLength = computed<number>(() => {
			const defaultSlot: Function | undefined = context.slots.default;
			if (typeof defaultSlot !== 'function') {
				return 0;
			}

			const defaultChildren = defaultSlot();
			// 通过 v-for 遍历的组件，如果没有匹配到，那么 slot 也会存在
			if (
				defaultChildren.length === 1 &&
				defaultChildren[0] &&
				Array.isArray(defaultChildren[0].children) &&
				!defaultChildren[0].children.length
			) {
				return 0;
			}

			return defaultChildren.length;
		});

		return {
			state,
			props,
			context,
			computedChildrenLength,
		};
	},
});
</script>
<style lang="scss" scoped>
@import './Carousel.scss';
</style>
