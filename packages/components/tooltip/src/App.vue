<template>
	<div class="demo-container">
		<v3-tooltip></v3-tooltip>
	</div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRef, watch } from 'vue';

export default defineComponent({
	setup(props, context) {
		const state = reactive({});

		return {
			state,
		};
	},
	methods: {},
});
</script>
<style lang="scss" scoped></style>
