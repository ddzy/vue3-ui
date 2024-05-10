# 单选框 Radio

## 基本用法

:::demo

```vue
<template>
	<v3-radio v-model="state.radioValue" label="banana">banana</v3-radio>
	<v3-radio v-model="state.radioValue" disabled label="peach">peach</v3-radio>
	<v3-radio v-model="state.radioValue" label="orange">orange</v3-radio>
	<v3-radio v-model="state.radioValue" label="lemon">lemon</v3-radio>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
	setup() {
		const state = reactive({
			radioValue: 'peach',
		});

		return {
			state,
		};
	},
});
</script>
```

:::

## 单选框组

利用 `RadioGroup` 绑定一组值互斥的单选框

:::demo

```vue
<template>
	<v3-radio-group v-model="state.radioValue">
		<v3-radio :label="'banana'">banana</v3-radio>
		<v3-radio :label="'peach'">peach</v3-radio>
		<v3-radio :label="'orange'">orange</v3-radio>
		<v3-radio :label="'lemon'">lemon</v3-radio>
	</v3-radio-group>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
	setup() {
		const state = reactive({
			radioValue: 'peach',
		});

		return {
			state,
		};
	},
});
</script>
```

:::

## 带边框的单选框

:::demo

```vue
<template>
	<v3-radio v-model="state.radioValue" label="banana" border>banana</v3-radio>
	<v3-radio v-model="state.radioValue" disabled border label="peach"
		>peach</v3-radio
	>
	<v3-radio v-model="state.radioValue" label="orange" border>orange</v3-radio>
	<v3-radio v-model="state.radioValue" label="lemon" border>lemon</v3-radio>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
	setup() {
		const state = reactive({
			radioValue: 'peach',
		});

		return {
			state,
		};
	},
});
</script>
```

:::

## 按钮形式的单选框组

:::demo

```vue
<template>
	<v3-radio-group v-model="state.radioValue">
		<v3-radio-button :label="'banana'">banana</v3-radio-button>
		<v3-radio-button :label="'peach'">peach</v3-radio-button>
		<v3-radio-button :label="'orange'">orange</v3-radio-button>
		<v3-radio-button :label="'lemon'">lemon</v3-radio-button>
	</v3-radio-group>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
	setup() {
		const state = reactive({
			radioValue: 'peach',
		});

		return {
			state,
		};
	},
});
</script>
```

:::

## 不同尺寸

`Radio`、`RadioButton` 都有三种内置的尺寸可选

:::demo

```vue
<template>
	<v3-radio v-model="state.radioValue" label="small" size="small">小</v3-radio>
	<v3-radio v-model="state.radioValue" label="medium" size="medium"
		>默认</v3-radio
	>
	<v3-radio v-model="state.radioValue" label="large" size="large">大</v3-radio>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
	setup() {
		const state = reactive({
			radioValue: 'peach',
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

### Radio Props

| 参数名     | 说明                     | 类型                      | 可选值                 | 默认值 |
| ---------- | ------------------------ | ------------------------- | ---------------------- | ------ |
| border     | 是否带有边框             | boolean                   |                        | false  |
| disabled   | 禁用状态                 | boolean                   |                        | false  |
| label      | 单选框的值               | string / boolean / number |                        |        |
| size       | 单选框的尺寸             | string                    | small / medium / large | medium |
| modelValue | 单独使用时绑定的 v-model | string / boolean / number |                        |        |

### Radio Events

| 事件名 | 说明             | 回调参数                                               |
| ------ | ---------------- | ------------------------------------------------------ |
| change | 值发生变化时触发 | `newValue`, `label`: string/boolean/number, `e`: Event |

### Radio Slots

| 插槽名  | 说明     | 子标签 |
| ------- | -------- | ------ |
| default | 默认插槽 |        |

### RadioGroup Props

| 参数名     | 说明    | 类型                      | 可选值 | 默认值 |
| ---------- | ------- | ------------------------- | ------ | ------ |
| modelValue | v-model | string / boolean / number |        |        |

### RadioGroup Events

| 事件名 | 说明             | 回调参数             |
| ------ | ---------------- | -------------------- |
| change | 值发生变化时触发 | (newValue, e: Event) |

### RadioGroup Slots

| 插槽名  | 说明     | 子标签              |
| ------- | -------- | ------------------- |
| default | 默认插槽 | Radio / RadioButton |

### RadioButton Props

| 参数名     | 说明                     | 类型                      | 可选值                 | 默认值 |
| ---------- | ------------------------ | ------------------------- | ---------------------- | ------ |
| disabled   | 是否禁用                 | boolean                   |                        | false  |
| label      | 绑定的值                 | number / string / boolean |                        |        |
| size       | 复选按钮的尺寸           | string                    | small / medium / large | medium |
| modelValue | 单独使用时绑定的 v-model | number / string / boolean |                        |        |

### RadioButton Events

| 事件名 | 说明             | 回调参数                                               |
| ------ | ---------------- | ------------------------------------------------------ |
| change | 值发生变化时触发 | `newValue`, `label`: string/boolean/number, `e`: Event |

### RadioButton Slots

| 插槽名  | 说明     | 子标签 |
| ------- | -------- | ------ |
| default | 默认插槽 |        |
