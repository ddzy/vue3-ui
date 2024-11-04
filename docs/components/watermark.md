# Watermark 水印

## 基本用法

:::demo

```vue
<template>
	<v3-watermark content="重要机密">
		<div style="height: 400px;"></div>
	</v3-watermark>
</template>
<script lang="ts" setup></script>
```

:::

## 全屏水印

:::demo

```vue
<template>
	<v3-checkbox v-model="fullscreen">全屏</v3-checkbox>
	<v3-divider direction="horizontal"></v3-divider>
	<v3-watermark content="重要机密" :fullscreen="fullscreen" :zIndex="9999">
		<div style="height: 400px;"></div>
	</v3-watermark>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const fullscreen = ref(false);
</script>
```

:::

## 多行文本

:::demo

```vue
<template>
	<v3-watermark content="重要机密，非常重要，特别重要，巨重要" :width="120">
		<div style="height: 400px;"></div>
	</v3-watermark>
</template>
<script lang="ts" setup></script>
```

:::
