# 轮播 Carousel

## 基本用法

:::demo

```vue
<template>
	<v3-carousel v-model="state.carouselIndex" :height="300">
		<v3-carousel-item
			v-for="(v, i) in state.carouselList"
			:key="v.id"
			:style="{
				backgroundColor: v.bgColor,
			}"
		>
		</v3-carousel-item>
	</v3-carousel>
</template>
<script lang="ts" setup>
import { defineComponent, reactive } from 'vue';

const state = reactive({
	carouselIndex: 0,
	carouselList: [
		{
			id: 1,
			bgColor: 'rgba(0, 160, 255, 1)',
		},
		{
			id: 2,
			bgColor: 'rgba(99, 185, 49, 1)',
		},
		{
			id: 3,
			bgColor: 'rgba(201, 27, 38, 1)',
		},
		{
			id: 4,
			bgColor: 'rgba(237, 170, 83, 1)',
		},
	],
});
</script>
```

:::

## 渐变轮播图

:::demo

```vue
<template>
	<v3-carousel v-model="state.carouselIndex" effect="fade" :height="300">
		<v3-carousel-item
			v-for="v in state.carouselList"
			:key="v.id"
			:style="{
				backgroundImage: `url(${v.coverImg})`,
				bakgroundRpeat: 'no-repeat',
				backgroundSize: 'cover',
			}"
		>
		</v3-carousel-item>
	</v3-carousel>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
	setup() {
		const state = reactive({
			carouselIndex: 0,
			carouselList: [
				{
					id: 1,
					coverImg: 'https://oos.yyge.top/test/images/5.jpg',
				},
				{
					id: 2,
					coverImg: 'https://oos.yyge.top/test/images/6.jpg',
				},
				{
					id: 3,
					coverImg: 'https://oos.yyge.top/test/images/7.jpg',
				},
				{
					id: 4,
					coverImg: 'https://oos.yyge.top/test/images/8.jpg',
				},
			],
		});

		return {
			state,
		};
	},
});
</script>
<style module lang="postcss"></style>
```

:::

## 不同样式的导航按钮

:::demo

```vue
<template>
	<v3-row :gutter="20">
		<v3-col :span="6">
			<v3-carousel
				v-model="state.carouselIndex"
				indicatorType="dot"
				:height="300"
			>
				<v3-carousel-item
					v-for="(v, i) in state.carouselList"
					:key="v.id"
					:style="{
						backgroundColor: v.bgColor,
					}"
				>
					Slide {{ i }}
				</v3-carousel-item>
			</v3-carousel>
		</v3-col>
		<v3-col :span="6">
			<v3-carousel
				v-model="state.carouselIndex"
				indicatorType="line"
				:height="300"
			>
				<v3-carousel-item
					v-for="(v, i) in state.carouselList"
					:key="v.id"
					:style="{
						backgroundColor: v.bgColor,
					}"
				>
					Slide {{ i }}
				</v3-carousel-item>
			</v3-carousel>
		</v3-col>
	</v3-row>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
	setup() {
		const state = reactive({
			carouselIndex: 0,
			carouselList: [
				{
					id: 1,
					bgColor: 'rgba(0, 160, 255, 1)',
				},
				{
					id: 2,
					bgColor: 'rgba(99, 185, 49, 1)',
				},
				{
					id: 3,
					bgColor: 'rgba(201, 27, 38, 1)',
				},
				{
					id: 4,
					bgColor: 'rgba(237, 170, 83, 1)',
				},
			],
		});

		return {
			state,
		};
	},
});
</script>
```

:::

## 垂直方向

:::demo

```vue
<template>
	<v3-carousel
		v-model="state.carouselIndex"
		direction="vertical"
		indicatorPosition="left"
		:autoplay="true"
		:width="500"
		:height="300"
	>
		<v3-carousel-item
			v-for="v in state.carouselList"
			:key="v.id"
			:style="{
				backgroundColor: v.bgColor,
			}"
		>
		</v3-carousel-item>
	</v3-carousel>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
	setup() {
		const state = reactive({
			carouselIndex: 0,
			carouselList: [
				{
					id: 1,
					bgColor: 'rgba(0, 160, 255, 1)',
				},
				{
					id: 2,
					bgColor: 'rgba(99, 185, 49, 1)',
				},
				{
					id: 3,
					bgColor: 'rgba(201, 27, 38, 1)',
				},
				{
					id: 4,
					bgColor: 'rgba(237, 170, 83, 1)',
				},
			],
		});

		return {
			state,
		};
	},
});
</script>
```

:::

## API

### Carousel Props

| 参数名            | 说明                                       | 类型           | 可选值                                        | 默认值                            | 是否必填 |
| ----------------- | ------------------------------------------ | -------------- | --------------------------------------------- | --------------------------------- | -------- |
| modelValue        | `v-model`绑定的值                          | number         |                                               | -1                                |          |
| defaultIndex      | 默认要展示的轮播图下标                     | number         |                                               | 0                                 |          |
| width             | 轮播图容器宽度                             | number         |                                               | 0                                 |          |
| height            | 轮播图容器高度                             | number         |                                               | 0                                 |          |
| effect            | 轮播图形式                                 | string         | slide/fade                                    | slide                             |          |
| autoplay          | 是否自动播放                               | boolean/object | `{ interval: number; pauseOnHover: boolean }` | false                             |          |
| duration          | 同`transition-duration`                    | number         |                                               | 300                               |          |
| timingFunction    | 同`transition-timing-function`             | string         |                                               | cubic-bezier(0.17, 0.84, 0.44, 1) |          |
| disabled          | 是否禁用轮播图（不响应一切事件和切换动作） | boolean        |                                               | false                             |          |
| direction         | 轮播的方向                                 | string         | horizontal/vertical                           | horizontal                        |          |
| showArrow         | 是否显示切换箭头                           | string         | always/hover/never                            | always                            |          |
| showIndicator     | 是否显示导航按钮                           | boolean        |                                               | true                              |          |
| indicatorType     | 导航按钮的类型                             | string         | dot/line                                      | dot                               |          |
| indicatorPosition | 导航按钮的位置                             | string         | left/top/right/bottom                         | bottom                            |          |

### Carousel Slots

| 插槽名     | 说明           | 子标签           |
| ---------- | -------------- | ---------------- |
| default    | 默认插槽       | v3-carousel-item |
| arrowLeft  | 自定义左箭头   |                  |
| arrowRight | 自定义右箭头   |                  |
| indicator  | 自定义导航按钮 |                  |

### CarouselItem Slots

| 插槽名  | 说明     | 子标签 |
| ------- | -------- | ------ |
| default | 默认插槽 |        |
