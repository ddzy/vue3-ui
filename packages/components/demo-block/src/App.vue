<template>
	<div class="demo-container">
		<div class="demo__item">
			<v3-demo-block
				:descriptionTip="'概述'"
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
				{
					title: '喜欢',
					icon: 'v3-icon-like',
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
<style lang="scss" scoped></style>
