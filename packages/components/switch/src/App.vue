<template>
	<div class="demo-container">
		<v3-row>
			<v3-col :span="12"><h3>基本用法</h3></v3-col>
			<v3-col>
				<v3-switch
					v-model="state.switchValue1"
					activeLabel="active"
					inactiveLabel="inactive"
				></v3-switch>
			</v3-col>
		</v3-row>
	</div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
	setup() {
		const state = reactive({
			switchValue1: true,
		});

		return {
			state,
		};
	},
	methods: {},
});
</script>
<style lang="scss" scoped></style>
