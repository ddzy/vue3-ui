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
			<v3-col :span="4">
				<v3-button type="primary" @click="handleClick3">点我</v3-button>

				<v3-card
					style="margin-top: 6px;"
					title="标题"
					v-loading="state.loading3"
				>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, fugiat
					consectetur blanditiis aspernatur, magnam cumque dignissimos iusto
					quisquam velit quidem deserunt! Quaerat ad incidunt ducimus,
					distinctio omnis rerum vitae obcaecati.
				</v3-card>
			</v3-col>
		</v3-row>

		<v3-row>
			<v3-col :span="12">
				<h3>通过自定义指令传值：</h3>
			</v3-col>
			<v3-col :span="4">
				<v3-button type="primary" @click="handleClick4">点我</v3-button>

				<v3-card
					style="margin-top: 6px;"
					v-loading="{
						loading: state.loading4,
						content: '加载中...',
						backgroundColor: 'rgba(0, 0, 0, .4)',
						color: '#fff',
					}"
					:bodyStyle="{
						padding: 0,
					}"
				>
					<div class="img"></div>

					<template #footer>
						<div class="action">
							<div class="action__tip">
								美丽的风景~
							</div>
							<div class="action__btn">
								<v3-button type="text">查看详情</v3-button>
							</div>
						</div>
					</template>
				</v3-card>
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
<style lang="scss" scoped>
.img {
	height: 200px;
	background: url('https://oos.yyge.top/test%2Fimages%2F1.jpg') no-repeat center
		center / cover;
	background-image: url('https://oos.yyge.top/test%2Fimages%2F1.jpg');
}
.action {
	display: flex;
	align-items: center;
	justify-content: space-between;
}
</style>
