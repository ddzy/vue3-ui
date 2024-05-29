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
				<V3Icon type="ToTop" />
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
				<V3Icon type="ToBottom" />
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
import * as TYPES from '@typings/index';
import VARIABLE from '@common/constants/internal-variable';
import * as UTILS from '@common/utils/index';
import V3Icon from '@components/icon/main';

export default defineComponent({
	name: 'V3Back',
	components: {
		V3Icon,
	},
	props: {
		/** 页面滚动距离超过该值时显示去顶部按钮 */
		distance: {
			type: Number,
			default: 400,
		},
		/** 是否禁用（即不显示）“去顶部”按钮 */
		disableToTop: {
			type: Boolean,
			default: false,
		},
		/** 是否禁用（即不显示）“去底部”按钮 */
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
	setup(props: Required<TYPES.IBackProps>, context) {
		const state = reactive({
			showTop: false,
			showBottom: false,
			timer: 0,
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

			// 已到达顶部
			if (currentScrollTop <= 0) {
				window.cancelAnimationFrame(state.timer);
				target.scrollTop = 0;
				state.timer = 0;
				return;
			}

			UTILS.ease(currentScrollTop, 0, 8, (nextScrollTop) => {
				target.scrollTop = nextScrollTop;
				state.timer = window.requestAnimationFrame(toTopHelper);
			});
		}
		function toBottomHelper() {
			const target = getTarget();
			const {
				scrollTop: currentScrollTop,
				offsetHeight,
				scrollHeight,
			} = getValue();
			const targetM = scrollHeight - offsetHeight;

			// 已到达底部
			if (currentScrollTop >= targetM) {
				window.cancelAnimationFrame(state.timer);
				target.scrollTop = targetM;
				state.timer = 0;
				return;
			}

			UTILS.ease(currentScrollTop, targetM, 8, (nextScrollTop) => {
				target.scrollTop = nextScrollTop;
				state.timer = window.requestAnimationFrame(toBottomHelper);
			});
		}

		function handleScroll() {
			const { scrollTop, scrollHeight, offsetHeight } = getValue();

			state.showTop = scrollTop > props.distance;
			state.showBottom = scrollHeight - scrollTop !== offsetHeight;
		}
		function toTop() {
			if (state.timer) {
				return;
			}
			state.timer = window.requestAnimationFrame(toTopHelper);
		}
		function toBottom() {
			if (state.timer) {
				return;
			}
			state.timer = window.requestAnimationFrame(toBottomHelper);
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
<style lang="scss">
@import './Back.scss';
</style>
