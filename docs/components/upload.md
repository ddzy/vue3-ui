# Upload 上传

## 基本用法

:::demo

```vue
<template>
	<v3-upload
		action="https://run.mocky.io/v3/3ee2d053-03de-4e99-bb65-9db767a79eac"
		method="post"
		:onSuccess="onSuccess"
	>
		<v3-button icon="Upload">上传成功</v3-button>
	</v3-upload>
	<v3-divider direction="horizontal"></v3-divider>
	<v3-upload
		action="https://run.mocky.io/v3/3ee2d053-03de-4e99-bb65-9db767a79ead"
		method="post"
		:onFailed="onFailed"
	>
		<v3-button icon="Upload">上传失败</v3-button>
	</v3-upload>
</template>
<script lang="ts" setup>
import { getCurrentInstance, ref } from 'vue';

const app = getCurrentInstance()!.proxy;

function onSuccess({ file }) {
	app?.$message?.({
		type: 'success',
		message: `上传成功：${file.name}`,
	});
}

function onFailed({ file }) {
	app?.$message?.({
		type: 'danger',
		message: `上传失败：${file.name}`,
	});
}
</script>
```

:::
