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
		<slot></slot>
	</button>
</template>
<script lang="ts">
import { defineComponent, onMounted, onUnmounted, reactive, toRefs } from 'vue';
import * as TYPES from '../index';

export default defineComponent({
	name: 'V3Button',
	props: {
		type: String as () => TYPES.IButtonType,
		nativeType: String as () => TYPES.IButtonNativeType,
		borderType: String as () => TYPES.IButtonBorderType,
		disabled: Boolean as () => TYPES.IButtonDisabled,
		plain: Boolean as () => TYPES.IButtonPlain,
	},
	setup(props, context) {
		const defaultProps = reactive({
			type: 'default',
			nativeType: 'button',
			borderType: 'solid',
			plain: false,
			disabled: false,
			...toRefs(props),
		} as typeof props);

		function documentClickListener(e: Event) {
			const element = e.target as HTMLElement;

			if (
				element &&
				element.nodeName === 'BUTTON' &&
				element.classList.contains('v3-button')
			) {
				element.classList.add('v3-button--active');
			}
		}

		function documentAnimationEndListener(e: Event) {
			const element = e.target as HTMLElement;

			if (
				element &&
				element.nodeName === 'BUTTON' &&
				element.classList.contains('v3-button')
			) {
				element.classList.remove('v3-button--active');
			}
		}

		onMounted(() => {
			document.addEventListener('click', documentClickListener, false);
			document.addEventListener(
				'animationend',
				documentAnimationEndListener,
				false
			);
		});
		onUnmounted(() => {
			document.removeEventListener('click', documentClickListener, false);
			document.removeEventListener(
				'animationend',
				documentAnimationEndListener,
				false
			);
		});

		return {
			defaultProps,
			context,
		};
	},
});
</script>
<style lang="scss" scoped>
@import './Button.style.scss';
</style>
