## 多行文本输入框（InputTextarea）

### 基本的多行文本输入框

```vue demo
<template>
  <v3-input-textarea
		v-model="state.inputValue"
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

### 只读状态

```vue demo
<template>
  <v3-input-textarea
		v-model="state.inputValue"
    readonly
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

### 高度自动撑开

```vue demo
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