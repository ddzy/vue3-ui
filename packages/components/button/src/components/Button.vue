<template>
	<button
		ref="buttonRef"
		:disabled="state.defaultProps.disabled"
		:type="props.nativeType"
		:class="{
			'v3-button': true,
			[`v3-button--${props.type}`]: true,
			[`has-border--${props.borderType}`]: !!props.borderType,
			[`is-plain`]: props.plain,
			[`is-disabled`]: state.defaultProps.disabled,
			[`is-circle`]: props.circle,
			[`is-loading`]: props.loading,
		}"
	>
		<a href="javascript: void 0;" v-if="props.type === 'text'">
			<i
				v-if="state.defaultProps.icon"
				:class="{
					'v3-icon': !!state.defaultProps.icon,
					[state.defaultProps.icon]: true,
				}"
			></i>
			<span>
				<slot></slot>
			</span>
		</a>
		<template v-else>
			<i
				v-if="state.defaultProps.icon"
				:class="{
					'v3-icon': !!state.defaultProps.icon,
					[state.defaultProps.icon]: true,
				}"
			></i>
			<span>
				<slot></slot>
			</span>
		</template>
	</button>
</template>
<script lang="ts">
import * as TYPES from '@/public/types/button';
import {
	defineComponent,
	onMounted,
	onUnmounted,
	PropType,
	reactive,
	ref,
	watch,
} from 'vue';

export default defineComponent({
	name: 'V3Button',
	props: {
		/** 按钮的类型 */
		type: {
			type: String as PropType<TYPES.IButtonType>,
			default: 'default',
			validator: (v: string) => {
				return [
					'primary',
					'success',
					'danger',
					'default',
					'warning',
					'info',
					'text',
				].includes(v);
			},
		},
		/** 按钮的原生类型 */
		nativeType: {
			type: String as PropType<TYPES.IButtonNativeType>,
			default: 'button',
			validator: (v: string) => {
				return ['button', 'submit', 'reset', 'menu'].includes(v);
			},
		},
		/** 边框类型 */
		borderType: {
			type: String as PropType<TYPES.IButtonBorderType>,
			default: '',
			validator: (v: string) => {
				return [
					'',
					'solid',
					'dashed',
					'dotted',
					'double',
					'groove',
					'outset',
				].includes(v);
			},
		},
		/** 按钮是否禁用 */
		disabled: {
			type: Boolean,
			default: false,
		},
		/** 是否为朴素按钮 */
		plain: {
			type: Boolean,
			default: false,
		},
		/** 按钮上的图标 */
		icon: {
			type: String,
			default: '',
		},
		/** 是否为圆形按钮 */
		circle: {
			type: Boolean,
			default: false,
		},
		/** 按钮的 loading 状态 */
		loading: {
			type: Boolean,
			default: false,
		},
	},
	setup(props: TYPES.IButtonProps, context) {
		const state = reactive({
			defaultProps: {
				icon: '',
				disabled: false,
			},
		});
		const buttonRef = ref(document.createElement('button'));

		watch(
			props,
			newValue => {
				// 按钮 loading 时展示特定的 icon
				state.defaultProps.icon = newValue.loading
					? 'v3-icon-loading'
					: newValue.icon
					? newValue.icon
					: '';
				// 按钮 loading 时也为禁用状态
				state.defaultProps.disabled = !!newValue.disabled || !!newValue.loading;
			},
			{ immediate: true }
		);

		function buttonClickListener(e: Event) {
			const button = buttonRef.value as HTMLButtonElement;
			const path = e.composedPath();

			if (path.includes(button)) {
				button.classList.add('is-active');
			}
		}

		function buttonAnimationEndListener(e: Event) {
			const button = buttonRef.value as HTMLButtonElement;
			const path = e.composedPath();

			if (path.includes(button)) {
				button.classList.remove('is-active');
			}
		}

		onMounted(() => {
			const button = buttonRef.value as HTMLButtonElement;

			button.addEventListener('click', buttonClickListener, false);
			button.addEventListener(
				'animationend',
				buttonAnimationEndListener,
				false
			);
		});
		onUnmounted(() => {
			const button = buttonRef.value as HTMLButtonElement;

			button && button.removeEventListener('click', buttonClickListener);
			button &&
				button.removeEventListener('animationend', buttonAnimationEndListener);
		});

		return {
			state,
			props,
			context,
			buttonRef,
		};
	},
});
</script>
<style lang="scss" scoped>
@import './Button.scss';
</style>
