<template>
	<div class="demo-container">
		<v3-button
			type="success"
			:loading="state.isSuccessBtnLoading"
			@click="submitSuccess"
			>成功的消息提示</v3-button
		>
	</div>
	<v3-row>
		<v3-col>
			<v3-button type="danger" @click="submitFail">错误的消息提示</v3-button>
		</v3-col>
	</v3-row>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';
import V3Message from '@components/message/main';

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
				duration: 2000,
				showClose: true,
				center: false,
				dangerouslyUseHTMLString: true,
				icon: '',
				offset: 10,
				customClass: `message-1 message-2  message-3 message-4    `,
				closeOnHover: false,
				onClose() {
					return new Promise(resolve => {
						setTimeout(() => {
							resolve(true);
						}, 1000);
					});
				},
				message: `
					修改成功！
				`,
			});
		},
		submitFail() {
			V3Message.danger({
				message: '修改失败！',
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
