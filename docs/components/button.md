# Button

常用的操作按钮。

## Basic Usage

基础的按钮用法。

:::demo

```vue
<template>
	<p>{{ count }}</p>
	<button @click="count++">Increment</button>
	<button @click="count--">Decrement</button>

	<h3 class="demo-title">title</h3>

	<v3-button type="default">default</v3-button>
	<v3-button type="primary">primary</v3-button>
</template>

<script setup>
import { ref } from 'vue';

const count = ref(0);
</script>

<style lang="scss">
.demo-title {
	color: red;
}
</style>
```

:::
