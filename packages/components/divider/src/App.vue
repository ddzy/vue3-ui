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

		<v3-row>
			<v3-col :span="12">
				<h3>可填充内容：</h3>
			</v3-col>
			<v3-col>
				<span>试着相信梦吧！或许，当你为之开始努力，便无所谓不可能了。</span>
				<v3-divider direction="horizontal">
					分割线
				</v3-divider>
				<span>舍弃一切去做一件事，没有值不值得，只有想不想。</span>
				<v3-divider direction="horizontal">
					<i class="v3-icon v3-icon-browse"></i>
				</v3-divider>
				<span>舍弃一切去做一件事，没有值不值得，只有想不想。</span>
			</v3-col>
		</v3-row>

		<v3-row>
			<v3-col :span="12">
				<h3>可自定义内容的位置：</h3>
			</v3-col>
			<v3-col>
				<span
					>背负罪过的人，在地狱深处品尝绝望，只是如果两人遇见彼此，一同抬头仰望，那处即是天堂。</span
				>
				<v3-divider direction="horizontal" contentPosition="start">
					<i class="v3-icon v3-icon-code"></i>
				</v3-divider>
				<span>试着相信梦吧！或许，当你为之开始努力，便无所谓不可能了。</span>
				<v3-divider direction="horizontal" contentPosition="center">
					<i class="v3-icon v3-icon-code"></i>
				</v3-divider>
				<span>舍弃一切去做一件事，没有值不值得，只有想不想。</span>
				<v3-divider direction="horizontal" contentPosition="end">
					<i class="v3-icon v3-icon-code"></i>
				</v3-divider>
				<span
					>命运，不过是失败者无聊的自慰，不过是懦怯者的解嘲。人们的前途只能靠自己的意志、自己的努力来决定。</span
				>
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
