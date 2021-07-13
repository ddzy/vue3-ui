<template>
	<div class="v3-tooltip">tooltip</div>
</template>
<script lang="ts">
import { defineComponent, getCurrentInstance, reactive, ref } from 'vue';

export default defineComponent({
	name: 'V3Tooltip',
	setup(props, context) {
		const state = reactive({});
		const app = ref(getCurrentInstance()).value;

		return {
			state,
			app,
			props,
			context,
		};
	},
});
</script>
<style lang="scss" scoped>
@import './Tooltip.scss';
</style>
