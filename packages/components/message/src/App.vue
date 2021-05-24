<template>
	<div class="demo-container">
		<v3-button
			type="success"
			:loading="state.isSuccessBtnLoading"
			@click="submitSuccess"
			>成功的消息提示</v3-button
		>
	</div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
	setup() {
		const state = reactive({
			isSuccessBtnLoading: false,
		});

		return {
			state,
		};
	},
	methods: {
		submitSuccess() {
			const instance = this.$message({
				type: 'success',
				duration: 0,
				showClose: true,
				center: false,
				dangerouslyUseHTMLString: true,
				icon: '',
				offset: 100,
				customClass: `message-1 message-2  message-3 message-4    `,
				message: `
					修改成功！
				`,
			});
		},
	},
});
</script>
<style lang="scss" scoped>
.demo__item {
	.v3-button {
		margin-left: 12px;
	}
	.v3-col div {
		line-height: 50px;
		background-color: #f3f4f5;
		border-radius: 6px;
	}
}
</style>
