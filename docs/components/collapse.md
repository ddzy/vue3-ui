# Collapse 折叠面板

## 基本用法

:::demo

```vue
<template>
	<v3-space>
		<span>展开了：</span>
		<span>{{ currentActiveCollapse }}</span>
	</v3-space>
	<v3-divider direction="horizontal"></v3-divider>
	<v3-collapse v-model="currentActiveCollapse">
		<v3-collapse-item v-for="v in collapses" :key="v" :name="v" :title="v">{{
			v
		}}</v3-collapse-item>
	</v3-collapse>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue';

const collapses = ref(['北京', '上海', '广州', '深圳']);
const currentActiveCollapse = ref(['北京']);
</script>
```

:::
