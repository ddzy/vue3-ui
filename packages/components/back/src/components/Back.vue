<template>
	<div
		v-if="!props.disableToTop || !props.disableToBottom"
		class="v3-back"
		:class="{
			'is-global': computedIsGlobal,
		}"
		:style="{
			zIndex: VARIABLE.getNextZIndex(),
		}"
	>
		<div
			v-if="!props.disableToTop && state.showTop"
			class="v3-back__top"
			@click="toTop"
		>
			<div v-if="!context.slots.top" class="v3-back-top__inner" title="去顶部">
				<i class="v3-icon v3-icon-arrow-up"></i>
			</div>
			<slot v-else name="top"></slot>
		</div>

		<div
			v-if="!props.disableToBottom && state.showBottom"
			class="v3-back__bottom"
			@click="toBottom"
		>
			<div
				v-if="!context.slots.bottom"
				class="v3-back-bottom__inner"
				title="去底部"
			>
				<i class="v3-icon v3-icon-arrow-down"></i>
			</div>
			<slot v-else name="bottom"></slot>
		</div>
	</div>
</template>
<script lang="ts">
import {
	computed,
	defineComponent,
	getCurrentInstance,
	nextTick,
	onBeforeUnmount,
	onMounted,
	PropType,
	reactive,
	ref,
	toRef,
	watch,
} from 'vue';
import * as TYPES from '@/public/types/back';
import VARIABLE from '@common/constants/internal-variable';
import * as UTILS from '@common/utils/index';

export default defineComponent({
	name: 'V3Back',
	props: {
		/** 页面滚动距离超过该值时显示去顶部按钮 */
		distance: {
			type: Number,
			default: 400,
		},
		/** 是否显示“去顶部”按钮 */
		disableToTop: {
			type: Boolean,
			default: false,
		},
		/** 是否显示去底部按钮 */
		disableToBottom: {
			type: Boolean,
			default: false,
		},
		/** 滚动容器 */
		target: {
			type: Object as PropType<TYPES.IBackTarget>,
			default: window,
			validator(v: any) {
				return v instanceof Window || v instanceof HTMLElement;
			},
		},
	},
	setup(props: TYPES.IBackProps, context) {
		const state = reactive({
			showTop: false,
			showBottom: false,
			toTopTimer: 0,
			toBottomTimer: 0,
			step: 20,
		});
		const app = ref(getCurrentInstance()).value;

		const computedIsGlobal = computed(() => {
			return props.target instanceof Window;
		});
		const _scrollHelper = UTILS.throttle(handleScroll, {
			timestamp: 0,
		});

		onMounted(() => {
			setTimeout(() => {
				handleScroll();
				props.target.addEventListener('scroll', _scrollHelper);
			}, 0);
		});
		onBeforeUnmount(() => {
			props.target.removeEventListener('scroll', _scrollHelper);
		});

		function getValue() {
			const target = getTarget();
			let scrollTop = target.scrollTop;
			let scrollHeight = target.scrollHeight;
			let offsetHeight = target.offsetHeight;
			let clientHeight = target.clientHeight;

			return {
				scrollTop,
				scrollHeight,
				offsetHeight,
				clientHeight,
			};
		}
		function getTarget(): HTMLElement {
			return computedIsGlobal.value
				? document.body || document.documentElement
				: (props.target as HTMLElement);
		}
		function toTopHelper() {
			const target = getTarget();
			const { scrollTop: currentScrollTop } = getValue();
			let nextScrollTop = currentScrollTop + (0 - currentScrollTop) / 8;

			if (nextScrollTop <= 0) {
				target.scrollTop = 0;
				window.cancelAnimationFrame(state.toTopTimer);
				state.toTopTimer = 0;
			} else {
				target.scrollTop = nextScrollTop;
				window.requestAnimationFrame(toTopHelper);
			}
		}
		function toBottomHelper() {
			const target = getTarget();
			const {
				scrollTop: currentScrollTop,
				offsetHeight,
				scrollHeight,
			} = getValue();
			let nextScrollTop =
				currentScrollTop + (scrollHeight - currentScrollTop) / 8;

			if (nextScrollTop + offsetHeight >= scrollHeight) {
				target.scrollTop = scrollHeight - offsetHeight;
				window.cancelAnimationFrame(state.toBottomTimer);
				state.toBottomTimer = 0;
			} else {
				target.scrollTop = nextScrollTop;
				window.requestAnimationFrame(toBottomHelper);
			}
		}

		function handleScroll() {
			const { scrollTop, scrollHeight, clientHeight } = getValue();

			state.showTop = scrollTop > props.distance;
			state.showBottom = scrollHeight - scrollTop !== clientHeight;
		}
		function toTop() {
			if (state.toBottomTimer) {
				window.cancelAnimationFrame(state.toBottomTimer);
				state.toBottomTimer = 0;
			}
			if (state.toTopTimer) {
				return;
			}
			state.toTopTimer = window.requestAnimationFrame(toTopHelper);
		}
		function toBottom() {
			if (state.toTopTimer) {
				window.cancelAnimationFrame(state.toTopTimer);
				state.toTopTimer = 0;
			}
			if (state.toBottomTimer) {
				return;
			}
			state.toBottomTimer = window.requestAnimationFrame(toBottomHelper);
		}

		return {
			props,
			state,
			context,
			app,
			VARIABLE,
			computedIsGlobal,
			toTop,
			toBottom,
		};
	},
});
</script>
<style lang="scss" scoped>
@import './Back.scss';
</style>
