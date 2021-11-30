<template>
	<div class="demo-container">
		<v3-row>
			<v3-col :span="12">
				<h3>基本的线性进度条：</h3>
			</v3-col>
			<v3-col>
				<v3-progress-linear
					width="200px"
					:percent="state.percent1"
				></v3-progress-linear>
			</v3-col>
		</v3-row>

		<v3-row>
			<v3-col :span="12">
				<h3>可自定义是否开启圆角：</h3>
			</v3-col>
			<v3-col>
				<v3-progress-linear
					width="200px"
					:percent="state.percent2"
					:round="false"
				></v3-progress-linear>
			</v3-col>
		</v3-row>

		<v3-row>
			<v3-col :span="12">
				<h3>多个选项用来配置进度条的外观：</h3>
			</v3-col>
			<v3-col>
				<v3-progress-linear
					:percent="state.percent3"
					trackColor="green"
					doneTrackColor="blue"
					width="100px"
					trackWidth="12px"
				></v3-progress-linear>
			</v3-col>
		</v3-row>

		<v3-row>
			<v3-col :span="12">
				<h3>自定义 label：</h3>
			</v3-col>
			<v3-col>
				<v3-progress-linear
					width="200px"
					:percent="state.percent4"
					:formatLabel="formatLabel4"
				></v3-progress-linear>
			</v3-col>
		</v3-row>

		<v3-row>
			<v3-col :span="12">
				<h3>内置多种主题：</h3>
			</v3-col>
			<v3-col :span="12">
				<v3-progress-linear
					theme="primary"
					:percent="state.percent5"
					:formatLabel="() => 'primary'"
				></v3-progress-linear>
			</v3-col>
			<v3-col :span="12">
				<v3-progress-linear
					theme="success"
					:percent="state.percent5"
					:formatLabel="() => 'success'"
				></v3-progress-linear>
			</v3-col>
			<v3-col :span="12">
				<v3-progress-linear
					theme="danger"
					:percent="state.percent5"
					:formatLabel="() => 'danger'"
				></v3-progress-linear>
			</v3-col>
			<v3-col :span="12">
				<v3-progress-linear
					theme="warning"
					:percent="state.percent5"
					:formatLabel="() => 'warning'"
				></v3-progress-linear>
			</v3-col>
		</v3-row>

		<v3-row>
			<v3-col :span="12">
				<h3>开启进度条阴影动画效果：</h3>
			</v3-col>
			<v3-col>
				<v3-progress-linear
					width="500px"
					:percent="state.percent6"
				></v3-progress-linear>
			</v3-col>
		</v3-row>

		<v3-row>
			<v3-col :span="12">
				<h3>和 Slider 结合使用示例：</h3>
			</v3-col>
			<v3-col :span="12">
				<v3-progress-linear :percent="state.percent7"></v3-progress-linear>
			</v3-col>
			<v3-col :span="12">
				<v3-slider v-model="state.percent7"></v3-slider>
			</v3-col>
		</v3-row>
	</div>
</template>
<script lang="ts">
import { defineComponent, h, onMounted, reactive, watch } from 'vue';

export default defineComponent({
	setup(props, context) {
		const state = reactive({
			percent1: 10,
			percent2: 10,
			percent3: 30,
			percent4: 0,
			percent5: 50,
			percent6: 50,
			percent7: 20,
		});

		onMounted(() => {
			startProgressTimer4();
		});

		function startProgressTimer4() {
			window.setInterval(() => {
				if (state.percent4 >= 100) {
					state.percent4 = 0;
				} else {
					state.percent4 += 10;
				}
			}, 1000);
		}

		function formatLabel4(percent: number) {
			if (percent <= 0) {
				return '💀';
			} else if (percent <= 20) {
				return '😵';
			} else if (percent <= 40) {
				return '😭';
			} else if (percent <= 60) {
				return '🙂';
			} else if (percent <= 80) {
				return '😀';
			} else if (percent <= 100) {
				return '😆';
			}
		}

		return {
			state,
			formatLabel4,
		};
	},
	methods: {},
});
</script>
<style lang="scss" scoped></style>
