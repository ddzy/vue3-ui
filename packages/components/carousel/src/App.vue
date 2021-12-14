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
					:duration="500"
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

		<v3-row>
			<v3-col :span="12">
				<h3>自定义导航按钮：</h3>
			</v3-col>
			<v3-col>
				<v3-carousel
					v-model="state.carouselIndex4"
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

					<template #indicator>
						<ul class="custom-indicator__list">
							<li
								v-for="(v, i) in state.carouselList1"
								class="custom-indicator__item"
								:key="i"
								:class="{
									'is-active': state.carouselIndex4 === i,
								}"
								@click="handleIndicatorClick4(i)"
							></li>
						</ul>
					</template>
				</v3-carousel>
			</v3-col>
		</v3-row>

		<v3-row>
			<v3-col :span="12">
				<h3>内置不同样式的导航按钮：</h3>
			</v3-col>
			<v3-col :span="6">
				<div style="width: 300px; height: 300px">
					<v3-carousel
						v-model="state.carouselIndex5"
						class="common-carousel"
						indicatorType="dot"
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
				</div>
			</v3-col>
			<v3-col :span="6">
				<div style="width: 300px; height: 300px">
					<v3-carousel
						v-model="state.carouselIndex5"
						class="common-carousel"
						indicatorType="line"
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
				</div>
			</v3-col>
		</v3-row>

		<v3-row>
			<v3-col :span="12">
				<h3>禁用状态：</h3>
			</v3-col>
			<v3-col>
				<div style="width: 500px; height: 300px">
					<v3-carousel
						v-model="state.carouselIndex6"
						class="common-carousel"
						disabled
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
				</div>
			</v3-col>
		</v3-row>
	</div>
</template>
<script lang="ts">
import {
	defineComponent,
	h,
	nextTick,
	onMounted,
	reactive,
	ref,
	watch,
} from 'vue';

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
			carouselIndex4: 0,
			carouselIndex5: 0,
			carouselIndex6: 0,
		});

		function handleIndicatorClick4(rowIndex: number) {
			state.carouselIndex4 = rowIndex;
		}

		return {
			state,
			handleIndicatorClick4,
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

	:deep(.custom-indicator__list) {
		display: flex;
		justify-content: center;
		align-items: center;
		transform: translate3d(0, 0, 0);
		.custom-indicator__item {
			width: 16px;
			height: 16px;
			margin-left: $margin-small;
			border-radius: 50%;
			background-color: rgba(255, 255, 255, 0.3);
			cursor: pointer;
			&.is-active,
			&:hover {
				background-color: rgba(255, 255, 255, 0.8);
			}
		}
	}
}
</style>
