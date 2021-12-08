<template>
	<div class="demo-container">
		<v3-row>
			<v3-col :span="12">
				<h3>基本的轮播图：</h3>
			</v3-col>
			<v3-col>
				<div style="width: 500px; height: 300px">
					<v3-carousel>
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
				<v3-carousel effect="fade" :width="500" :height="300">
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
		});

		return {
			state,
		};
	},
	methods: {},
});
</script>
<style lang="scss" scoped></style>
