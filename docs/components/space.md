# Space 间隔

## 基本用法

:::demo

```vue
<template>
	<v3-space>
		<v3-button v-for="(v, i) in state.btnList" :key="i" :type="v.type">{{
			v.text
		}}</v3-button>
	</v3-space>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
	setup() {
		const state = reactive({
			btnList: [
				{
					type: 'primary',
					text: '按钮1',
				},
				{
					type: 'success',
					text: '按钮2',
				},
				{
					type: 'danger',
					text: '按钮3',
				},
				{
					type: 'warning',
					text: '按钮4',
				},
				{
					type: 'info',
					text: '按钮5',
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

## 更改主轴的方向

:::demo

```vue
<template>
	<v3-space>
		<v3-button type="text">按钮1</v3-button>
		<v3-button type="text">按钮2</v3-button>
		<v3-button type="text">按钮3</v3-button>
		<v3-button type="text">按钮4</v3-button>
		<v3-button type="text">按钮5</v3-button>
	</v3-space>
	<v3-space direction="column">
		<v3-button type="text">按钮1</v3-button>
		<v3-button type="text">按钮2</v3-button>
		<v3-button type="text">按钮3</v3-button>
		<v3-button type="text">按钮4</v3-button>
		<v3-button type="text">按钮5</v3-button>
	</v3-space>
</template>
```

:::

## 控制间隔的大小

:::demo

```vue
<template>
	<v3-space customClass="space-wrapper-2" wrap :size="20">
		<v3-button type="text">按钮1</v3-button>
		<v3-button type="text">按钮2</v3-button>
		<v3-button type="text">按钮3</v3-button>
		<v3-button type="text">按钮4</v3-button>
		<v3-button type="text">按钮5</v3-button>
		<v3-button type="text">按钮1</v3-button>
		<v3-button type="text">按钮2</v3-button>
		<v3-button type="text">按钮3</v3-button>
		<v3-button type="text">按钮4</v3-button>
		<v3-button type="text">按钮5</v3-button>
		<v3-button type="text">按钮1</v3-button>
		<v3-button type="text">按钮2</v3-button>
		<v3-button type="text">按钮3</v3-button>
		<v3-button type="text">按钮4</v3-button>
		<v3-button type="text">按钮5</v3-button>
	</v3-space>
</template>
```

:::

## 自定义分隔符

:::demo

```vue
<template>
	<v3-space separator="|">
		<v3-button type="text">按钮1</v3-button>
		<v3-button type="text">按钮2</v3-button>
		<v3-button type="text">按钮3</v3-button>
		<v3-button type="text">按钮4</v3-button>
		<v3-button type="text">按钮5</v3-button>
		<v3-button type="text">按钮1</v3-button>
	</v3-space>
</template>
```

:::

## API

### Space 参数

| 参数名      | 说明                          | 类型          | 可选值                                | 默认值 | 必填 |
| ----------- | ----------------------------- | ------------- | ------------------------------------- | ------ | ---- |
| customClass | 自定义 space 容器的类名       | string        |                                       |        |      |
| align       | 同 flex 布局的 align-items    | string        | start/end/center/flex-start/flex-end  | center |      |
| direction   | 同 flex 布局的 flex-direction | string        | row/column/row-reverse/column-reverse | row    |      |
| wrap        | 同 flex 布局的 flex-wrap      | boolean       |                                       | true   |      |
| separator   | 自定义分隔符，默认为空格      | string/object |                                       |        |      |
| size        | 间隔大小（px）                | number        |                                       | 6      |      |

### Space 插槽

| 插槽名  | 说明     | 子标签 |
| ------- | -------- | ------ |
| default | 默认插槽 |        |
