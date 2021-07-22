<template>
	<div class="demo-container">
		<v3-row>
			<v3-col :span="12">
				<h3>基本用法：</h3>
			</v3-col>
			<v3-col>
				<v3-space :size="12">
					<v3-button type="success" @click="handleClick1('success')"
						>成功</v3-button
					>
					<v3-button type="danger" @click="handleClick1('danger')"
						>失败</v3-button
					>
					<v3-button type="warning" @click="handleClick1('warning')"
						>警告</v3-button
					>
					<v3-button type="info" @click="handleClick1('info')">提示</v3-button>
				</v3-space>
			</v3-col>
		</v3-row>

		<v3-row>
			<v3-col :span="12">
				<h3>内容可以是 VNode：</h3>
			</v3-col>
			<v3-col>
				<v3-space :size="12">
					<v3-button type="success" @click="handleClick2">提示</v3-button>
				</v3-space>
			</v3-col>
		</v3-row>

		<v3-row>
			<v3-col :span="12">
				<h3>可以关闭：</h3>
			</v3-col>
			<v3-col>
				<v3-space :size="12">
					<v3-button type="success" @click="handleClick3">成功</v3-button>
				</v3-space>
			</v3-col>
		</v3-row>

		<v3-row>
			<v3-col :span="12">
				<h3>文本居中：</h3>
			</v3-col>
			<v3-col>
				<v3-space :size="12">
					<v3-button type="success" @click="handleClick4">成功</v3-button>
				</v3-space>
			</v3-col>
		</v3-row>

		<v3-row>
			<v3-col :span="12">
				<h3>传入 HTML 片段：</h3>
			</v3-col>
			<v3-col>
				<v3-space :size="12">
					<v3-button type="success" @click="handleClick5">成功</v3-button>
				</v3-space>
			</v3-col>
		</v3-row>
	</div>
</template>
<script lang="ts">
import { defineComponent, h, reactive } from 'vue';
import { IMessageType } from '@/public/types/message';

export default defineComponent({
	setup() {
		const state = reactive({});

		return {
			state,
		};
	},
	methods: {
		handleClick1(type: IMessageType) {
			this.$message({
				type,
				message: type,
			});
		},
		handleClick2() {
			this.$message({
				type: 'success',
				message: h('span', '内容可以是 VNode~'),
			});
		},
		handleClick3() {
			this.$message({
				type: 'success',
				message: '可以手动关闭',
				showClose: true,
			});
		},
		handleClick4() {
			this.$message({
				type: 'success',
				message: '文本居中',
				center: true,
			});
		},
		handleClick5() {
			this.$message({
				type: 'success',
				message: `
					<p>可以传入 <mark>HTML</mark> 片段~</p>
				`,
				dangerouslyUseHTMLString: true,
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
