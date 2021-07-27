<template>
	<div class="demo-container">
		<v3-row>
			<v3-col :span="12">
				<h3>基本用法：</h3>
			</v3-col>
			<v3-col>
				<v3-base-popper v-model="state.showPopper1" theme="light">
					<v3-button
						type="primary"
						@click="state.showPopper1 = !state.showPopper1"
						>点击我</v3-button
					>
					<template #content>
						测试内容
					</template>
				</v3-base-popper>
			</v3-col>
		</v3-row>
	</div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
	setup(props, context) {
		const state = reactive({
			showPopper1: false,
		});

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
