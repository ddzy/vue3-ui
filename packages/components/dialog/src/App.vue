<template>
	<div class="demo-container">
		<v3-row>
			<v3-col>
				<h3>基本用法：</h3>
			</v3-col>
		</v3-row>
		<v3-row>
			<v3-col>
				<v3-button type="primary" @click="state.showDialog1 = true"
					>打开弹窗</v3-button
				>
				<v3-dialog
					v-model="state.showDialog1"
					:title="'基本用法'"
					:headerActions="state.headerActions1"
				>
					<div class="dialog-content-1"></div>
				</v3-dialog>
			</v3-col>
		</v3-row>

		<v3-row>
			<v3-col>
				<h3>可自定义头部的操作按钮组：</h3>
			</v3-col>
		</v3-row>
		<v3-row>
			<v3-col>
				<v3-button type="primary" @click="state.showDialog2 = true"
					>打开弹窗</v3-button
				>
				<v3-dialog
					v-model="state.showDialog2"
					:headerActions="state.headerActions2"
				>
					<div class="dialog-content-2"></div>
				</v3-dialog>
			</v3-col>
		</v3-row>

		<v3-row>
			<v3-col>
				<h3>可自定义弹窗标题：</h3>
			</v3-col>
		</v3-row>
		<v3-row>
			<v3-col>
				<v3-button type="primary" @click="state.showDialog3 = true"
					>打开弹窗</v3-button
				>
				<v3-dialog v-model="state.showDialog3">
					<template #title>
						<span style="color: rgba(237, 170, 83, 1)">slot 自定义标题</span>
					</template>
					<div class="dialog-content-3"></div>
				</v3-dialog>
			</v3-col>
		</v3-row>
	</div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
	setup() {
		const state = reactive({
			showDialog1: false,
			showDialog2: false,
			showDialog3: false,
			headerActions2: [
				{
					buttonProps: {
						type: 'default',
						loading: false,
						plain: true,
					},
					text: '取消',
					handler() {
						state.showDialog2 = false;
					},
				},
				{
					buttonProps: {
						type: 'success',
						loading: false,
					},
					text: '确定',
					handler() {
						state.headerActions2[1].buttonProps.loading = true;

						setTimeout(() => {
							state.headerActions2[1].buttonProps.loading = false;
						}, 1000);
					},
				},
			],
		});

		return {
			state,
		};
	},
	methods: {},
});
</script>
<style lang="scss"></style>
<style lang="scss" scoped>
.dialog-content-1,
.dialog-content-2,
.dialog-content-3 {
	height: 500px;
}
</style>
