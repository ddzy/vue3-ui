## Back（返回）

### 基本用法

```vue demo
<template>
	<div
		style="position: relative; width: 500px; "
	>
		<div
			ref="targetRef"
 			style="overflow: auto; height: 300px;"
		>
			<ul>
				<li v-for="v in 200">{{ v }}</li>
			</ul>
		</div>
		<v3-back
			:target="targetRef"
		></v3-back>
	</div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
	setup() {
		const state = reactive({
		});
		const targetRef = ref(null);

		return {
			state,
			targetRef,
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
