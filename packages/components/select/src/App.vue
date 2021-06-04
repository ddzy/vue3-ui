<template>
	<div class="demo-container">
		<v3-row>
			<v3-col>
				<h3>基本用法：</h3>
			</v3-col>
		</v3-row>
		<v3-row>
			<v3-col :span="2">
				<v3-select></v3-select>
			</v3-col>
		</v3-row>
	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	setup() {
		const state = {};

		return {
			state,
		};
	},
	methods: {},
});
</script>
<style lang="scss" scoped></style>
