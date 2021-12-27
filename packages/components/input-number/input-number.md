## 数字输入框（InputNumber）

### 基本的计数器

```vue demo
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

```vue demo
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

```vue demo
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