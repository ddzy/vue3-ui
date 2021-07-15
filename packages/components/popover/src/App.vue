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
					<v3-button>鼠标移上来</v3-button>
				</v3-popover>
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
