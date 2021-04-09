<template>
	<button
		:type="defaultProps.nativeType"
		:class="{
			'v3-button': true,
			[`v3-button--${defaultProps.type}`]: true,
			[`v3-button__border--${defaultProps.borderType}`]: true,
		}"
	>
		<slot></slot>
	</button>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import * as TYPES from '../index';

export default defineComponent({
	name: 'V3Button',
	props: {
		type: String as () => TYPES.IButtonType,
		nativeType: String as () => TYPES.IButtonNativeType,
		borderType: String as () => TYPES.IButtonBorderType,
	},
	setup(props) {
		const defaultProps = reactive({
			type: 'default',
			nativeType: 'button',
			borderType: 'solid',
			...toRefs(props),
		} as typeof props);

		return {
			defaultProps,
		};
	},
});
</script>
<style lang="scss" scoped>
@import './Button.style.scss';
</style>
