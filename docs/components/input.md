# 输入框 Input

## 基本的输入框

:::demo

```vue
<template>
	<v3-input v-model="state.inputValue" clearable style="max-width: 250px;">
	</v3-input>
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

## 限制输入字符数量

:::demo

```vue
<template>
	<v3-input
		v-model="state.inputValue"
		clearable
		showWordLimit
		style="max-width: 250px;"
		:maxlength="10"
	>
	</v3-input>
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

## 自定义前缀/后缀图标

:::demo

```vue
<template>
	<v3-input
		v-model="state.inputValue"
		clearable
		style="max-width: 250px;"
		:prefixIcon="'v3-icon-editor'"
	>
	</v3-input>
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

## Slot 自定义前缀/后缀图标

通过 `slot="prefix/suffix"` 来传入前缀/后缀元素，优先级比 prefixIcon/suffixIcon 高

:::demo

```vue
<template>
	<v3-input
		v-model="state.inputValue"
		clearable
		style="max-width: 250px;"
		:prefixIcon="'v3-icon-editor'"
	>
		<template #prefix>
			<i class="v3-icon v3-icon-unlock"></i>
		</template>
	</v3-input>
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

## 自定义前置/后置图标

:::demo

```vue
<template>
	<v3-input
		v-model="state.inputValue"
		clearable
		style="max-width: 250px;"
		:appendIcon="'v3-icon-search'"
	>
	</v3-input>
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

## 不同尺寸的输入框

:::demo

```vue
<template>
	<v3-input
		v-model="state.inputValue1"
		clearable
		style="max-width: 250px; margin-top: 20px;"
		size="small"
	>
	</v3-input>
	<v3-input
		v-model="state.inputValue2"
		clearable
		style="max-width: 250px; margin-top: 20px;"
		size="medium"
	>
	</v3-input>
	<v3-input
		v-model="state.inputValue3"
		clearable
		style="max-width: 250px; margin-top: 20px;"
		size="large"
	>
	</v3-input>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
	setup() {
		const state = reactive({
			inputValue1: '',
			inputValue2: '',
			inputValue3: '',
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

### Input Props

| 参数名        | 说明                                 | 类型    | 可选值                 | 默认值     |
| ------------- | ------------------------------------ | ------- | ---------------------- | ---------- |
| type          | 输入框的类型                         | string  | text / password        | text       |
| suffixIcon    | 后缀图标                             | string  |                        |            |
| prefixIcon    | 前缀图标                             | string  |                        |            |
| prependIcon   | 前置图标                             | string  |                        |            |
| appendIcon    | 后置图标                             | string  |                        |            |
| clearable     | 是否显示清除按钮                     | boolean |                        | false      |
| readonly      | 是否只读                             | boolean |                        | false      |
| disabled      | 是否禁用                             | boolean |                        | false      |
| showWordLimit | 是否显示字数统计                     | boolean |                        | false      |
| minlength     | 限制输入的最小数目                   | number  |                        | -1         |
| maxlength     | 限制输入的最大数目                   | number  |                        | -1         |
| placeholder   | 同原生 input 标签的 placeholder 属性 | string  |                        | 请输入内容 |
| showPassword  | 是否显示切换密码按钮                 | boolean |                        | false      |
| size          | 输入框的尺寸                         | string  | small / medium / large | medium     |
| modelValue    | v-model 绑定的值                     | string  |                        |            |

### Input Events

| 事件名 | 说明                 | 回调参数   |
| ------ | -------------------- | ---------- |
| focus  | 输入框获得焦点时触发 | (e: Event) |
| blur   | 输入框失去焦点时触发 | (e: Event) |
| clear  | 点击清空按钮时触发   |            |

### Input Slots

| 插槽名  | 说明           | 子标签 |
| ------- | -------------- | ------ |
| prepend | 前置区域的内容 |        |
| append  | 后置区域的内容 |        |
| prefix  | 前缀区域的内容 |        |
| suffix  | 后缀区域的内容 |        |
