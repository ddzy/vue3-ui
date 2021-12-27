## 输入框（Input）

### 基本的输入框

```vue demo
<template>
  <v3-input v-model="state.inputValue" clearable style="max-width: 250px;"> </v3-input>
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

### 限制输入字符数量

```vue demo
<template>
  <v3-input
    v-model="state.inputValue"
    clearable
    showWordLimit
    style="max-width: 250px;"
    :maxlength="10"
  > </v3-input>
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

### 自定义前缀/后缀图标

```vue demo
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

### 自定义前缀/后缀图标（通过 slot）

通过 `slot="prefix/suffix"` 来传入前缀/后缀元素，优先级比 prefixIcon/suffixIcon 高

```vue demo
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

### 自定义前置/后置图标

```vue demo
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

### 不同尺寸的输入框

```vue demo
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

### API

#### Input 参数

| 参数名             | 说明                     | 类型                      | 可选值                 | 默认值                          |
| ------------------ | ------------------------ | ------------------------- | ---------------------- | ------------------------------- |
| border             | 是否带有边框             | boolean                   |                        | false                           |
| disabled           | 禁用状态                 | boolean                   |                        | button                          | false |
| label              | 复选框的值               | string / boolean / number |                        | ''                              |
| indeterminate      | 是否为不确定状态         | boolean                   |                        | false                           |
| selectedIcon       | 选中时的图标             | string                    |                        | v3-icon-checkbox-selected       |
| indeterminatedIcon | 不确定时的图标           | string                    |                        | v3-icon-checkbox-indeterminated |
| defaultIcon        | 未选中状态下的图标       | string                    |                        | v3-icon-checkbox-default        |
| size               | 复选框的尺寸             | string                    | small / medium / large | medium                          |
| modelValue         | 单独使用时绑定的 v-model | boolean                   | false                  |

#### Input 事件

#### Input 插槽