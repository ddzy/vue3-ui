<template>
	<div class="demo-container">
		<v3-row>
			<v3-col :span="12">
				<h3>基本使用：</h3>
			</v3-col>
			<v3-col :span="12">
				<v3-demo-block>
					<template #default>
						<h4 style="text-align: center; margin: 0;">标题</h4>
					</template>
					<template #description>
						这是一段描述信息，这是一段描述信息，这是一段描述信息
					</template>
					<template #code>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas
						veritatis quidem cum unde dolorum quia enim illum, aspernatur odio
						accusantium deserunt autem ex doloribus maxime voluptatem,
						cupiditate animi explicabo? Sed! Lorem ipsum dolor sit amet
						consectetur adipisicing elit. Placeat veritatis molestiae quaerat
						eaque aliquam neque voluptatem accusantium corporis voluptas quidem
						at totam voluptate qui illo pariatur facilis, rerum doloremque ea.
						Necessitatibus iure pariatur eligendi dolorem vitae adipisci quo hic
						aut iusto corrupti quaerat repudiandae, voluptas corporis,
						voluptate, aliquid dolorum commodi exercitationem ex enim nisi
						assumenda minus ab aperiam. Dolore, voluptatibus. Ut consectetur
						incidunt minus facere eligendi fugiat id, distinctio magni autem
						dolor eveniet dolores nisi saepe quidem numquam facilis dolore quam.
						Iste officia laborum, adipisci sed perferendis labore cumque
						aperiam?
					</template>
				</v3-demo-block>
			</v3-col>
		</v3-row>

		<v3-row>
			<v3-col :span="12">
				<h3>自定义描述区域的提示：</h3>
			</v3-col>
			<v3-col :span="12">
				<v3-demo-block :descriptionTip="'简介'">
					<template #default>
						<h4 style="text-align: center; margin: 0;">标题</h4>
					</template>
					<template #description>
						这是一段描述信息，这是一段描述信息，这是一段描述信息
					</template>
					<template #code>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas
						veritatis quidem cum unde dolorum quia enim illum, aspernatur odio
						accusantium deserunt autem ex doloribus maxime voluptatem,
						cupiditate animi explicabo? Sed! Lorem ipsum dolor sit amet
						consectetur adipisicing elit. Placeat veritatis molestiae quaerat
						eaque aliquam neque voluptatem accusantium corporis voluptas quidem
						at totam voluptate qui illo pariatur facilis, rerum doloremque ea.
						Necessitatibus iure pariatur eligendi dolorem vitae adipisci quo hic
						aut iusto corrupti quaerat repudiandae, voluptas corporis,
						voluptate, aliquid dolorum commodi exercitationem ex enim nisi
						assumenda minus ab aperiam. Dolore, voluptatibus. Ut consectetur
						incidunt minus facere eligendi fugiat id, distinctio magni autem
						dolor eveniet dolores nisi saepe quidem numquam facilis dolore quam.
						Iste officia laborum, adipisci sed perferendis labore cumque
						aperiam?
					</template>
				</v3-demo-block>
			</v3-col>
		</v3-row>

		<v3-row>
			<v3-col :span="12">
				<h3>自定义伸缩按钮的文本：</h3>
			</v3-col>
			<v3-col :span="12">
				<v3-demo-block defaultBtnText="展开" expandedBtnText="收起">
					<template #default>
						<h4 style="text-align: center; margin: 0;">标题</h4>
					</template>
					<template #description>
						这是一段描述信息，这是一段描述信息，这是一段描述信息
					</template>
					<template #code>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas
						veritatis quidem cum unde dolorum quia enim illum, aspernatur odio
						accusantium deserunt autem ex doloribus maxime voluptatem,
						cupiditate animi explicabo? Sed! Lorem ipsum dolor sit amet
						consectetur adipisicing elit. Placeat veritatis molestiae quaerat
						eaque aliquam neque voluptatem accusantium corporis voluptas quidem
						at totam voluptate qui illo pariatur facilis, rerum doloremque ea.
						Necessitatibus iure pariatur eligendi dolorem vitae adipisci quo hic
						aut iusto corrupti quaerat repudiandae, voluptas corporis,
						voluptate, aliquid dolorum commodi exercitationem ex enim nisi
						assumenda minus ab aperiam. Dolore, voluptatibus. Ut consectetur
						incidunt minus facere eligendi fugiat id, distinctio magni autem
						dolor eveniet dolores nisi saepe quidem numquam facilis dolore quam.
						Iste officia laborum, adipisci sed perferendis labore cumque
						aperiam?
					</template>
				</v3-demo-block>
			</v3-col>
		</v3-row>

		<v3-row>
			<v3-col :span="12">
				<h3>自定义功能按钮：</h3>
			</v3-col>
			<v3-col :span="12">
				<v3-demo-block
					:descriptionTip="'简介'"
					:extraList="state.extraList"
					@extraClick="handleExtraItemClick"
				>
					<template #default>
						<h4 style="text-align: center; margin: 0;">标题</h4>
					</template>
					<template #description>
						这是一段描述信息，这是一段描述信息，这是一段描述信息
					</template>
					<template #code>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas
						veritatis quidem cum unde dolorum quia enim illum, aspernatur odio
						accusantium deserunt autem ex doloribus maxime voluptatem,
						cupiditate animi explicabo? Sed! Lorem ipsum dolor sit amet
						consectetur adipisicing elit. Placeat veritatis molestiae quaerat
						eaque aliquam neque voluptatem accusantium corporis voluptas quidem
						at totam voluptate qui illo pariatur facilis, rerum doloremque ea.
						Necessitatibus iure pariatur eligendi dolorem vitae adipisci quo hic
						aut iusto corrupti quaerat repudiandae, voluptas corporis,
						voluptate, aliquid dolorum commodi exercitationem ex enim nisi
						assumenda minus ab aperiam. Dolore, voluptatibus. Ut consectetur
						incidunt minus facere eligendi fugiat id, distinctio magni autem
						dolor eveniet dolores nisi saepe quidem numquam facilis dolore quam.
						Iste officia laborum, adipisci sed perferendis labore cumque
						aperiam?
					</template>
				</v3-demo-block>
			</v3-col>
		</v3-row>
	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	setup() {
		const state = {
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
		handleExtraItemClick(v: { title: string; icon: string }) {
			alert(v.title);
		},
	},
});
</script>
<style lang="scss" scoped></style>
