# Badge 徽标

## 基本用法

:::demo

```vue
<template>
	<v3-space :size="40">
		<v3-badge :value="9">
			<v3-button plain>按钮1</v3-button>
		</v3-badge>
		<v3-badge :value="99" type="success">
			<v3-button plain>按钮1</v3-button>
		</v3-badge>
		<v3-badge :value="999" type="danger">
			<v3-button plain>按钮1</v3-button>
		</v3-badge>
		<v3-badge :value="9999" type="warning">
			<v3-button plain>按钮1</v3-button>
		</v3-badge>
		<v3-badge :value="99999" type="info">
			<v3-button plain>按钮1</v3-button>
		</v3-badge>
	</v3-space>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
	setup() {
		const state = reactive({});

		return {
			state,
		};
	},
});
</script>
```

:::

## 小圆点

:::demo

```vue
<template>
	<v3-space :size="30">
		<v3-badge dot type="primary">
			<v3-button type="primary" icon="v3-icon-assessed-badge"></v3-button>
		</v3-badge>
		<v3-badge dot type="success">
			<v3-button type="success" icon="v3-icon-cart-full"></v3-button>
		</v3-badge>
		<v3-badge dot type="danger">
			<v3-button type="danger" icon="v3-icon-CurrencyConverter"></v3-button>
		</v3-badge>
		<v3-badge dot type="warning"> 文本4 </v3-badge>
		<v3-badge dot type="info"> 文本5 </v3-badge>
	</v3-space>
</template>
```

:::

## 自定义颜色

:::demo

```vue
<template>
	<v3-space :size="30">
		<v3-badge backgroundColor="red" color="#fff" :value="9">
			<v3-button plain>按钮1</v3-button>
		</v3-badge>
		<v3-badge backgroundColor="pink" color="darkred" :value="99" type="success">
			<v3-button plain>按钮1</v3-button>
		</v3-badge>
		<v3-badge backgroundColor="purple" color="#fff" :value="999" type="danger">
			<v3-button plain>按钮1</v3-button>
		</v3-badge>
	</v3-space>
</template>
```

:::

## 限制最大值

:::demo

```vue
<template>
	<v3-space :size="40">
		<v3-badge :value="99" :max="99" type="warning">
			<v3-button plain>按钮1</v3-button>
		</v3-badge>
		<v3-badge :value="20" :max="99" type="info">
			<v3-button plain>按钮2</v3-button>
		</v3-badge>
	</v3-space>
</template>
```

:::

## API

### Badge 参数

| 参数名          | 说明                                     | 类型          | 可选值                              | 默认值  | 必填 |
| --------------- | ---------------------------------------- | ------------- | ----------------------------------- | ------- | ---- |
| value           | 徽标的值                                 | string/number |                                     |         |      |
| type            | 徽标的类型                               | string        | primary/success/danger/warning/info | primary |      |
| backgroundColor | 自定义徽标的背景颜色（优先级比 type 高） | string        |                                     |         |      |
| color           | 自定义徽标的文本颜色（优先级比 type 高） | string        |                                     |         |      |
| max             | 超出该值时显示 xx+（比如：99+）          | number        |                                     | 0       |      |
| dot             | 是否显示为小圆点（此时设置 value 无效）  | boolean       |                                     | false   |      |

### Space 插槽

| 插槽名  | 说明     | 子标签 |
| ------- | -------- | ------ |
| default | 默认插槽 |        |
