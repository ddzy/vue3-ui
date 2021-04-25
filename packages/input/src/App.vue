<template>
	<div class="input-demo-container">
		<v3-button
			type="primary"
			icon="v3-icon-search"
			@click="search"
		>搜索</v3-button>
	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	components: {},
	setup(props, context) {
		function search(e) {
			console.log('e :>> ', e);
		}

		return {
			search,
		}
	},
});
</script>
<style lang="scss" scoped></style>
