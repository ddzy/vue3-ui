# Backdrop 遮罩层

## 基本用法

:::demo

```vue
<template>
	<v3-button type="primary" @click="show = true">打开遮罩层</v3-button>
	<v3-backdrop v-model="show" @close="handleClose"> </v3-backdrop>
</template>
<script lang="ts" setup>
import { defineComponent, ref } from 'vue';

const show = ref(false);
function handleClose() {
	console.log('closed');
}
</script>
```

:::

## 避免滚动穿透

:::demo

```vue
<template>
	<v3-button type="primary" @click="show = true">打开遮罩层</v3-button>
	<v3-backdrop v-model="show" fixed> </v3-backdrop>
</template>
<script lang="ts" setup>
import { defineComponent, ref } from 'vue';

const show = ref(false);
</script>
```

:::

## 自定义类名

:::demo

```vue
<template>
	<v3-button type="primary" @click="show = true">打开遮罩层</v3-button>
	<v3-backdrop customClass="custom-backdrop-class" v-model="show">
	</v3-backdrop>
</template>
<script lang="ts" setup>
import { defineComponent, ref } from 'vue';

const show = ref(false);
</script>
```

:::

## API

### Backdrop Props

| 参数名                  | 说明                         | 类型    | 可选值 | 默认值 | 必填 |
| ----------------------- | ---------------------------- | ------- | ------ | ------ | ---- |
| modelValue（`v-model`） | 遮罩层的显隐状态             | boolean |        |        | true |
| fixed                   | 是否避免滚动穿透             | boolean |        | false  |      |
| customClass             | 自定义遮罩层的类名           | string  |        |        |      |
| center                  | 内部的元素是否要水平垂直居中 | boolean |        | true   |      |
| closeOnClick            | 点击遮罩层是否关闭           | boolean |        | true   |      |

### Backdrop Slots

| 插槽名  | 说明     | 子标签 |
| ------- | -------- | ------ |
| default | 默认插槽 |        |
