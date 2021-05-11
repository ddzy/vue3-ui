<template>
	<button
		ref="buttonRef"
		:disabled="state.defaultProps.disabled"
		:type="state.defaultProps.nativeType"
		:class="{
			'v3-button': true,
			[`v3-button--${state.defaultProps.type}`]: true,
			[`v3-button__border--${state.defaultProps.borderType}`]: !!state
				.defaultProps.borderType,
			[`v3-button--plain`]: state.defaultProps.plain,
			[`v3-button--disabled`]: state.defaultProps.disabled,
			[`v3-button--circle`]: state.defaultProps.circle,
			[`v3-button--loading`]: state.defaultProps.loading,
		}"
	>
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
	</button>
</template>
<script lang="ts">
import {
	defineComponent,
	onMounted,
	onUnmounted,
	reactive,
	ref,
	watch,
} from 'vue';
import * as TYPES from '../../index';

export default defineComponent({
	name: 'V3Button',
	props: {
		type: String as () => TYPES.IButtonType,
		nativeType: String as () => TYPES.IButtonNativeType,
		borderType: String as () => TYPES.IButtonBorderType,
		disabled: Boolean as () => TYPES.IButtonDisabled,
		plain: Boolean as () => TYPES.IButtonPlain,
		icon: String as () => TYPES.IButtonIcon,
		circle: Boolean as () => TYPES.IButtonCircle,
		loading: Boolean as () => TYPES.IButtonLoading,
	},
	setup(props, context) {
		const state = reactive({
			defaultProps: {
				type: 'default',
				nativeType: 'button',
				borderType: '',
				plain: false,
				disabled: false,
				icon: '',
				circle: false,
				loading: false,
			},
		});

		watch(
			props,
			() => {
				state.defaultProps = {
					...state.defaultProps,
					...reactive(props),
					disabled: props.disabled || props.loading,
					icon: props.loading
						? 'v3-icon-loading'
						: props.icon
						? props.icon
						: '',
				};
			},
			{
				immediate: true,
			}
		);

		const buttonRef = ref(document.createElement('button'));

		function buttonClickListener(e: Event) {
			const button = buttonRef.value as HTMLButtonElement;
			const path = e.composedPath();

			if (path.includes(button)) {
				button.classList.add('v3-button--active');
			}
		}

		function buttonAnimationEndListener(e: Event) {
			const button = buttonRef.value as HTMLButtonElement;
			const path = e.composedPath();

			if (path.includes(button)) {
				button.classList.remove('v3-button--active');
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

			button.removeEventListener('click', buttonClickListener);
			button.removeEventListener('animationend', buttonAnimationEndListener);
		});

		return {
			state,
			context,
			buttonRef,
		};
	},
});
</script>
<style lang="scss" scoped>
@import './Button.scss';
</style>
