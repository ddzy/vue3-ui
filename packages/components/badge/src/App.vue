<template>
	<div class="demo-container">
		<v3-row>
			<v3-col :span="12">
				<h3>基本用法：</h3>
			</v3-col>
			<v3-col>
				<v3-badge>
					<v3-button>按钮1</v3-button>
				</v3-badge>
			</v3-col>
		</v3-row>
	</div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

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
<style lang="scss" scoped>
.space-wrapper {
	border: 1px dashed rgba(184, 176, 176, 1);
}
.space-wrapper-2 {
	width: 200px;
}
</style>
