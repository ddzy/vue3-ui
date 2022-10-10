<template>
	<div ref="wrapperRef" class="v3-demo-block">
		<div
			class="v3-demo-block__view v3-demo-block__common"
			v-if="app.slots.default"
		>
			<slot></slot>
		</div>
		<div
			class="v3-demo-block__description v3-demo-block__common"
			v-if="app.slots.description"
		>
			<div class="description__tip" v-if="props.descriptionTip">
				{{ props.descriptionTip }}
			</div>
			<div class="description__detail">
				<slot name="description"></slot>
			</div>
		</div>
		<transition
			v-if="app.slots.code"
			@enter="handleCodeTransitionEnter"
			@leave="handleCodeTransitionLeave"
			@after-enter="handleCodeTransitionAfterEnter"
			@after-leave="handleCodeTransitionAfterLeave"
			@before-leave="handleCodeTransitionBeforeLeave"
		>
			<div
				v-show="state.isCodeAreaExpand"
				ref="codeWrapperRef"
				class="v3-demo-block__code v3-demo-block__common"
			>
				<slot name="code"></slot>
			</div>
		</transition>
		<div
			ref="functionalWrapperRef"
			class="v3-demo-block__functional v3-demo-block__common"
			:class="{
				'is-fixed': state.isFunctionalAreaFixed,
			}"
			:style="state.functionalAreaStyle"
			@click="toggleCodeArea"
		>
			<div class="functional__expand">
				<span>{{
					state.isCodeAreaExpand ? props.expandedBtnText : props.defaultBtnText
				}}</span>
			</div>
			<div class="functional__extra">
				<div
					class="functional-extra__item"
					v-for="v in props.extraList"
					:key="v.icon"
					@click.stop="handleExtraItemClick(v)"
				>
					<i
						:class="{
							'v3-icon': true,
							[v.icon]: true,
						}"
						:title="v.title"
					></i>
				</div>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
import {
	CSSProperties,
	defineComponent,
	getCurrentInstance,
	onBeforeUnmount,
	onMounted,
	PropType,
	reactive,
	ref,
	inject,
	watch,
	nextTick,
} from 'vue';

import * as TYPES from '@/public/types/demo-block';
import * as UTILS from '@common/utils/index';

interface IState {
	isCodeAreaExpand: boolean;
	windowScrollHelper: any;
	windowResizeHelper: any;
	isFunctionalAreaFixed: boolean;
	functionalAreaStyle: Partial<CSSProperties>;
}

export default defineComponent({
	name: 'V3DemoBlock',
	props: {
		/** 描述区域的提示*/
		descriptionTip: {
			type: String,
			default: '',
		},
		/** 功能按钮列表 */
		extraList: {
			type: Array as PropType<TYPES.IDemoBlockExtraItem[]>,
			default: [],
		},
		/** 详情区域展开时的按钮文本 */
		expandedBtnText: {
			type: String,
			default: '点击收缩',
		},
		/** 详情区域收缩时的按钮文本 */
		defaultBtnText: {
			type: String,
			default: '点击展开',
		},
	},
	emits: ['extraClick'],
	setup(props: TYPES.IDemoBlockProps, context) {
		const state: IState = reactive({
			/** 详情区域是否展开 */
			isCodeAreaExpand: false,
			windowScrollHelper: null,
			windowResizeHelper: null,
			/** 功能区域是否固定 */
			isFunctionalAreaFixed: false,
			/** 功能区域的样式 */
			functionalAreaStyle: {},
		});
		const app = getCurrentInstance();
		const wrapperRef = ref(document.createElement('div'));
		const functionalWrapperRef = ref(document.createElement('div'));
		const codeWrapperRef = ref(document.createElement('div'));

		const homeState: any = inject('HOME_STATE') || {};

		watch(
			() => homeState.isNavUnfold,
			() => {
				// 当切换文档右侧导航栏时，也要重新计算功能区域的样式
				setTimeout(() => {
					computeFunctionalAreaStyle();
				}, Number.parseInt(homeState.navTransitionTime));
			},
			{ immediate: false }
		);

		onMounted(() => {
			handleWindowResize();

			state.windowScrollHelper = UTILS.throttle(handleWindowScroll, {
				timestamp: 20,
			});
			window.addEventListener('scroll', state.windowScrollHelper);

			state.windowResizeHelper = UTILS.throttle(handleWindowResize, {
				timestamp: 20,
			});
			window.addEventListener('resize', state.windowResizeHelper);
		});

		onBeforeUnmount(() => {
			window.removeEventListener('scroll', state.windowScrollHelper);
			window.removeEventListener('resize', state.windowResizeHelper);
		});

		function computeFunctionalAreaStyle() {
			const { width, left } = wrapperRef.value.getBoundingClientRect();

			state.functionalAreaStyle = {
				width: `${width}px`,
				left: `${left}px`,
			};
		}

		/**
		 * 展开 or 收缩内容区域
		 */
		function toggleCodeArea() {
			state.isCodeAreaExpand = !state.isCodeAreaExpand;
		}

		/**
		 * 判断功能区域是否需要固定在底部
		 */
		function checkIsFunctionalAreaFixed() {
			const docEl = document.documentElement;
			const docHeight = docEl.clientHeight;
			const codeWrapperEl = codeWrapperRef.value;
			const codeWrapperRect = codeWrapperEl.getBoundingClientRect();
			const functionalWrapperEl = functionalWrapperRef.value;
			const functionalWrapperRect = functionalWrapperEl.getBoundingClientRect();

			// 限制上边界
			const limitTop = codeWrapperRect.bottom - docHeight;
			// 限制下边界
			const limitBottom = docHeight - codeWrapperRect.top;
			// 根据代码详情区域与页面可视区域的垂直方向上的距离，来判断是否需要固定
			if (limitTop >= 0 && limitBottom >= functionalWrapperRect.height) {
				state.isFunctionalAreaFixed = true;
			} else {
				state.isFunctionalAreaFixed = false;
			}
		}

		function handleWindowScroll() {
			checkIsFunctionalAreaFixed();
		}

		function handleWindowResize() {
			computeFunctionalAreaStyle();
		}

		function handleExtraItemClick(v: TYPES.IDemoBlockExtraItem) {
			context.emit('extraClick', v);
		}

		function handleCodeTransitionEnter(el: HTMLElement) {
			UTILS.handleTransitionEnter(el);
		}

		function handleCodeTransitionLeave(el: HTMLElement) {
			UTILS.handleTransitionLeave(el);
		}

		function handleCodeTransitionAfterEnter() {
			computeFunctionalAreaStyle();
			nextTick(() => {
				checkIsFunctionalAreaFixed();
			});
		}

		function handleCodeTransitionAfterLeave() {
			computeFunctionalAreaStyle();
			nextTick(() => {
				checkIsFunctionalAreaFixed();
			});
		}

		function handleCodeTransitionBeforeLeave() {
			state.isFunctionalAreaFixed = false;
		}

		return {
			app,
			state,
			props,
			wrapperRef,
			functionalWrapperRef,
			codeWrapperRef,
			toggleCodeArea,
			handleExtraItemClick,
			handleCodeTransitionEnter,
			handleCodeTransitionLeave,
			handleCodeTransitionAfterEnter,
			handleCodeTransitionAfterLeave,
			handleCodeTransitionBeforeLeave,
		};
	},
});
</script>
<style lang="scss" scoped>
@import './DemoBlock.scss';
</style>
