<template>
	<div class="demo-container">
		<v3-row>
			<v3-col>
				<h3>基本用法：</h3>
			</v3-col>
			<v3-col>
				<v3-dialog></v3-dialog>
			</v3-col>
		</v3-row>
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
	methods: {},
});
</script>
<style lang="scss"></style>
<style lang="scss" scoped></style>
