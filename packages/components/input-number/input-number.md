## 数字输入框（InputNumber）

### 基本的计数器

```vue
<template>
  <v3-input-number
		v-model="state.inputValue"
    style="max-width: 250px;"
    :controlsPosition="'both'"
    :stepStrictly="true"
    :precision="0"
	></v3-input-number>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  setup() {
		const state = reactive({
			inputValue: 0,
		});

		return {
			state,
		};
	},
});
</script>
```

### 限制步长和最大值

```vue
<template>
  <v3-input-number
    v-model="state.inputValue"
    style="max-width: 250px;"
    :controlsPosition="'both'"
    :stepStrictly="true"
    :precision="0"
    :step="2"
    :min="0"
    :max="20"
	></v3-input-number>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  setup() {
		const state = reactive({
			inputValue: 0,
		});

		return {
			state,
		};
	},
});
</script>
```

### 可调整控制按钮组的位置

```vue
<template>
  <v3-input-number
    v-model="state.inputValue1"
    style="max-width: 250px;"
    :controlsPosition="'both'"
	></v3-input-number>
  <v3-input-number
    v-model="state.inputValue2"
    style="max-width: 250px; margin-top: 20px;"
    :controlsPosition="'left'"
	></v3-input-number>
  <v3-input-number
    v-model="state.inputValue3"
    style="max-width: 250px; margin-top: 20px;"
    :controlsPosition="'right'"
	></v3-input-number>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  setup() {
		const state = reactive({
			inputValue1: 0,
      inputValue2: 0,
      inputValue3: 0,
		});

		return {
			state,
		};
	},
});
</script>
```

### API

#### InputNumber 参数

| 参数名           | 说明                                 | 类型               | 可选值                 | 默认值     |
| ---------------- | ------------------------------------ | ------------------ | ---------------------- | ---------- |
| min              | 限制输入的最小值                     | number / undefined |                        |            |
| max              | 限制输入的最大值                     | number / undefined |                        |            |
| step             | 步数                                 | number             |                        | 1          |
| stepStrictly     | 输入值是否只能为 step 的倍数         | boolean            |                        | false      |
| precision        | 保留的小数位数                       | number             |                        | 0          |
| disabled         | 是否禁用                             | boolean            |                        | false      |
| readonly         | 是否只读                             | boolean            |                        | false      |
| controlsPosition | 控制栏的位置                         | string             | both / right / left    | both       |
| placeholder      | 同原生 input 标签的 placeholder 属性 | string             |                        | 请输入内容 |
| size             | 输入框的尺寸                         | string             | small / medium / large | medium     |
| modelValue       | v-model 绑定的值                     | string             |                        |            |

#### InputNumber 事件

| 事件名 | 说明                 | 回调参数   |
| ------ | -------------------- | ---------- |
| focus  | 输入框获得焦点时触发 | (e: Event) |
| blur   | 输入框失去焦点时触发 | (e: Event) |
