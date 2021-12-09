<template>
	<div class="demo-container">
		<v3-row>
			<v3-col :span="12">
				<h3>基本的轮播图：</h3>
			</v3-col>
			<v3-col>
				<div style="width: 500px; height: 300px">
					<v3-carousel v-model="state.carouselIndex1" class="common-carousel">
						<v3-carousel-item v-for="(v, i) in state.carouselList1" :key="v.id">
							<div
								class="common-carousel-item__content"
								:style="{
									backgroundColor: v.bgColor,
									color: '#fff',
								}"
							>
								<p>Slide {{ i }}</p>
							</div>
						</v3-carousel-item>
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
					class="common-carousel"
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
					>
					</v3-carousel-item>
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
					class="common-carousel"
					:width="500"
					:height="300"
				>
					<v3-carousel-item v-for="(v, i) in state.carouselList1" :key="v.id">
						<div
							class="common-carousel-item__content"
							:style="{
								backgroundColor: v.bgColor,
								color: '#fff',
							}"
						>
							<p>Slide {{ i }}</p>
						</div>
					</v3-carousel-item>

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
					<v3-carousel showArrow="hover" class="common-carousel">
						<v3-carousel-item v-for="(v, i) in state.carouselList1" :key="v.id">
							<div
								class="common-carousel-item__content"
								:style="{
									backgroundColor: v.bgColor,
									color: '#fff',
								}"
							>
								<p>Slide {{ i }}</p>
							</div>
						</v3-carousel-item>
					</v3-carousel>
				</div>
			</v3-col>
		</v3-row>

		<v3-row>
			<v3-col :span="12">
				<h3>自定义切换时的过渡时间、过渡曲线：</h3>
			</v3-col>
			<v3-col>
				<v3-carousel
					class="common-carousel"
					:duration="300"
					:timingFunction="'ease'"
					:width="500"
					:height="300"
				>
					<v3-carousel-item v-for="(v, i) in state.carouselList1" :key="v.id">
						<div
							class="common-carousel-item__content"
							:style="{
								backgroundColor: v.bgColor,
								color: '#fff',
							}"
						>
							<p>Slide {{ i }}</p>
						</div>
					</v3-carousel-item>
				</v3-carousel>
			</v3-col>
		</v3-row>

		<v3-row>
			<v3-col :span="12">
				<h3>开启自动轮播：</h3>
			</v3-col>
			<v3-col>
				<v3-carousel
					class="common-carousel"
					:width="500"
					:height="300"
					:autoplay="true"
				>
					<v3-carousel-item v-for="(v, i) in state.carouselList1" :key="v.id">
						<div
							class="common-carousel-item__content"
							:style="{
								backgroundColor: v.bgColor,
								color: '#fff',
							}"
						>
							<p>Slide {{ i }}</p>
						</div>
					</v3-carousel-item>
				</v3-carousel>
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
					coverImg: 'https://oos.yyge.top/test/images/5.jpg',
					bgColor: 'rgba(0, 160, 255, 1)',
				},
				{
					id: 2,
					title: '图片二',
					coverImg: 'https://oos.yyge.top/test/images/6.jpg',
					bgColor: 'rgba(99, 185, 49, 1)',
				},
				{
					id: 3,
					title: '图片三',
					coverImg: 'https://oos.yyge.top/test/images/7.jpg',
					bgColor: 'rgba(201, 27, 38, 1)',
				},
				{
					id: 4,
					title: '图片四',
					coverImg: 'https://oos.yyge.top/test/images/8.jpg',
					bgColor: 'rgba(237, 170, 83, 1)',
				},
			],
			carouselIndex1: 0,
			carouselIndex2: 0,
			carouselIndex3: 0,
		});

		return {
			state,
		};
	},
	methods: {},
});
</script>
<style lang="scss" scoped>
.common-carousel {
	:deep(.common-carousel-item__content) {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		font-size: 30px;
		font-weight: bold;
	}
}
</style>
