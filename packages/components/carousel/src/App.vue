<template>
	<div class="demo-container">
		<v3-row>
			<v3-col :span="12">
				<h3>基本的轮播图：</h3>
			</v3-col>
			<v3-col>
				<div style="width: 500px; height: 300px">
					<v3-carousel v-model="state.carouselIndex1">
						<v3-carousel-item
							v-for="v in state.carouselList1"
							:key="v.id"
							:style="{
								backgroundImage: `url(${v.coverImg})`,
								backgroundRepeat: 'no-repeat',
								backgroundSize: 'cover',
								backgroundPosition: 'center center',
							}"
						></v3-carousel-item>
					</v3-carousel>
				</div>
			</v3-col>
		</v3-row>

		<v3-row>
			<v3-col :span="12">
				<h3>渐变形式：</h3>
			</v3-col>
			<v3-col>
				<v3-carousel
					v-model="state.carouselIndex2"
					effect="fade"
					:width="500"
					:height="300"
				>
					<v3-carousel-item
						v-for="v in state.carouselList1"
						:key="v.id"
						:style="{
							backgroundImage: `url(${v.coverImg})`,
							backgroundRepeat: 'no-repeat',
							backgroundSize: 'cover',
							backgroundPosition: 'center center',
						}"
					></v3-carousel-item>
				</v3-carousel>
			</v3-col>
		</v3-row>

		<v3-row>
			<v3-col :span="12">
				<h3>自定义箭头</h3>
			</v3-col>
			<v3-col>
				<v3-carousel
					v-model="state.carouselIndex3"
					effect="slide"
					:width="500"
					:height="300"
				>
					<v3-carousel-item
						v-for="v in state.carouselList1"
						:key="v.id"
						:style="{
							backgroundImage: `url(${v.coverImg})`,
							backgroundRepeat: 'no-repeat',
							backgroundSize: 'cover',
							backgroundPosition: 'center center',
						}"
					></v3-carousel-item>

					<template #arrowLeft>
						<div
							style="display: flex; justify-content: center; align-items: center; width: 40px; height: 40px; background-color: #fff; border-radius: 50%; color: #000; cursor: pointer"
						>
							左
						</div>
					</template>
					<template #arrowRight>
						<div
							style="display: flex; justify-content: center; align-items: center; width: 40px; height: 40px; background-color: #fff; border-radius: 50%; color: #000; cursor: pointer"
						>
							右
						</div>
					</template>
				</v3-carousel>
			</v3-col>
		</v3-row>

		<v3-row>
			<v3-col :span="12">
				<h3>自定义箭头的显示时机：</h3>
			</v3-col>
			<v3-col>
				<div style="width: 500px; height: 300px">
					<v3-carousel showArrow="hover">
						<v3-carousel-item
							v-for="v in state.carouselList1"
							:key="v.id"
							:style="{
								backgroundImage: `url(${v.coverImg})`,
								backgroundRepeat: 'no-repeat',
								backgroundSize: 'cover',
								backgroundPosition: 'center center',
							}"
						></v3-carousel-item>
					</v3-carousel>
				</div>
			</v3-col>
		</v3-row>

		<v3-row>
			<v3-col :span="12">
				<h3>自定义切换时的过渡时间、过渡曲线</h3>
			</v3-col>
			<v3-col>
				<div
					style="width: 500px; height: 300px; border: 1px solid rgba(221, 221, 221, 1)"
				>
					<v3-carousel :duration="300" :timingFunction="'ease'">
						<v3-carousel-item v-for="(v, i) in state.carouselList1" :key="v.id">
							<div
								style="display: flex; justify-content: center; align-items: center; height: 100%;"
							>
								<p style="font-size: 30px; font-weight: bold">Slide {{ i }}</p>
							</div>
						</v3-carousel-item>
					</v3-carousel>
				</div>
			</v3-col>
		</v3-row>
	</div>
</template>
<script lang="ts">
import { defineComponent, h, onMounted, reactive, watch } from 'vue';

export default defineComponent({
	setup(props, context) {
		const state = reactive({
			carouselList1: [
				{
					id: 1,
					title: '图片一',
					coverImg: 'https://oos.yyge.top/test/images/1.jpg',
				},
				{
					id: 2,
					title: '图片二',
					coverImg: 'https://oos.yyge.top/test/images/2.png',
				},
				{
					id: 3,
					title: '图片三',
					coverImg: 'https://oos.yyge.top/test/images/3.png',
				},
				{
					id: 4,
					title: '图片四',
					coverImg: 'https://oos.yyge.top/test/images/4.png',
				},
			],
			carouselIndex1: 0,
			carouselIndex2: 0,
			carouselIndex3: 0,
		});

		onMounted(() => {
			// window.setInterval(() => {
			// 	if (state.carouselIndex1 >= state.carouselList1.length - 1) {
			// 		state.carouselIndex1 = 0;
			// 	} else {
			// 		state.carouselIndex1 += 1;
			// 	}
			// }, 2000);
		});

		return {
			state,
		};
	},
	methods: {},
});
</script>
<style lang="scss" scoped></style>
