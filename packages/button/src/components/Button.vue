<template>
	<button
		ref="buttonRef"
		:disabled="defaultProps.disabled"
		:type="defaultProps.nativeType"
		:class="{
			'v3-button': true,
			[`v3-button--${defaultProps.type}`]: true,
			[`v3-button__border--${defaultProps.borderType}`]: true,
			[`v3-button--plain`]: defaultProps.plain,
			[`v3-button--disabled`]: defaultProps.disabled,
		}"
	>
		<i
			v-if="defaultProps.icon"
			:class="{
				'v3-icon': !!defaultProps.icon,
				[defaultProps.icon]: true,
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
	toRefs,
} from 'vue';
import * as TYPES from '../index';

export default defineComponent({
	name: 'V3Button',
	props: {
		type: String as () => TYPES.IButtonType,
		nativeType: String as () => TYPES.IButtonNativeType,
		borderType: String as () => TYPES.IButtonBorderType,
		disabled: Boolean as () => TYPES.IButtonDisabled,
		plain: Boolean as () => TYPES.IButtonPlain,
		icon: String as () => TYPES.IButtonIcon,
	},
	setup(props, context) {
		const defaultProps = reactive({
			type: 'default',
			nativeType: 'button',
			borderType: 'solid',
			plain: false,
			disabled: false,
			icon: '',
			...toRefs(props),
		} as typeof props);
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
			defaultProps,
			context,
			buttonRef,
		};
	},
});
</script>
<style lang="scss" scoped>
@import './Button.scss';
</style>
