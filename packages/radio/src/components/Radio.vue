<template> </template>
<script lang="ts">
import {
	defineComponent,
	getCurrentInstance,
	reactive,
	toRef,
	watch,
} from 'vue';
import * as TYPES from '../index';

export default defineComponent({
	name: 'V3Input',
	props: {},
	setup(props, context) {
		const state = reactive({
			defaultProps: {},
		});
		const app = getCurrentInstance();

		watch(
			props,
			() => {
				state.defaultProps = {
					...state.defaultProps,
					...reactive(props),
				};
			},
			{ immediate: true }
		);
		return {
			state,
			props,
			app,
		};
	},
});
</script>
<style lang="scss" scoped>
@import './Input.scss';
</style>
