<template>
	<div class="demo-container">
		<v3-row>
			<v3-col :span="12">
				<h3>基本用法：</h3>
			</v3-col>
			<v3-col>
				<span>北京</span>
				<v3-divider></v3-divider>
				<span>上海</span>
			</v3-col>
		</v3-row>

		<v3-row>
			<v3-col :span="12">
				<h3>自定义方向（默认为垂直方向）：</h3>
			</v3-col>
			<v3-col>
				<span>试着相信梦吧！或许，当你为之开始努力，便无所谓不可能了。</span>
				<v3-divider direction="horizontal"></v3-divider>
				<span>舍弃一切去做一件事，没有值不值得，只有想不想。</span>
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
<style lang="scss" scoped></style>
