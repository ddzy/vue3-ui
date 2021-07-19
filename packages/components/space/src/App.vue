<template>
	<div class="demo-container">
		<v3-row>
			<v3-col :span="12">
				<h3>基本用法：</h3>
			</v3-col>
			<v3-col>
				<v3-space>
					<v3-button type="primary">按钮1</v3-button>
					<v3-button type="success">按钮2</v3-button>
					<v3-button type="danger">按钮3</v3-button>
					<v3-button type="warning">按钮4</v3-button>
					<v3-button type="info">按钮5</v3-button>
				</v3-space>
			</v3-col>
		</v3-row>

		<v3-row>
			<v3-col :span="12">
				<h3>自定义容器的类名：</h3>
			</v3-col>
			<v3-col>
				<v3-space customClass="space-wrapper">
					<v3-button type="text">按钮1</v3-button>
					<v3-button type="text">按钮2</v3-button>
					<v3-button type="text">按钮3</v3-button>
					<v3-button type="text">按钮4</v3-button>
					<v3-button type="text">按钮5</v3-button>
				</v3-space>
			</v3-col>
		</v3-row>

		<v3-row>
			<v3-col :span="12">
				<h3>更改主轴的方向：</h3>
			</v3-col>
			<v3-col>
				<v3-space>
					<v3-button type="text">按钮1</v3-button>
					<v3-button type="text">按钮2</v3-button>
					<v3-button type="text">按钮3</v3-button>
					<v3-button type="text">按钮4</v3-button>
					<v3-button type="text">按钮5</v3-button>
				</v3-space>
				<v3-space direction="column">
					<v3-button type="text">按钮1</v3-button>
					<v3-button type="text">按钮2</v3-button>
					<v3-button type="text">按钮3</v3-button>
					<v3-button type="text">按钮4</v3-button>
					<v3-button type="text">按钮5</v3-button>
				</v3-space>
			</v3-col>
		</v3-row>

		<v3-row>
			<v3-col :span="12">
				<h3>控制间隔的大小：</h3>
			</v3-col>
			<v3-col>
				<v3-space customClass="space-wrapper-2" wrap :size="20">
					<v3-button type="text">按钮1</v3-button>
					<v3-button type="text">按钮2</v3-button>
					<v3-button type="text">按钮3</v3-button>
					<v3-button type="text">按钮4</v3-button>
					<v3-button type="text">按钮5</v3-button>
					<v3-button type="text">按钮1</v3-button>
					<v3-button type="text">按钮2</v3-button>
					<v3-button type="text">按钮3</v3-button>
					<v3-button type="text">按钮4</v3-button>
					<v3-button type="text">按钮5</v3-button>
					<v3-button type="text">按钮1</v3-button>
					<v3-button type="text">按钮2</v3-button>
					<v3-button type="text">按钮3</v3-button>
					<v3-button type="text">按钮4</v3-button>
					<v3-button type="text">按钮5</v3-button>
				</v3-space>
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
