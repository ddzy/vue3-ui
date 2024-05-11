// @ts-nocheck

import { mount } from '@vue/test-utils';
import V3Carousel from '../main';
import V3CarouselItem from '@components/carousel-item/main';

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
	test('V3Carousel 组件应该正常渲染', async (done) => {
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
					carouselIndex: this.carouselIndexFromProps,
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

		setTimeout(async () => {
			expect(wrapper.findAll('.v3-carousel__item')[0].classes()).toContain(
				'v3-carousel-item--current',
			);
			expect(wrapper.findAll('.v3-carousel__item')[1].classes()).toContain(
				'v3-carousel-item--next',
			);
			expect(wrapper.findAll('.v3-carousel__item')[3].classes()).toContain(
				'v3-carousel-item--prev',
			);
			expect(wrapper.find('.v3-carousel-item--current').text()).toBe('Slide 0');

			await wrapper.setProps({
				carouselIndexFromProps: 2,
			});
			setTimeout(async () => {
				expect(wrapper.findAll('.v3-carousel__item')[2].classes()).toContain(
					'v3-carousel-item--current',
				);
				expect(wrapper.findAll('.v3-carousel__item')[3].classes()).toContain(
					'v3-carousel-item--next',
				);
				expect(wrapper.findAll('.v3-carousel__item')[1].classes()).toContain(
					'v3-carousel-item--prev',
				);
				expect(wrapper.find('.v3-carousel-item--current').text()).toBe(
					'Slide 2',
				);

				// 点击左切换箭头
				await wrapper.findAll('.v3-carousel__arrow')[0].trigger('click');
				expect(wrapper.findAll('.v3-carousel__item')[1].classes()).toContain(
					'v3-carousel-item--current',
				);
				expect(wrapper.vm.carouselIndex).toBe(1);

				// 点击右切换箭头
				await wrapper.findAll('.v3-carousel__arrow')[1].trigger('click');
				expect(wrapper.findAll('.v3-carousel__item')[2].classes()).toContain(
					'v3-carousel-item--current',
				);
				expect(wrapper.vm.carouselIndex).toBe(2);

				// 点击任意一个导航按钮
				await wrapper.find('.v3-carousel-indicator__item').trigger('click');
				expect(wrapper.findAll('.v3-carousel__item')[0].classes()).toContain(
					'v3-carousel-item--current',
				);
				expect(wrapper.vm.carouselIndex).toBe(0);

				done();
			}, 0);
		}, 0);
	});

	test('V3Carousel 组件可以接收【defaultIndex】配置项，用来配置默认要显示的轮播图下标，优先级比【v-model】高', async (done) => {
		const wrapper = mount({
			components: {
				V3Carousel,
				V3CarouselItem,
			},
			template: `
        <div style="width: 500px; height: 300px">
          <v3-carousel v-model="carouselIndex" :defaultIndex="3">
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
		});

		setTimeout(() => {
			expect(wrapper.findAll('.v3-carousel__item')[3].classes()).toContain(
				'v3-carousel-item--current',
			);

			done();
		}, 0);
	});

	test('V3Carousel 组件可以接收【effect】配置项，用来启用渐隐形式的轮播图', async (done) => {
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
          <v3-carousel v-model="carouselIndex" effect="fade">
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
					carouselIndex: this.carouselIndexFromProps,
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

		setTimeout(async () => {
			expect(wrapper.find('.v3-carousel').classes()).toContain(
				'is-effect-fade',
			);

			await wrapper.setProps({
				carouselIndexFromProps: 2,
			});
			setTimeout(() => {
				expect(wrapper.findAll('.v3-carousel__item')[2].classes()).toContain(
					'v3-carousel-item--current',
				);
				expect(wrapper.findAll('.v3-carousel__item')[3].classes()).toContain(
					'v3-carousel-item--next',
				);
				expect(wrapper.findAll('.v3-carousel__item')[1].classes()).toContain(
					'v3-carousel-item--prev',
				);
				expect(wrapper.find('.v3-carousel-item--current').text()).toBe(
					'Slide 2',
				);

				done();
			}, 0);
		}, 0);
	});

	test('V3Carousel 组件可以通过【slot=arrowLeft】、【slot=arrowRight】，来自定义切换箭头', async (done) => {
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
          <v3-carousel v-model="carouselIndex" effect="fade">
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
        </div>
      `,
			data() {
				return {
					carouselIndex: this.carouselIndexFromProps,
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

		const arrowList = wrapper.findAll('.v3-carousel__arrow');
		expect(arrowList.length).toBe(2);
		expect(arrowList[0].classes()).toContain('is-left');
		expect(arrowList[0].text()).toBe('左');
		expect(arrowList[1].classes()).toContain('is-right');
		expect(arrowList[1].text()).toBe('右');

		await arrowList[1].trigger('click');
		expect(wrapper.vm.carouselIndex).toBe(1);
		expect(wrapper.findAll('.v3-carousel__item')[1].classes()).toContain(
			'v3-carousel-item--current',
		);

		await arrowList[0].trigger('click');
		expect(wrapper.vm.carouselIndex).toBe(0);
		expect(wrapper.findAll('.v3-carousel__item')[0].classes()).toContain(
			'v3-carousel-item--current',
		);

		done();
	});

	test('V3Carousel 组件可以接收【showArrow】配置项，用来配置箭头的显示时机', async (done) => {
		const wrapper = mount({
			components: {
				V3Carousel,
				V3CarouselItem,
			},
			template: `
        <div style="width: 500px; height: 300px">
          <v3-carousel v-model="carouselIndex" showArrow="hover">
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

        <div style="width: 500px; height: 300px">
          <v3-carousel v-model="carouselIndex" showArrow="always">
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

        <div style="width: 500px; height: 300px">
          <v3-carousel v-model="carouselIndex" showArrow="never">
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
		});

		const carouselList = wrapper.findAll('.v3-carousel');
		expect(carouselList[0].classes()).toContain('is-show-arrow-hover');
		expect(carouselList[1].classes()).toContain('is-show-arrow-always');
		expect(carouselList[2].classes()).toContain('is-show-arrow-never');

		expect(carouselList[1].findAll('.v3-carousel__arrow.is-show').length).toBe(
			2,
		);
		expect(carouselList[2].findAll('.v3-carousel__arrow.is-show').length).toBe(
			0,
		);

		done();
	});

	test('V3Carousel 组件可以接收【duration、timingFunction】配置项，用来自定义切换时的过渡时间、过渡曲线', async (done) => {
		const wrapper = mount({
			components: {
				V3Carousel,
				V3CarouselItem,
			},
			template: `
        <div style="width: 500px; height: 300px">
          <v3-carousel v-model="carouselIndex" :duration="0" :timingFunction="'ease'">
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
		});

		await wrapper.find('.v3-carousel__arrow').trigger('click');
		expect(wrapper.find('.v3-carousel__item').attributes().style).toContain(
			'transition-duration: 0ms; transition-timing-function: ease;',
		);

		done();
	});

	test('V3Carousel 组件可以通过【slot=indicator】，来自定义导航按钮', async (done) => {
		const wrapper = mount({
			components: {
				V3Carousel,
				V3CarouselItem,
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

            <template #indicator>
              <ul class="custom-indicator__list">
                <li
                  v-for="(v, i) in carouselList"
                  class="custom-indicator__item"
                  :key="i"
                  :class="{
                    'is-active': carouselIndex === i,
                  }"
                  @click="handleIndicatorItemClick(i)"
                ></li>
              </ul>
            </template>
          </v3-carousel>
        </div>
      `,
			data() {
				return {
					carouselIndex: 0,
					carouselList: commonCarouselList,
				};
			},
			methods: {
				handleIndicatorItemClick(rowIndex: number) {
					this.carouselIndex = rowIndex;
				},
			},
		});

		const customIndicatorList = wrapper.findAll('.custom-indicator__item');
		expect(customIndicatorList.length).toBe(4);
		expect(customIndicatorList[0].classes()).toContain('is-active');

		await customIndicatorList[2].trigger('click');
		expect(customIndicatorList[2].classes()).toContain('is-active');
		expect(wrapper.vm.carouselIndex).toBe(2);

		done();
	});

	test('V3Carousel 组件可以接收【indicatorType】配置项，用来启用不同样式的导航按钮', async (done) => {
		const wrapper = mount({
			components: {
				V3Carousel,
				V3CarouselItem,
			},
			template: `
        <div style="width: 500px; height: 300px">
          <v3-carousel v-model="carouselIndex" indicatorType="dot">
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

        <div style="width: 500px; height: 300px">
          <v3-carousel v-model="carouselIndex" indicatorType="line">
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
		});

		const carouselList = wrapper.findAll('.v3-carousel');
		expect(carouselList[0].classes()).toContain('is-indicator-type-dot');
		expect(carouselList[1].classes()).toContain('is-indicator-type-line');

		done();
	});

	test('V3Carousel 组件可以接收【disabled】配置项，用来禁用轮播图', async (done) => {
		const wrapper = mount({
			components: {
				V3Carousel,
				V3CarouselItem,
			},
			template: `
        <div style="width: 500px; height: 300px">
          <v3-carousel v-model="carouselIndex" disabled>
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
		});

		const carouselArrowList = wrapper.findAll('.v3-carousel__arrow');
		const carouselItemList = wrapper.findAll('.v3-carousel__item');

		expect(wrapper.find('.v3-carousel').classes()).toContain('is-disabled');

		// 点击左箭头
		await carouselArrowList[0].trigger('click');
		expect(
			carouselItemList[3].classes().includes('v3-carousel-item--current'),
		).toBeFalsy();
		expect(wrapper.vm.carouselIndex).toBe(0);

		// 点击右箭头
		await carouselArrowList[1].trigger('click');
		expect(
			carouselItemList[1].classes().includes('v3-carousel-item--current'),
		).toBeFalsy();
		expect(wrapper.vm.carouselIndex).toBe(0);

		setTimeout(async () => {
			const carouselIndicatorList = wrapper.findAll(
				'.v3-carousel-indicator__item',
			);

			// 点击任何一个导航按钮
			await carouselIndicatorList[2].trigger('click');
			expect(
				carouselItemList[2].classes().includes('v3-carousel-item--current'),
			).toBeFalsy();
			expect(wrapper.vm.carouselIndex).toBe(0);

			done();
		}, 0);
	});

	test('V3Carousel 组件可以接收【indicatorPosition】配置项，用来配置导航按钮的摆放位置', async (done) => {
		const wrapper = mount({
			components: {
				V3Carousel,
				V3CarouselItem,
			},
			template: `
        <div style="width: 500px; height: 300px">
          <v3-carousel v-model="carouselIndex" indicatorPosition="left">
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

        <div style="width: 500px; height: 300px">
          <v3-carousel v-model="carouselIndex" indicatorPosition="top">
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

        <div style="width: 500px; height: 300px">
          <v3-carousel v-model="carouselIndex" indicatorPosition="right">
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

        <div style="width: 500px; height: 300px">
          <v3-carousel v-model="carouselIndex" indicatorPosition="bottom">
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
		});

		const carouselList = wrapper.findAll('.v3-carousel');
		expect(carouselList[0].classes()).toContain('is-indicator-position-left');
		expect(carouselList[1].classes()).toContain('is-indicator-position-top');
		expect(carouselList[2].classes()).toContain('is-indicator-position-right');
		expect(carouselList[3].classes()).toContain('is-indicator-position-bottom');

		done();
	});

	test('V3Carousel 组件可以接收【direction】配置项，用来启用垂直方向上的轮播图', async (done) => {
		const wrapper = mount({
			components: {
				V3Carousel,
				V3CarouselItem,
			},
			template: `
        <div style="width: 500px; height: 300px">
          <v3-carousel v-model="carouselIndex" direction="vertical">
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
		});

		expect(wrapper.find('.v3-carousel.is-vertical').exists()).toBeTruthy();

		setTimeout(async () => {
			const carouselIndicatorList = wrapper.findAll(
				'.v3-carousel-indicator__item',
			);

			// 点击任意一个导航按钮
			await carouselIndicatorList[3].trigger('click');
			setTimeout(() => {
				const carouselItemList = wrapper.findAll('.v3-carousel__item');

				expect(carouselItemList[3].classes()).toContain(
					'v3-carousel-item--current',
				);
				expect(wrapper.vm.carouselIndex).toBe(3);

				done();
			}, 0);
		}, 0);
	});
});
