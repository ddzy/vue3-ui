# Image 图片

## 基本用法

:::info
使用`object-fit`指定图像如何适应容器的高度和宽度
:::

:::demo

```vue
<template>
	<v3-space :size="20">
		<v3-image
			v-for="v in objectFits"
			:key="v"
			:objectFit="v"
			:width="100"
			:height="100"
			src="http://oss.yyge.top/test/images/%E9%A3%8E%E6%99%AF9.jpg"
		></v3-image>
	</v3-space>
</template>
<script lang="ts" setup>
const objectFits = ['fill', 'contain', 'cover', 'scale-down', 'none'];
</script>
<style module lang="scss"></style>
```

:::

## 图片预览

:::demo

```vue
<template>
	<v3-image
		src="http://oss.yyge.top/test/images/%E9%A3%8E%E6%99%AF9.jpg"
		:width="100"
		:height="100"
		preview
	>
	</v3-image>
</template>
<script lang="ts" setup></script>
<style module lang="scss"></style>
```

:::

## 图像加载中/加载失败

:::info
使用`slot="loading"`和`slot="failed"`自定义图像加载中、加载失败后的显示
:::

:::demo

```vue
<template>
	<v3-space :key="key" :size="20">
		<v3-image :src="imgSrc" :width="100" :height="100" showLoading> </v3-image>
		<v3-image :src="imgSrc" :width="100" :height="100" showLoading>
			<template #failed>
				<div :class="$style['failed-wrapper']">
					<span>FAILED</span>
				</div>
			</template>
			<template #loading>
				<div :class="$style['loading-wrapper']">
					<span>LOADING</span>
				</div>
			</template>
		</v3-image>
	</v3-space>
	<v3-space :size="8">
		<v3-button type="primary" @click="flush">重新加载</v3-button>
	</v3-space>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const imgSrc = 'http://oss.yyge.top/test/images/%E8%AF%B8%E8%91%9B.jpg';
const key = ref(0);
function flush() {
	key.value += 1;
}
</script>
<style module>
.failed-wrapper,
.loading-wrapper {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	color: #666;
}
</style>
```

:::

## 展示头像

:::info
可以通过`rounded`、`radius`来显示头像，`rounded`的优先级高于`radius`
:::

:::demo

```vue
<template>
	<v3-space :size="20">
		<v3-image
			v-for="v in sizes"
			:key="v"
			:width="v"
			:height="v"
			:radius="v / 8"
			src="http://oss.yyge.top/test/images/%E9%A3%8E%E6%99%AF9.jpg"
		></v3-image>
	</v3-space>
	<v3-divider direction="horizontal">
		<span>rounded属性优先级高于radius</span>
		<V3Icon type="ArrowDown" />
	</v3-divider>
	<v3-space :size="20">
		<v3-image
			v-for="v in sizes"
			:key="v"
			:width="v"
			:height="v"
			:radius="v"
			src="http://oss.yyge.top/test/images/%E9%A3%8E%E6%99%AF9.jpg"
			rounded
		></v3-image>
	</v3-space>
</template>
<script lang="ts" setup>
const sizes = [16, 24, 32, 40];
</script>
<style module lang="scss"></style>
```

:::

## 图片懒加载

:::info
可以通过`lazy`属性来开启懒加载，如果`lazy`和`lazyOptions.useIntersectionObserver`均为`true`，则使用[IntersectionObserver API](https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver)；反之则使用`img`标签原生[loading](https://developer.mozilla.org/zh-CN/docs/Web/Performance/Lazy_loading)
:::

:::demo

```vue
<template>
	<v3-image
		v-for="v in imgs"
		:key="v"
		:src="v"
		:width="'100%'"
		:height="600"
		lazy
		style="margin-bottom: 20px;"
	>
	</v3-image>
</template>
<script lang="ts" setup>
const imgs = [
	'http://oss.yyge.top/test/images/%E9%A3%8E%E6%99%AF6.jpg',
	'http://oss.yyge.top/test/images/%E9%A3%8E%E6%99%AF7.jpg',
	'http://oss.yyge.top/test/images/%E9%A3%8E%E6%99%AF8.jpg',
	'http://oss.yyge.top/test/images/%E9%A3%8E%E6%99%AF9.jpg',
];
</script>
<style module lang="scss"></style>
```

:::
