<template> </template>
<script lang="ts">
import { defineComponent, PropType, reactive } from 'vue';
import * as TYPES from '@/public/types/backdrop';

export default defineComponent({
	name: 'V3Backdrop',
	props: {},
	setup(props: TYPES.IBackdropProps, context) {
		const state = reactive({});

		return {
			props,
			state,
		};
	},
});
</script>
<style lang="scss" scoped>
@import './Backdrop.scss';
</style>
