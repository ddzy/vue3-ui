<template>
	<div class="demo-container">
		<v3-row>
			<v3-col :span="12">
				<h3>基本用法：</h3>
			</v3-col>
			<v3-col>
				<v3-popover
					content="我们都是青春曾经领养的孩子，你哭他笑，我玩着一个童年的布娃娃，一不小心跌倒，感染人生第一场抑郁，又开始学会做爱情的美梦，最后醒来时，你就突然跟身边的人发出疑问：我们什么时候长这么大的？而就在这个时候或者更早，青春不动声色地拿走了我们所有的伤疤。"
					title="标题"
					trigger="click"
					theme="light"
				>
					<v3-button>点我</v3-button>
				</v3-popover>
			</v3-col>
		</v3-row>

		<v3-row>
			<v3-col :span="12">
				<h3>两种主题：</h3>
			</v3-col>
			<v3-col>
				<v3-popover
					content="我们都是青春曾经领养的孩子，你哭他笑，我玩着一个童年的布娃娃，一不小心跌倒，感染人生第一场抑郁，又开始学会做爱情的美梦，最后醒来时，你就突然跟身边的人发出疑问：我们什么时候长这么大的？而就在这个时候或者更早，青春不动声色地拿走了我们所有的伤疤。"
					title="标题"
					trigger="mouseenter"
					theme="light"
					placement="bottom"
				>
					<v3-button>明亮主题</v3-button>
				</v3-popover>
			</v3-col>
			<v3-col style="margin-left: 20px">
				<v3-popover
					content="我们都是青春曾经领养的孩子，你哭他笑，我玩着一个童年的布娃娃，一不小心跌倒，感染人生第一场抑郁，又开始学会做爱情的美梦，最后醒来时，你就突然跟身边的人发出疑问：我们什么时候长这么大的？而就在这个时候或者更早，青春不动声色地拿走了我们所有的伤疤。"
					title="标题"
					trigger="mouseenter"
					theme="dark"
					placement="bottom"
				>
					<v3-button>暗黑主题</v3-button>
				</v3-popover>
			</v3-col>
		</v3-row>

		<v3-row>
			<v3-col :span="12">
				<h3>禁用状态：</h3>
			</v3-col>
			<v3-col>
				<v3-popover
					content="我们都是青春曾经领养的孩子，你哭他笑，我玩着一个童年的布娃娃，一不小心跌倒，感染人生第一场抑郁，又开始学会做爱情的美梦，最后醒来时，你就突然跟身边的人发出疑问：我们什么时候长这么大的？而就在这个时候或者更早，青春不动声色地拿走了我们所有的伤疤。"
					trigger="mouseenter"
					theme="light"
					disabled
				>
					<v3-button>鼠标移上来</v3-button>
				</v3-popover>
			</v3-col>
		</v3-row>

		<v3-row>
			<v3-col :span="12">
				<h3>嵌套操作：</h3>
			</v3-col>
			<v3-col>
				<v3-popover
					title="提示"
					trigger="manual"
					theme="light"
					v-model="state.popoverValue1"
				>
					<v3-button type="primary" @click="state.popoverValue1 = true"
						>保存</v3-button
					>
					<template #content>
						<div class="content">
							<p>
								确定要保存吗？确定要保存吗？确定要保存吗？确定要保存吗？确定要保存吗？确定要保存吗？确定要保存吗？确定要保存吗？确定要保存吗？
							</p>
							<div class="action">
								<v3-button type="text" @click="state.popoverValue1 = false"
									>取消</v3-button
								>
								<v3-button
									type="primary"
									:loading="state.btnLoading1"
									@click="handleConfirm"
									>确定</v3-button
								>
							</div>
						</div>
					</template>
				</v3-popover>
			</v3-col>
		</v3-row>
	</div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
	setup(props, context) {
		const state = reactive({
			popoverValue1: false,
			btnLoading1: false,
		});

		return {
			state,
		};
	},
	methods: {
		handleConfirm() {
			this.state.btnLoading1 = true;

			setTimeout(() => {
				this.state.btnLoading1 = false;
				this.state.popoverValue1 = false;
			}, 2000);
		},
	},
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
