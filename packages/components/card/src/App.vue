<template>
	<div class="demo-container">
		<v3-card></v3-card>
	</div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
	setup() {
		const state = reactive({});

		return {
			state,
		};
	},
});
</script>
<style lang="scss" scoped></style>
