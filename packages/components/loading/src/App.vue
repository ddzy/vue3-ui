<template>
	<div class="demo-container">
		<v3-row>
			<v3-col :span="12">
				<h3>全屏的 loading：</h3>
			</v3-col>
			<v3-col :span="12">
				<v3-button type="primary" @click="handleClick1">点我</v3-button>
			</v3-col>
		</v3-row>

		<v3-row>
			<v3-col :span="12">
				<h3>可传入 VNode：</h3>
			</v3-col>
			<v3-col :span="12">
				<v3-button type="primary" @click="handleClick2">点我</v3-button>
			</v3-col>
		</v3-row>

		<v3-row>
			<v3-col :span="12">
				<h3>在容器中使用：</h3>
			</v3-col>
			<v3-col :span="12">
				<v3-button type="primary" @click="handleClick3">点我</v3-button>

				<v3-demo-block v-loading="state.loading3" :descriptionTip="'概述'">
					<template #default>
						<h3 style="text-align: center; margin: 0;">标题</h3>
					</template>
					<template #description>
						测试描述测试描述
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

		<v3-row>
			<v3-col :span="12">
				<h3>通过自定义指令传值：</h3>
			</v3-col>
			<v3-col :span="12">
				<v3-button type="primary" @click="handleClick4">点我</v3-button>

				<v3-demo-block
					v-loading="{
						loading: state.loading4,
						content: '加载中...',
						backgroundColor: 'rgba(0, 0, 0, .4)',
						color: '#fff',
					}"
					:descriptionTip="'概述'"
				>
					<template #default>
						<h3 style="text-align: center; margin: 0;">标题</h3>
					</template>
					<template #description>
						测试描述测试描述
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

		<v3-row>
			<v3-col :span="12">
				<h3>通过 Composition API 的形式调用：</h3>
			</v3-col>
			<v3-col :span="12">
				<v3-button type="primary" @click="handleClick5">点我</v3-button>
			</v3-col>
		</v3-row>
	</div>
</template>
<script lang="ts">
import { defineComponent, h, reactive } from 'vue';
import V3Button from '@components/button/main';
import { useLoading } from '@components/loading/src/components/LoadingConstructor';

export default defineComponent({
	setup() {
		const state = reactive({
			loading3: false,
			loading4: false,
		});

		return {
			state,
		};
	},
	methods: {
		handleClick1() {
			const instance = this.$loading({
				fullscreen: true,
				content: `加载中。。。`,
			});

			setTimeout(() => {
				instance.close();
			}, 2000);
		},
		handleClick2() {
			const instance = this.$loading({
				fullscreen: true,
				content: h(
					V3Button,
					{
						onClick: () => {
							instance.close();
							this.$message({
								type: 'success',
								message: '手动关闭 loading~',
							});
						},
					},
					() => '取消'
				),
			});
		},
		handleClick3() {
			this.state.loading3 = !this.state.loading3;
		},
		handleClick4() {
			this.state.loading4 = !this.state.loading4;
		},
		handleClick5() {
			const { instance } = useLoading({
				fullscreen: true,
				content: h(
					V3Button,
					{
						onClick: () => {
							instance.close();
						},
					},
					() => '取消'
				),
			});
		},
	},
});
</script>
<style lang="scss" scoped></style>
