<template>
	<div class="demo-container">
		<div class="demo__item">
			<h3>自定义列数</h3>
			<v3-row>
				<v3-col :span="4">
					<div>123</div>
				</v3-col>
				<v3-col :span="4">
					<div>456</div>
				</v3-col>
				<v3-col :span="4">
					<div>789</div>
				</v3-col>
			</v3-row>

			<h3>列间距（gutter）</h3>
			<v3-row :gutter="20" :type="'flex'">
				<v3-col :span="4">
					<div>123</div>
				</v3-col>
				<v3-col :span="4">
					<div>456</div>
				</v3-col>
				<v3-col :span="4">
					<div>789</div>
				</v3-col>
			</v3-row>

			<h3>列间距 + 偏移量（gutter + offset）</h3>
			<v3-row :gutter="20" :type="'flex'">
				<v3-col :span="4">
					<div>abc</div>
				</v3-col>
				<v3-col :span="4" :offset="4">
					<div>def</div>
				</v3-col>
			</v3-row>

			<h3>相对于自身向右位移（push）</h3>
			<v3-row>
				<v3-col :span="4">
					<div>abc</div>
				</v3-col>
				<v3-col :span="4" :push="2">
					<div>def</div>
				</v3-col>
				<v3-col :span="4">
					<div>ghi</div>
				</v3-col>
			</v3-row>

			<h3>左右同时位移（push + pull）</h3>
			<v3-row>
				<v3-col :span="4">
					<div>abc</div>
				</v3-col>
				<v3-col :span="4" :push="2">
					<div>def</div>
				</v3-col>
				<v3-col :span="4" :pull="6">
					<div>ghi</div>
				</v3-col>
			</v3-row>

			<h3>数字类型的响应式</h3>
			<v3-row>
				<v3-col :span="4" :md="8">
					<div>abc</div>
				</v3-col>
				<v3-col :span="4" :md="12" :lg="6" :xl="2">
					<div>def</div>
				</v3-col>
				<v3-col :span="4" :md="8">
					<div>ghi</div>
				</v3-col>
			</v3-row>

			<h3>对象类型的响应式</h3>
			<v3-row>
				<v3-col
					:span="4"
					:md="{
						span: 8,
						offset: 2,
					}"
					:sm="{
						span: 12,
					}"
					:xs="{
						span: 12,
					}"
				>
					<div>abc</div>
				</v3-col>
				<v3-col
					:span="4"
					:md="{
						span: 12,
					}"
					:sm="{
						span: 12,
					}"
					:xs="{
						span: 12,
					}"
				>
					<div>def</div>
				</v3-col>
				<v3-col
					:span="4"
					:md="{
						span: 8,
					}"
					:sm="{
						span: 12,
					}"
					:xs="{
						span: 12,
					}"
				>
					<div>ghi</div>
				</v3-col>
			</v3-row>
		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	setup() {
		const state = {};

		return {
			state,
		};
	},
	methods: {},
});
</script>
<style lang="scss" scoped>
.demo__item {
	.v3-button {
		margin-left: 12px;
	}
	.v3-col div {
		line-height: 50px;
		background-color: #f3f4f5;
		border-radius: 6px;
	}
}
</style>
