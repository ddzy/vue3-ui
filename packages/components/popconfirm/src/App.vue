<template>
	<div class="demo-container">
		<v3-row>
			<v3-col :span="12">
				<h3>基本用法：</h3>
			</v3-col>
			<v3-col>
				<v3-popconfirm
					content="确定要删除吗？"
					trigger="manual"
					v-model="state.popconfirmValue1"
					:confirmBtnLoading="state.popconfirmConfirmBtnLoading1"
					@confirm="handleConfirm1"
					@cancel="handleCancel1"
				>
					<v3-button
						type="danger"
						@click="state.popconfirmValue1 = !state.popconfirmValue1"
						>删除</v3-button
					>
				</v3-popconfirm>
			</v3-col>
		</v3-row>

		<v3-row>
			<v3-col :span="12">
				<h3>自定义图标和图标颜色：</h3>
			</v3-col>
			<v3-col>
				<v3-popconfirm
					content="要隐藏当前文章吗？"
					trigger="click"
					icon="v3-icon-Notvisible"
					iconColor="rgba(201, 27, 38, 1)"
					placement="bottom"
				>
					<v3-button
						type="primary"
						circle
						icon="v3-icon-Notvisible"
					></v3-button>
				</v3-popconfirm>
			</v3-col>
		</v3-row>

		<v3-row>
			<v3-col :span="12">
				<h3>自定义按钮的类型、大小、文本内容：</h3>
			</v3-col>
			<v3-col>
				<v3-space :size="12">
					<v3-popconfirm
						content="确定要删除吗？"
						trigger="click"
						placement="bottom"
						confirmBtnType="success"
						cancelBtnType="default"
					>
						<v3-button type="primary">类型</v3-button>
					</v3-popconfirm>

					<v3-popconfirm
						content="确定要删除吗？"
						trigger="click"
						placement="bottom"
						confirmBtnSize="small"
					>
						<v3-button type="primary">大小</v3-button>
					</v3-popconfirm>

					<v3-popconfirm
						content="确定要删除吗？"
						trigger="click"
						placement="bottom"
						cancelBtnText="不用了"
						confirmBtnText="继续"
					>
						<v3-button type="primary">内容</v3-button>
					</v3-popconfirm>
				</v3-space>
			</v3-col>
		</v3-row>
	</div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';
import V3Message from '@components/message/main';

export default defineComponent({
	setup(props, context) {
		const state = reactive({
			popconfirmValue1: false,
			popconfirmConfirmBtnLoading1: false,
		});

		function handleConfirm1() {
			state.popconfirmConfirmBtnLoading1 = true;

			setTimeout(() => {
				V3Message.success({
					message: '删除成功~',
				});
				state.popconfirmConfirmBtnLoading1 = false;
				state.popconfirmValue1 = false;
			}, 1000);
		}

		function handleCancel1() {
			state.popconfirmValue1 = false;
		}

		return {
			state,
			handleConfirm1,
			handleCancel1,
		};
	},
	methods: {},
});
</script>
<style lang="scss" scoped></style>
