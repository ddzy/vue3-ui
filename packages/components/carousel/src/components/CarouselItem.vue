<template>
	<transition
		:name="
			state.injectedCarouselInstance.effect === 'slide'
				? `v3-carousel-item-${state.injectedCarouselInstance.direction}-${state.injectedCarouselInstance.effect}-${state.injectedCarouselInstance.state.slideDirection}`
				: `v3-carousel-item-${state.injectedCarouselInstance.effect}`
		"
	>
		<div
			v-show="state.isShow"
			class="v3-carousel__item"
			:style="{
				width: `${state.width}px`,
				transitionDuration: `${
					state.injectedCarouselInstance.state.isSlideFirstly
						? 0
						: state.injectedCarouselInstance.duration
				}ms`,
				transitionTimingFunction: `${state.injectedCarouselInstance.timingFunction}`,
			}"
		>
			<slot></slot>
		</div>
	</transition>
</template>
<script lang="ts">
import {
	ComponentInternalInstance,
	defineComponent,
	getCurrentInstance,
	inject,
	onMounted,
	reactive,
	ref,
} from 'vue';
import { CAROUSEL_INSTANCE_PROVIDE } from '@common/constants/provide-symbol';

interface IState {
	width: number;
	injectedCarouselInstance: any;
	isShow: boolean;
}

export default defineComponent({
	name: 'V3CarouselItem',
	components: {},
	props: {},
	setup(props, context) {
		const state: IState = reactive({
			width: 0,
			/** V3Carousel 实例 */
			injectedCarouselInstance: {},
			/** 当前轮播项的显隐（由 V3Carousel 组件控制） */
			isShow: false,
		});
		const app = ref(getCurrentInstance()).value;
		const isCarouselExist = checkIsCarouselExist();

		if (isCarouselExist) {
			const internalCarouselInstance = inject(
				CAROUSEL_INSTANCE_PROVIDE
			) as ComponentInternalInstance | null;
			state.injectedCarouselInstance = internalCarouselInstance
				? internalCarouselInstance.proxy
				: {};
		}

		onMounted(() => {
			if (isCarouselExist && app) {
				// 计算父组件（V3Carousel）的容器宽度
				const parentEl = state.injectedCarouselInstance.$el as HTMLElement;
				state.width = parentEl.getBoundingClientRect().width;
				// 将当前组件实例存储到 V3Carousel 组件中统一管理
				state.injectedCarouselInstance.appendCarouselItemInstanceToList(
					app.proxy
				);
			}
		});

		/**
		 * 检查当前轮播项的父级是否存在轮播组件
		 */
		function checkIsCarouselExist() {
			if (!app) {
				return false;
			}

			let parent = app.parent;
			let result = false;

			while (parent) {
				if (parent.type.name === 'V3Carousel') {
					result = true;
					break;
				}
				parent = parent.parent;
			}

			return result;
		}

		return {
			state,
			props,
			context,
		};
	},
});
</script>
<style lang="scss" scoped>
@import './CarouselItem.scss';
</style>
