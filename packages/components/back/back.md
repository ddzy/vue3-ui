## Back（返回）

### 基本用法

```vue demo
<template>
	1
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
	setup() {
		const state = reactive({
		});

		return {
			state,
		};
	},
});
</script>
```

### API

#### Back参数

| 参数名 | 说明 | 类型 | 可选值 | 默认值 | 是否必填 |
| ------ | ---- | ---- | ------ | ------ | -------- |

#### Back事件

| 事件名 | 说明 | 参数 |
| ------ | ---- | ---- |

#### Back插槽

| 插槽名  | 说明     | 子标签   |
| ------- | -------- | -------- |
| default | 默认插槽 | 主要内容 |
