<template>
	<div class="demo-container">
		<v3-row>
			<v3-col :span="12">
				<h3>在容器中使用：</h3>
			</v3-col>
			<v3-col :span="12">
				<v3-demo-block :descriptionTip="'概述'">
					<template #default>
						<h3 style="text-align: center; margin: 0;">标题</h3>
					</template>
					<template #description>
						<v3-button type="primary" @click="handleClick1"
							>点击 loading</v3-button
						>
					</template>
					<template #detail>
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
import { defineComponent, reactive } from 'vue';

export default defineComponent({
	setup() {
		const state = reactive({});

		return {
			state,
		};
	},
	methods: {
		handleClick1() {
			const instance = this.$loading({});

			console.log('instance :>> ', instance);
		},
	},
});
</script>
<style lang="scss" scoped></style>
