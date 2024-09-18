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
		message: `上传成功：${file.raw.name}`,
	});
}

function onFailed({ file }) {
	app?.$message?.({
		type: 'danger',
		message: `上传失败：${file.raw.name}`,
	});
}
</script>
```

:::

## 自定义上传

可以通过`customRequest`方法自定义上传，此时`beforeUpload`依然有效，并且需要在上传时自行调用`onSuccess`等方法更改上传状态

:::demo

```vue
<template>
	<v3-upload action="#" :customUpload="customUploading">
		<v3-button icon="Upload">上传中</v3-button>
	</v3-upload>
	<v3-divider direction="horizontal"></v3-divider>
	<v3-upload action="#" :customUpload="customUploadSuccess">
		<v3-button icon="Upload">上传成功</v3-button>
	</v3-upload>
	<v3-divider direction="horizontal"></v3-divider>
	<v3-upload action="#" :customUpload="customUploadFailed">
		<v3-button icon="Upload">上传失败</v3-button>
	</v3-upload>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

async function customUploading({ file, onSuccess, onFailed, onProgress }) {
	for (let i = 0; i <= 100; i++) {
		setTimeout(() => {
			onProgress(i / 100);
		}, i);
	}
}
async function customUploadSuccess({ file, onSuccess, onFailed, onProgress }) {
	setTimeout(() => {
		onSuccess();
	}, 1000);
}
async function customUploadFailed({ file, onSuccess, onFailed, onProgress }) {
	setTimeout(() => {
		onFailed();
	}, 1000);
}
</script>
```

:::

## 手动上传

通过调用组件暴露的`startUpload`方法来手动上传文件

:::demo

```vue
<template>
	<v3-upload
		ref="uploadRef"
		action="https://run.mocky.io/v3/3ee2d053-03de-4e99-bb65-9db767a79eac"
		method="post"
		:autoUpload="false"
	>
		<v3-button>选择文件</v3-button>
	</v3-upload>
	<v3-divider direction="horizontal"></v3-divider>
	<v3-button type="success" @click="startUpload">上传</v3-button>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const uploadRef = ref();
function startUpload() {
	uploadRef.value?.startUpload();
}
</script>
```

:::

## 删除文件

:::demo

```vue
<template>
	<v3-upload
		action="https://run.mocky.io/v3/3ee2d053-03de-4e99-bb65-9db767a79eac"
		:onRemove="onRemove"
		:multiple="true"
	>
		<v3-button>选择文件</v3-button>
	</v3-upload>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

function onRemove({ file }) {
	alert(`删除成功：${file.raw.name}`);
}
</script>
```

:::
