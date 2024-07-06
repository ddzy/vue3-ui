# Collapse 折叠面板

## 基本用法

:::demo

```vue
<template>
	<v3-collapse>
		<v3-collapse-item v-for="v in collapses" :key="v" :name="v" :title="v">{{
			v
		}}</v3-collapse-item>
	</v3-collapse>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const collapses = ref(['北京', '上海', '广州', '深圳']);
</script>
```

:::
