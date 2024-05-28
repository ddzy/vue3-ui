# Backdrop 遮罩层

## 基本用法

:::demo

```vue
<template>
	<v3-button type="primary" @click="state.showBackdrop = true"
		>打开遮罩层</v3-button
	>
	<v3-backdrop v-model="state.showBackdrop" @click="state.showBackdrop = false">
		<img
			src="https://oos.yyge.top/2021/6/30/duan/test/ChMkJ1bKxe-IGplXACGf0sjfYE4AALHdgJwnqcAIZ_q211.jpg"
			width="800"
			height="1200"
			alt=""
		/>
	</v3-backdrop>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
	setup() {
		const state = reactive({
			showBackdrop: false,
		});

		return {
			state,
		};
	},
});
</script>
```

:::

## 避免滚动穿透

:::demo

```vue
<template>
	<v3-button type="primary" @click="state.showBackdrop = true"
		>打开遮罩层</v3-button
	>
	<v3-backdrop
		v-model="state.showBackdrop"
		fixed
		@click="state.showBackdrop = false"
	>
		<img
			src="https://oos.yyge.top/2021/6/30/duan/test/ChMkJ1bKxe-IGplXACGf0sjfYE4AALHdgJwnqcAIZ_q211.jpg"
			width="800"
			height="1200"
			alt=""
		/>
	</v3-backdrop>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
	setup() {
		const state = reactive({
			showBackdrop: false,
		});

		return {
			state,
		};
	},
});
</script>
```

:::

## 自定义类名

:::demo

```vue
<template>
	<v3-button type="primary" @click="state.showBackdrop = true"
		>打开遮罩层</v3-button
	>
	<v3-backdrop
		customClass="custom-backdrop-class"
		v-model="state.showBackdrop"
		@click="state.showBackdrop = false"
	>
		<img
			src="https://oos.yyge.top/2021/6/30/duan/test/ChMkJ1bKxe-IGplXACGf0sjfYE4AALHdgJwnqcAIZ_q211.jpg"
			width="800"
			height="1200"
			alt=""
		/>
	</v3-backdrop>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
	setup() {
		const state = reactive({
			showBackdrop: false,
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

### Backdrop Props

| 参数名                  | 说明                         | 类型    | 可选值 | 默认值 |
| ----------------------- | ---------------------------- | ------- | ------ | ------ |
| modelValue（`v-model`） | 遮罩层的显隐状态             | boolean |        |        |
| fixed                   | 是否避免滚动穿透             | boolean |        | false  |
| customClass             | 自定义遮罩层的类名           | string  |        |        |
| center                  | 内部的元素是否要水平垂直居中 | boolean |        | true   |

### Backdrop Slots

| 插槽名  | 说明     | 子标签 |
| ------- | -------- | ------ |
| default | 默认插槽 |        |
