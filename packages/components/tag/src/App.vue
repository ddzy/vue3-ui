<template>
	<div class="demo-container">
		<v3-row>
			<v3-col><h3>默认标签：</h3></v3-col>
		</v3-row>
		<v3-row :gutter="12">
			<v3-col>
				<v3-tag type="primary">标签1</v3-tag>
			</v3-col>
			<v3-col>
				<v3-tag type="success">标签2</v3-tag>
			</v3-col>
			<v3-col>
				<v3-tag type="danger">标签3</v3-tag>
			</v3-col>
			<v3-col>
				<v3-tag type="warning">标签4</v3-tag>
			</v3-col>
			<v3-col>
				<v3-tag type="info">标签5</v3-tag>
			</v3-col>
		</v3-row>

		<v3-row>
			<v3-col><h3>三种尺寸：</h3></v3-col>
		</v3-row>
		<v3-row :gutter="12">
			<v3-col>
				<v3-tag size="small" type="primary">小号</v3-tag>
			</v3-col>
			<v3-col>
				<v3-tag size="medium" type="primary">中等</v3-tag>
			</v3-col>
			<v3-col>
				<v3-tag size="large" type="primary">大号</v3-tag>
			</v3-col>
		</v3-row>

		<v3-row>
			<v3-col><h3>填充主题：</h3></v3-col>
		</v3-row>
		<v3-row :gutter="12">
			<v3-col>
				<v3-tag type="primary" :plain="false">标签1</v3-tag>
			</v3-col>
			<v3-col>
				<v3-tag type="success" :plain="false">标签2</v3-tag>
			</v3-col>
			<v3-col>
				<v3-tag type="danger" :plain="false">标签3</v3-tag>
			</v3-col>
			<v3-col>
				<v3-tag type="warning" :plain="false">标签4</v3-tag>
			</v3-col>
			<v3-col>
				<v3-tag type="info" :plain="false">标签5</v3-tag>
			</v3-col>
		</v3-row>

		<v3-row>
			<v3-col><h3>可关闭：</h3></v3-col>
		</v3-row>
		<v3-row :gutter="12">
			<v3-col>
				<v3-tag
					type="primary"
					:plain="false"
					:closeable="true"
					:animation="false"
					@close="handleClose"
					>标签1</v3-tag
				>
			</v3-col>
			<v3-col>
				<v3-tag
					type="success"
					:plain="false"
					:closeable="true"
					:animation="false"
					@close="handleClose"
					>标签2</v3-tag
				>
			</v3-col>
			<v3-col>
				<v3-tag
					type="danger"
					:plain="true"
					:closeable="true"
					:animation="false"
					@close="handleClose"
					>标签3</v3-tag
				>
			</v3-col>
			<v3-col>
				<v3-tag
					type="warning"
					:plain="true"
					:closeable="true"
					:animation="false"
					@close="handleClose"
					>标签4</v3-tag
				>
			</v3-col>
			<v3-col>
				<v3-tag
					type="info"
					:plain="true"
					:closeable="true"
					:animation="false"
					@close="handleClose"
					>标签5</v3-tag
				>
			</v3-col>
		</v3-row>

		<v3-row>
			<v3-col><h3>动画效果：</h3></v3-col>
		</v3-row>
		<v3-row :gutter="12">
			<v3-col>
				<v3-tag type="primary" :plain="false" :closeable="true">标签1</v3-tag>
			</v3-col>
			<v3-col>
				<v3-tag type="success" :plain="false" :closeable="true">标签2</v3-tag>
			</v3-col>
			<v3-col>
				<v3-tag type="danger" :plain="true" :closeable="true">标签3</v3-tag>
			</v3-col>
			<v3-col>
				<v3-tag type="warning" :plain="true" :closeable="true">标签4</v3-tag>
			</v3-col>
			<v3-col>
				<v3-tag type="info" :plain="true" :closeable="true">标签5</v3-tag>
			</v3-col>
		</v3-row>

		<v3-row>
			<v3-col><h3>自定义背景色和文本颜色</h3></v3-col>
		</v3-row>
		<v3-row :gutter="12">
			<v3-col>
				<v3-tag color="#fff" backgroundColor="#1890ff" closeable>标签1</v3-tag>
			</v3-col>
			<v3-col>
				<v3-tag
					color="#fff"
					backgroundColor="rgba(218, 112, 214, .5)"
					borderColor="rgba(218, 112, 214, 1)"
					>标签2</v3-tag
				>
			</v3-col>
		</v3-row>
	</div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';
import V3Message from '@components/message/main';

export default defineComponent({
	setup() {
		const state = reactive({});

		function handleClose() {
			V3Message.success({
				message: '已关闭！',
			});
		}

		return {
			state,
			handleClose,
		};
	},
	methods: {},
});
</script>
<style lang="scss" scoped></style>
