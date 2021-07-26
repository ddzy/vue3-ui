<template>
	<div class="demo-container">
		<v3-row>
			<v3-col :span="12">
				<h3>基本用法：</h3>
			</v3-col>
			<v3-col :span="4">
				<v3-card title="标题">
					<v3-space :size="12">
						<v3-button type="primary">按钮1</v3-button>
						<v3-button type="primary">按钮2</v3-button>
						<v3-button type="primary">按钮3</v3-button>
						<v3-button type="primary">按钮4</v3-button>
						<v3-button type="primary">按钮5</v3-button>
						<v3-button type="primary">按钮6</v3-button>
						<v3-button type="primary">按钮7</v3-button>
						<v3-button type="primary">按钮8</v3-button>
						<v3-button type="primary">按钮9</v3-button>
					</v3-space>
				</v3-card>
			</v3-col>
		</v3-row>

		<v3-row>
			<v3-col :span="12">
				<h3>控制卡片阴影大小：</h3>
			</v3-col>
			<v3-col style="margin-bottom: 12px" :span="12">
				<v3-radio-group v-model="state.radioValue">
					<v3-radio label="small">小</v3-radio>
					<v3-radio label="medium">中</v3-radio>
					<v3-radio label="large">大</v3-radio>
				</v3-radio-group>
			</v3-col>
			<v3-col :span="4">
				<v3-card title="标题" :shadowSize="state.radioValue">
					Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugit
					facilis blanditiis excepturi, repellat similique animi, architecto
					placeat obcaecati tempore esse et perferendis error at vel voluptate
					recusandae quae doloremque sint.
				</v3-card>
			</v3-col>
		</v3-row>
	</div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
	setup() {
		const state = reactive({
			radioValue: 'small',
		});

		return {
			state,
		};
	},
});
</script>
<style lang="scss" scoped></style>
