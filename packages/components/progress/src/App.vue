<template>
	<div class="demo-container">
		<v3-row>
			<v3-col :span="12">
				<h3>基本的线性进度条：</h3>
			</v3-col>
			<v3-col>
				<v3-progress-linear :percent="state.percent1"></v3-progress-linear>
			</v3-col>
		</v3-row>

		<v3-row>
			<v3-col :span="12">
				<h3>可自定义是否开启圆角：</h3>
			</v3-col>
			<v3-col>
				<v3-progress-linear
					:percent="state.percent2"
					:round="false"
				></v3-progress-linear>
			</v3-col>
		</v3-row>
	</div>
</template>
<script lang="ts">
import { defineComponent, h, reactive, watch } from 'vue';

export default defineComponent({
	setup(props, context) {
		const state = reactive({
			percent1: 10,
			percent2: 10,
		});

		return {
			state,
		};
	},
	methods: {},
});
</script>
<style lang="scss" scoped></style>
