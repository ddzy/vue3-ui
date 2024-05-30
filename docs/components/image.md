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
			src="http://oss.yyge.top/test/images/%E9%A3%8E%E6%99%AF2.jpg"
		></v3-image>
	</v3-space>
</template>
<script lang="ts" setup>
const objectFits = ['fill', 'contain', 'cover', 'scale-down', 'none'];
</script>
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
	<v3-space :size="20" :key="key">
		<v3-image :src="imgSrc" :width="100" :height="100"> </v3-image>
		<v3-image :src="imgSrc" :width="100" :height="100">
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
	<v3-space>
		<v3-button type="primary" @click="loadImg">加载图片</v3-button>
		<v3-button type="danger" @click="loadImgFailed">加载失败</v3-button>
	</v3-space>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const key = ref(0);
const imgSrc = ref('');
function loadImg() {
	key.value += 1;
	imgSrc.value = 'http://oss.yyge.top/test/images/%E9%A3%8E%E6%99%AF2.jpg';
}
function loadImgFailed() {
	key.value += 1;
	imgSrc.value = '';
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
			src="http://oss.yyge.top/test/images/%E9%A3%8E%E6%99%AF2.jpg"
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
			src="http://oss.yyge.top/test/images/%E9%A3%8E%E6%99%AF2.jpg"
			rounded
		></v3-image>
	</v3-space>
</template>
<script lang="ts" setup>
const sizes = [16, 32, 64];
</script>
<style module lang="scss"></style>
```

:::
