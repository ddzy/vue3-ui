<template>
	<div
		:class="{
			'v3-popover': true,
			'is-visible': state.showDropdown,
			'is-disabled': props.disabled,
		}"
	>
		<tippy
			:hideOnClick="props.trigger !== 'mouseenter'"
			:trigger="props.trigger"
			:theme="props.theme === 'dark' ? 'material' : 'light'"
			:animation="props.animation"
			:placement="props.placement"
			:zIndex="state.nextZIndex"
			:arrow="false"
			:interactive="true"
			:allowHTML="true"
			:delay="props.delay"
			:offset="props.offset"
			:onShow="handleShow"
			:onHide="handleHide"
			:onMount="handleMount"
		>
			<div class="v3-popover__trigger">
				<slot></slot>
			</div>
			<template #content>
				<div class="v3-popover__dropdown">
					<div class="v3-popover-dropdown__title" v-if="props.title">
						<h3>{{ props.title }}</h3>
					</div>
					<div class="v3-popover-dropdown__content">
						<slot v-if="context.slots.content" name="content"></slot>
						<template v-else>
							{{ props.content }}
						</template>
					</div>
				</div>
			</template>
		</tippy>
	</div>
</template>
<script lang="ts">
import {
	defineComponent,
	getCurrentInstance,
	PropType,
	reactive,
	ref,
} from 'vue';
import * as TYPES from '@/public/types/popover';
import VARIABLE from '@common/constants/internal-variable';
import { Tippy, TippyInstance } from 'vue-tippy';
import 'tippy.js/themes/light.css';
import 'tippy.js/themes/material.css';

type ILocalTippyInstance =
	| (TippyInstance & {
			hide: () => void;
			show: () => void;
			unmount: () => void;
			mount: () => void;
	  })
	| null;
interface IState {
	nextZIndex: number;
	showDropdown: boolean;
	tippy: ILocalTippyInstance;
}

export default defineComponent({
	name: 'V3Popover',
	components: {
		Tippy,
	},
	props: {
		/** 主题色（黑/白） */
		theme: {
			type: String as PropType<TYPES.IPopoverTheme>,
			default: 'dark',
			validator(v: string) {
				return ['dark', 'light'].includes(v);
			},
		},
		/** popover 内容，也可以通过 slot="content" 传入 */
		content: {
			type: String,
			default: '',
		},
		title: {
			type: String,
			default: '',
		},
		/** 弹出位置 */
		placement: {
			type: String as PropType<TYPES.IPopoverPlacement>,
			default: 'auto',
			validator(v: string) {
				return [
					'top',
					'top-start',
					'top-end',
					'right',
					'right-start',
					'right-end',
					'bottom',
					'bottom-start',
					'bottom-end',
					'left',
					'left-start',
					'left-end',
					'auto',
					'auto-start',
					'auto-end',
				].includes(v);
			},
		},
		/** 是否禁用 */
		disabled: {
			type: Boolean,
			default: false,
		},
		/** 距离触发器的距离 */
		offset: {
			type: Object as PropType<TYPES.IPopoverOffset>,
			default: [0, 5],
		},
		/** 自定义弹出的动画 */
		animation: {
			type: String,
			default: 'v3-popover-slide-fade',
		},
		/** 显示/隐藏的延迟 */
		delay: {
			type: Object as PropType<TYPES.IPopoverDelay>,
			default: [0, 0],
		},
		/** 触发的方式 */
		trigger: {
			type: String,
			default: 'mouseenter',
		},
	},
	setup(props: TYPES.IPopoverProps, context) {
		const state: IState = reactive({
			/** popover 的 z-index（统一管理） */
			nextZIndex: VARIABLE.getNextZIndex(),
			/** popover 的显隐状态 */
			showDropdown: false,
			/** tippy 实例 */
			tippy: null,
		});
		const app = ref(getCurrentInstance()).value;

		function handleShow() {
			// 如果当前下拉框为禁用状态，那么下拉菜单不需要显示
			const showDropdown = !props.disabled;
			state.showDropdown = showDropdown;

			if (!showDropdown) {
				return showDropdown;
			}
		}

		function handleHide() {
			state.showDropdown = false;
		}

		function handleMount(instance: ILocalTippyInstance) {
			state.tippy = instance;
		}

		return {
			state,
			app,
			props,
			context,
			handleShow,
			handleHide,
			handleMount,
		};
	},
});
</script>
<style lang="scss">
@import '@common/styles/global-animation.scss';
</style>
<style lang="scss" scoped>
@import './Popover.scss';
</style>
