<template>
	<div class="demo-container">
		<div class="demo__item">
			<v3-demo-block
				:hasCopy="true"
				:hasCodeSandbox="true"
				:code="state.code"
				:descriptionTip="'概述'"
				:detailTip="'详情'"
				:extraList="state.extraList"
				@extraClick="handleExtraItemClick"
			>
				<template #default>
					<h3 style="text-align: center; margin: 0;">标题</h3>
				</template>
				<template #description>
					按钮有六种类型，分别是【默认】、【主要】、【危险】、【成功】、【警告】、【信息】
				</template>
				<template #detail>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas
					veritatis quidem cum unde dolorum quia enim illum, aspernatur odio
					accusantium deserunt autem ex doloribus maxime voluptatem, cupiditate
					animi explicabo? Sed! Lorem ipsum dolor sit amet consectetur
					adipisicing elit. Placeat veritatis molestiae quaerat eaque aliquam
					neque voluptatem accusantium corporis voluptas quidem at totam
					voluptate qui illo pariatur facilis, rerum doloremque ea.
					Necessitatibus iure pariatur eligendi dolorem vitae adipisci quo hic
					aut iusto corrupti quaerat repudiandae, voluptas corporis, voluptate,
					aliquid dolorum commodi exercitationem ex enim nisi assumenda minus ab
					aperiam. Dolore, voluptatibus. Ut consectetur incidunt minus facere
					eligendi fugiat id, distinctio magni autem dolor eveniet dolores nisi
					saepe quidem numquam facilis dolore quam. Iste officia laborum,
					adipisci sed perferendis labore cumque aperiam?
				</template>
			</v3-demo-block>
		</div>
		<div class="demo__item">
			<v3-row :gutter="20" :type="'flex'">
				<v3-col :span="4">
					<div>123</div>
				</v3-col>

				<v3-col :span="4">
					<div>456</div>
				</v3-col>
				<v3-col :span="8">
					<div>789</div>
				</v3-col>
			</v3-row>
			<v3-row :gutter="20" :type="'flex'">
				<v3-col :span="4">
					<div>abc</div>
				</v3-col>
				<v3-col :span="4">
					<div>def</div>
				</v3-col>
				<v3-col :span="2">
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
		const json = {
			a: 1,
			b: 2,
		};
		const state = {
			code: `${JSON.stringify(json, null, 2)}`,
			extraList: [
				{
					title: '转发',
					icon: 'v3-icon-resonserate',
				},
			],
		};

		return {
			state,
		};
	},
	methods: {
		handleExtraItemClick(v: any) {
			console.log('v :>> ', v);
		},
	},
});
</script>
<style lang="scss" scoped>
.demo__item {
	.v3-button {
		margin-left: 12px;
	}
	.v3-col {
		margin-top: 20px;
	}
	.v3-col div {
		line-height: 50px;
		background-color: #f3f4f5;
		border-radius: 6px;
	}
}
</style>
