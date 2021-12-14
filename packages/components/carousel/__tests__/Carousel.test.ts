// @ts-nocheck

import { mount } from '@vue/test-utils';
import V3Carousel from '../src/components/Carousel.vue';
import V3CarouselItem from '../src/components/CarouselItem.vue';

const commonCarouselList = [
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
];

describe('V3Carousel 组件测试：', () => {
	test('V3Carousel 组件应该正常渲染', async () => {
		const wrapper = mount({
			components: {
				V3Carousel,
				V3CarouselItem,
			},
			props: {
				carouselIndexFromProps: {
					type: Number,
					default: 0,
				},
			},
			template: `
        <div style="width: 500px; height: 300px">
          <v3-carousel v-model="carouselIndex">
            <v3-carousel-item v-for="(v, i) in carouselList" :key="v.id">
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
      `,
			data() {
				return {
					carouselIndex: 0,
					carouselList: commonCarouselList,
				};
			},
			watch: {
				carouselIndexFromProps: {
					immediate: true,
					handler() {
						this.carouselIndex = this.carouselIndexFromProps;
					},
				},
			},
		});

		expect(wrapper.find('.v3-carousel').exists()).toBeTruthy();
		expect(wrapper.findAll('.v3-carousel__item').length).toBe(4);
		expect(
			wrapper.findAll('.v3-carousel__item')[0].element.getAttribute('style')
		).toContain('display: block');
		expect(
			wrapper.findAll('.v3-carousel__item')[1].element.getAttribute('style')
		).toContain('display: none');
		expect(
			wrapper.findAll('.v3-carousel__item')[2].element.getAttribute('style')
		).toContain('display: none');
		expect(
			wrapper.findAll('.v3-carousel__item')[3].element.getAttribute('style')
		).toContain('display: none');
	});
});
