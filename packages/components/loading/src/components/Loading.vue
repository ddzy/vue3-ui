<template>
	<div class="v3-loading">loading component</div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
	name: 'V3Loading',
	setup(props, context) {
		const state = reactive({});

		return {
			state,
			props,
			context,
		};
	},
});
</script>
<style lang="scss" scoped>
@import './Loading.scss';
</style>
