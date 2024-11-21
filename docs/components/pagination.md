# Pagination 分页

## 基本用法

:::demo

```vue
<template>
	<v3-pagination :total="1000" :defaultPage="3"></v3-pagination>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
</script>
```

:::

## 页码展示个数

:::info
可以通过`displayPageCount`来设置页码的显示个数，如果该值大于`4`，那么会额外展示`4`个默认按钮，分别是：`首页页码`、`页码快退`、`页码快进`、`尾页页码`
:::

:::demo

```vue
<template>
	<v3-input-number
		v-model="displayPageCount"
		placeholder="请输入页码展示个数"
	></v3-input-number>
	<v3-divider direction="horizontal"></v3-divider>
	<v3-pagination
		:total="1000"
		:defaultPage="1"
		:displayPageCount="displayPageCount"
	></v3-pagination>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const displayPageCount = ref(4);
</script>
```

:::
