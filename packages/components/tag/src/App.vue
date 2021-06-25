<template>
	<div class="demo-container">
		<v3-row>
			<v3-col><h3>默认标签：</h3></v3-col>
		</v3-row>
		<v3-row>
			<v3-col>
				<v3-tag>标签</v3-tag>
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
<style lang="scss" scoped></style>
