<template>
	<div class="demo-container">
		<v3-row>
			<v3-col>
				<h3>基本用法：</h3>
			</v3-col>
		</v3-row>
		<v3-row>
			<v3-col>
				<v3-button type="primary" @click="handleClick1">打开遮罩层</v3-button>
				<v3-backdrop
					customClass="backdrop-1"
					:visible="state.showBackdrop1"
					@click="state.showBackdrop1 = false"
				>
					<img
						src="https://oos.yyge.top/2021/6/30/duan/test/ChMkJ1bKxe-IGplXACGf0sjfYE4AALHdgJwnqcAIZ_q211.jpg"
						width="800"
						height="1200"
						alt=""
					/>
				</v3-backdrop>
			</v3-col>
		</v3-row>

		<v3-row>
			<v3-col>
				<h3>避免滚动穿透：</h3>
			</v3-col>
		</v3-row>
		<v3-row>
			<v3-col>
				<v3-button type="primary" @click="handleClick2">打开遮罩层</v3-button>
				<v3-backdrop
					customClass="backdrop-2"
					:visible="state.showBackdrop2"
					:fixed="true"
					@click="state.showBackdrop2 = false"
				>
					<img src="" height="1200" alt="" />
				</v3-backdrop>
			</v3-col>
		</v3-row>

		<v3-row>
			<v3-col>
				<h3>自定义类名：</h3>
			</v3-col>
		</v3-row>
		<v3-row>
			<v3-col>
				<v3-button type="primary" @click="handleClick3">打开遮罩层</v3-button>
				<v3-backdrop
					customClass="backdrop-3"
					:visible="state.showBackdrop3"
					:fixed="true"
					@click="state.showBackdrop3 = false"
				>
					<img src="" height="1200" alt="" />
				</v3-backdrop>
			</v3-col>
		</v3-row>
	</div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
	setup() {
		const state = reactive({
			showBackdrop1: false,
			showBackdrop2: false,
			showBackdrop3: false,
		});

		function handleClick1() {
			state.showBackdrop1 = true;
		}
		function handleClick2() {
			state.showBackdrop2 = true;
		}
		function handleClick3() {
			state.showBackdrop3 = true;
		}

		return {
			state,
			handleClick1,
			handleClick2,
			handleClick3,
		};
	},
	methods: {},
});
</script>
<style lang="scss">
body {
	height: 1200px;
}
</style>
<style lang="scss" scoped>
.backdrop-1,
.backdrop-2,
.backdrop-3 {
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
