<template>
	<button
		:type="defaultProps.nativeType"
		:class="{
			'v3-button': true,
			[`v3-button--${defaultProps.type}`]: true,
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
	},
	setup(props) {
		const defaultProps = reactive({
			type: 'default',
			nativeType: 'button',
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
