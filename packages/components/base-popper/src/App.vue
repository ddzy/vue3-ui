<template>
	<div class="demo-container">
		<v3-base-popper></v3-base-popper>
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
.content {
	.action {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		:deep(.v3-button) {
			&:not(:first-child) {
				margin-left: 12px;
			}
		}
	}
}
</style>
