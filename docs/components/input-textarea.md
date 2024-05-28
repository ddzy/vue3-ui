# 多行文本输入框 InputTextarea

## 基本用法

:::demo

```vue
<template>
	<v3-input-textarea v-model="state.inputValue"></v3-input-textarea>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
	setup() {
		const state = reactive({
			inputValue: '',
		});

		return {
			state,
		};
	},
});
</script>
```

:::

## 只读状态

:::demo

```vue
<template>
	<v3-input-textarea v-model="state.inputValue" readonly></v3-input-textarea>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
	setup() {
		const state = reactive({
			inputValue: '',
		});

		return {
			state,
		};
	},
});
</script>
```

:::

## 高度自动撑开

:::demo

```vue
<template>
	<v3-input-textarea
		v-model="state.inputValue"
		autoHeight
		:height="30"
	></v3-input-textarea>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
	setup() {
		const state = reactive({
			inputValue: '',
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

### InputTextarea Props

| 参数名      | 说明                                 | 类型    | 可选值                              | 默认值     |
| ----------- | ------------------------------------ | ------- | ----------------------------------- | ---------- |
| width       | 输入框的宽度                         | number  |                                     | 150        |
| height      | 输入框的高度                         | number  |                                     | 150        |
| autoHeight  | 高度是否自适应                       | boolean |                                     | false      |
| resize      | 拉伸的方向                           | string  | none / both / horizontal / vertical | vertical   |
| disabled    | 是否禁用                             | boolean |                                     | false      |
| placeholder | 同原生 input 标签的 placeholder 属性 | string  |                                     | 请输入内容 |
| readonly    | 是否只读                             | boolean |                                     | false      |
| modelValue  | v-model 绑定的值                     | string  |                                     |            |

### InputTextarea Events

| 事件名 | 说明                 | 回调参数   |
| ------ | -------------------- | ---------- |
| focus  | 输入框获得焦点时触发 | (e: Event) |
| blur   | 输入框失去焦点时触发 | (e: Event) |
