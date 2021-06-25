<template>
	<div class="demo-container">
		<v3-row>
			<v3-col><h3>默认标签：</h3></v3-col>
		</v3-row>
		<v3-row gutter="12">
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
		<v3-row gutter="12">
			<v3-col>
				<v3-tag size="small">小号</v3-tag>
			</v3-col>
			<v3-col>
				<v3-tag size="medium">中等</v3-tag>
			</v3-col>
			<v3-col>
				<v3-tag size="large">大号</v3-tag>
			</v3-col>
		</v3-row>

		<v3-row>
			<v3-col><h3>填充主题：</h3></v3-col>
		</v3-row>
		<v3-row gutter="12">
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
	</div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
	setup() {
		const state = reactive({});

		return {
			state,
		};
	},
	methods: {},
});
</script>
<style lang="scss" scoped></style>
