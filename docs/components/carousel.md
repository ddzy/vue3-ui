# 轮播 Carousel

## 基本用法

:::demo

```vue
<template>
	<v3-carousel v-model="currentActiveCarousel" height="300px">
		<v3-carousel-item
			v-for="(v, i) in carousels"
			:key="i"
			:style="{
				backgroundColor: v.bgColor,
			}"
		>
		</v3-carousel-item>
	</v3-carousel>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue';

const currentActiveCarousel = ref(0);
const carousels = ref([
	{
		bgColor: 'rgba(0, 160, 255, 1)',
	},
	{
		bgColor: 'rgba(99, 185, 49, 1)',
	},
	{
		bgColor: 'rgba(201, 27, 38, 1)',
	},
	{
		bgColor: 'rgba(237, 170, 83, 1)',
	},
]);
</script>
```

:::

## 渐变轮播图

:::demo

```vue
<template>
	<v3-carousel effect="fade" height="300px">
		<v3-carousel-item
			v-for="(v, i) in carousels"
			:key="i"
			:style="{
				backgroundColor: v.bgColor,
			}"
		>
		</v3-carousel-item>
	</v3-carousel>
</template>
<script lang="ts" setup>
import { defineComponent, reactive, ref } from 'vue';

const carousels = ref([
	{
		bgColor: 'rgba(0, 160, 255, 1)',
	},
	{
		bgColor: 'rgba(99, 185, 49, 1)',
	},
	{
		bgColor: 'rgba(201, 27, 38, 1)',
	},
	{
		bgColor: 'rgba(237, 170, 83, 1)',
	},
]);
</script>
```

:::

## 自动轮播

:::demo

```vue
<template>
	<v3-carousel autoplay height="300px">
		<v3-carousel-item
			v-for="(v, i) in carousels"
			:key="i"
			:style="{
				backgroundColor: v.bgColor,
			}"
		>
		</v3-carousel-item>
	</v3-carousel>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue';

const carousels = ref([
	{
		bgColor: 'rgba(0, 160, 255, 1)',
	},
	{
		bgColor: 'rgba(99, 185, 49, 1)',
	},
	{
		bgColor: 'rgba(201, 27, 38, 1)',
	},
	{
		bgColor: 'rgba(237, 170, 83, 1)',
	},
]);
</script>
```

:::

## 禁用轮播图

:::demo

```vue
<template>
	<v3-carousel disabled height="300px">
		<v3-carousel-item
			v-for="(v, i) in carousels"
			:key="i"
			:style="{
				backgroundColor: v.bgColor,
			}"
		>
		</v3-carousel-item>
	</v3-carousel>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue';

const carousels = ref([
	{
		bgColor: 'rgba(0, 160, 255, 1)',
	},
	{
		bgColor: 'rgba(99, 185, 49, 1)',
	},
	{
		bgColor: 'rgba(201, 27, 38, 1)',
	},
	{
		bgColor: 'rgba(237, 170, 83, 1)',
	},
]);
</script>
```

:::

## 控制各控件大小位置方向

:::demo

```vue
<template>
	<v3-space>
		<span>轮播方向：</span>
		<v3-radio-group v-model="direction">
			<v3-radio label="horizontal">horizontal</v3-radio>
			<v3-radio label="vertical">vertical</v3-radio>
		</v3-radio-group>
	</v3-space>
	<v3-space>
		<span>导航按钮类型：</span>
		<v3-radio-group v-model="indicatorType">
			<v3-radio label="dot">dot</v3-radio>
			<v3-radio label="line">line</v3-radio>
		</v3-radio-group>
	</v3-space>
	<v3-space>
		<span>导航按钮位置：</span>
		<v3-radio-group v-model="indicatorPosition">
			<v3-radio label="left">left</v3-radio>
			<v3-radio label="top">top</v3-radio>
			<v3-radio label="right">right</v3-radio>
			<v3-radio label="bottom">bottom</v3-radio>
		</v3-radio-group>
	</v3-space>
	<v3-space>
		<span>切换箭头：</span>
		<v3-radio-group v-model="showArrow">
			<v3-radio label="always">always</v3-radio>
			<v3-radio label="hover">hover</v3-radio>
			<v3-radio label="never">never</v3-radio>
		</v3-radio-group>
	</v3-space>
	<v3-divider direction="horizontal"></v3-divider>
	<v3-carousel
		:direction="direction"
		:indicatorType="indicatorType"
		:indicatorPosition="indicatorPosition"
		:showArrow="showArrow"
		height="300px"
	>
		<v3-carousel-item
			v-for="(v, i) in carousels"
			:key="i"
			:style="{
				backgroundColor: v.bgColor,
			}"
		>
		</v3-carousel-item>
	</v3-carousel>
</template>
<script lang="ts" setup>
import { defineComponent, reactive, ref } from 'vue';

const carousels = ref([
	{
		bgColor: 'rgba(0, 160, 255, 1)',
	},
	{
		bgColor: 'rgba(99, 185, 49, 1)',
	},
	{
		bgColor: 'rgba(201, 27, 38, 1)',
	},
	{
		bgColor: 'rgba(237, 170, 83, 1)',
	},
]);
const direction = ref('horizontal');
const indicatorType = ref('dot');
const indicatorPosition = ref('bottom');
const showArrow = ref('always');
</script>
```

:::

## 自定义控件

:::demo

```vue
<template>
	<v3-carousel v-model="currentActiveIndex" height="300px">
		<v3-carousel-item
			v-for="(v, i) in carousels"
			:key="i"
			:style="{
				backgroundColor: v.bgColor,
			}"
		>
		</v3-carousel-item>
		<template #arrowLeft>
			<span>👈</span>
		</template>
		<template #arrowRight>
			<span>👉</span>
		</template>
		<template #indicator>
			<span
				v-for="(v, i) in carousels"
				:key="i"
				:style="{ cursor: 'pointer' }"
				@click="currentActiveIndex = i"
				>🙂</span
			>
		</template>
	</v3-carousel>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue';

const carousels = ref([
	{
		bgColor: 'rgba(0, 160, 255, 1)',
	},
	{
		bgColor: 'rgba(99, 185, 49, 1)',
	},
	{
		bgColor: 'rgba(201, 27, 38, 1)',
	},
	{
		bgColor: 'rgba(237, 170, 83, 1)',
	},
]);
const currentActiveIndex = ref(0);
</script>
```

:::

## API

### Carousel Props

| 参数名            | 说明                                       | 类型             | 可选值                                          | 默认值     | 是否必填 |
| ----------------- | ------------------------------------------ | ---------------- | ----------------------------------------------- | ---------- | -------- |
| modelValue        | `v-model`绑定的值                          | number           |                                                 | 0          |          |
| width             | 轮播图容器宽度                             | number / string  |                                                 | 100%       |          |
| height            | 轮播图容器高度                             | number / string  |                                                 | 100%       |          |
| effect            | 轮播图形式                                 | string           | slide / fade                                    | slide      |          |
| autoplay          | 是否自动播放                               | boolean / object | `{ interval?: number; pauseOnHover?: boolean }` | false      |          |
| duration          | 同`transition-duration`                    | number           |                                                 | 300        |          |
| timingFunction    | 同`transition-timing-function`             | string           |                                                 | ease       |          |
| disabled          | 是否禁用轮播图（不响应一切事件和切换动作） | boolean          |                                                 | false      |          |
| direction         | 轮播的方向                                 | string           | horizontal / vertical                           | horizontal |          |
| showArrow         | 是否显示切换箭头                           | string           | always / hover / never                          | always     |          |
| showIndicator     | 是否显示导航按钮                           | boolean          |                                                 | true       |          |
| indicatorType     | 导航按钮的类型                             | string           | dot / line                                      | dot        |          |
| indicatorPosition | 导航按钮的位置                             | string           | left / top / right / bottom                     | bottom     |          |

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
