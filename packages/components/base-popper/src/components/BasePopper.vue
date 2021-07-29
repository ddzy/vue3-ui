<template>
	<div
		:class="{
			'v3-base-popper': true,
			'is-visible': state.showDropdown,
			'is-disabled': props.disabled,
			[`is-theme-${props.theme}`]: true,
			[`${props.customClass}`]: true,
		}"
	>
		<tippy
			ref="tippyRef"
			:hideOnClick="props.trigger !== 'manual'"
			:trigger="props.trigger"
			:theme="props.theme === 'dark' ? 'material' : 'light'"
			:animation="props.animation"
			:placement="props.placement"
			:zIndex="props.zIndex"
			:arrow="props.arrow"
			:interactive="true"
			:allowHTML="true"
			:maxWidth="props.maxWidth"
			:showOnCreate="state.showDropdown"
			:delay="props.delay"
			:offset="props.offset"
			:onShow="handleShow"
			:onHide="handleHide"
			:onClickOutside="handleClickOutside"
		>
			<div class="v3-base-popper__trigger">
				<slot></slot>
			</div>
			<template #content>
				<div class="v3-base-popper__dropdown">
					<div class="v3-popper-dropdown__title" v-if="props.title">
						<h3>{{ props.title }}</h3>
					</div>
					<div class="v3-popper-dropdown__content">
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
import * as TYPES from '@/public/types/base-popper';
import VARIABLE from '@common/constants/internal-variable';
import 'tippy.js/themes/light.css';
import 'tippy.js/themes/material.css';
import {
	computed,
	defineComponent,
	getCurrentInstance,
	PropType,
	reactive,
	ref,
	toRef,
	watch,
} from 'vue';
import { Tippy, TippyInstance } from 'vue-tippy';

interface IState {
	showDropdown: boolean;
}
type ILocalTippyInstance = TippyInstance & {
	hide: () => void;
	show: () => void;
	unmount: () => void;
	mount: () => void;
};

export default defineComponent({
	name: 'V3BasePopper',
	components: {
		Tippy,
	},
	props: {
		modelValue: {
			type: Boolean as PropType<TYPES.IBasePopperModelValue>,
			default: null,
		},
		/** 最大宽度 */
		maxWidth: {
			type: Number,
			default: 300,
		},
		/** 主题色（黑/白） */
		theme: {
			type: String as PropType<TYPES.IBasePopperTheme>,
			default: 'dark',
			validator(v: string) {
				return ['dark', 'light'].includes(v);
			},
		},
		/** popper 内容，也可以通过 slot="content" 传入 */
		content: {
			type: String,
			default: '',
		},
		/** popper 标题 */
		title: {
			type: String,
			default: '',
		},
		/** 弹出位置 */
		placement: {
			type: String as PropType<TYPES.IBasePopperPlacement>,
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
			type: Object as PropType<TYPES.IBasePopperOffset>,
			default: [0, 5],
		},
		/** 自定义弹出的动画 */
		animation: {
			type: String,
			default: 'v3-popper-slide-fade',
		},
		/** 显示/隐藏的延迟 */
		delay: {
			type: Object as PropType<TYPES.IBasePopperDelay>,
			default: [0, 0],
		},
		/** 触发的方式 */
		trigger: {
			type: String as PropType<TYPES.IBasePopperTrigger>,
			default: 'mouseenter',
			validator(v: string) {
				return [
					'mouseenter focus',
					'mouseenter click',
					'click',
					'mouseenter',
					'focusin',
					'manual',
				].includes(v);
			},
		},
		/** 是否显示箭头 */
		arrow: {
			type: Boolean,
			default: false,
		},
		/** 同 CSS 属性 z-index */
		zIndex: {
			type: Number,
			default() {
				return VARIABLE.getNextZIndex();
			},
		},
		/** 自定义类名 */
		customClass: {
			type: String,
			default: '',
		},
	},
	setup(props: TYPES.IBasePopperProps, context) {
		const state: IState = reactive({
			/** popper 的显隐状态 */
			showDropdown: false,
		});
		const app = ref(getCurrentInstance()).value;
		const tippyRef = ref(null);

		/**
		 * 计算是否手动触发模式
		 */
		const computedIsManually = computed(() => {
			return (
				props.trigger === 'manual' && typeof props.modelValue === 'boolean'
			);
		});

		watch(
			() => props.modelValue,
			() => {
				if (computedIsManually.value) {
					state.showDropdown = props.modelValue as boolean;

					if (tippyRef.value) {
						const tippyObj = (tippyRef.value as unknown) as {
							tippy: ILocalTippyInstance;
						};
						if (props.modelValue) {
							tippyObj.tippy.show();
						} else {
							tippyObj.tippy.hide();
						}
					}
				}
			},
			{ immediate: true }
		);

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

		function handleClickOutside() {
			if (computedIsManually.value) {
				context.emit('update:modelValue', false);
			}
		}

		return {
			state,
			app,
			props,
			context,
			tippyRef,
			handleShow,
			handleHide,
			handleClickOutside,
		};
	},
});
</script>
<style lang="scss" scoped>
@import './BasePopper.scss';
</style>
