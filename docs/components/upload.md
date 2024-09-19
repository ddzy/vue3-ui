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

## 上传前预处理

可以通过`beforeUpload`方法对文件进行预处理，如果返回`false`、`Promise<false>`、`Promise.reject()`则取消上传

:::demo

```vue
<template>
	<v3-upload
		action="https://run.mocky.io/v3/3ee2d053-03de-4e99-bb65-9db767a79eac"
		method="post"
		accept="image/*"
		:beforeUpload="beforeUpload"
	>
		<v3-button icon="Upload">选择文件</v3-button>
	</v3-upload>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

function beforeUpload({ file }) {
	if (file.raw.size / 1024 / 1024 > 2) {
		alert('图片大小不能超过2M');
		return false;
	}
}
</script>
```

:::

## 多选上传

通过`multiple`开启多选文件，可以通过设置`fileList`传入初始的文件列表

:::demo

```vue
<template>
	<v3-upload
		action="https://run.mocky.io/v3/3ee2d053-03de-4e99-bb65-9db767a79eac"
		:multiple="true"
		:fileList="fileList"
	>
		<v3-button icon="Upload">选择文件</v3-button>
	</v3-upload>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const fileList = ref([
	{
		id: 1,
		status: 'pending',
		name: '待上传.png',
		url: 'https://picsum.photos/200',
	},
	{
		id: 2,
		status: 'uploading',
		progress: 0.5,
		name: '上传中.png',
		url: 'https://picsum.photos/200',
	},
	{
		id: 3,
		status: 'success',
		name: '上传成功.png',
		url: 'https://picsum.photos/200',
	},
	{
		id: 4,
		status: 'failed',
		name: '上传失败.png',
		url: 'https://picsum.photos/200',
	},
]);
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
		<v3-button icon="Upload">选择文件</v3-button>
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

点击删除按钮时触发`onRemove`方法，该方法返回`false`或者`Promise<false>`或者`Promise.reject()`则阻止删除

:::demo

```vue
<template>
	<v3-upload
		action="https://run.mocky.io/v3/3ee2d053-03de-4e99-bb65-9db767a79eac"
		:onRemove="onRemove"
		:multiple="true"
	>
		<v3-button icon="Upload">选择文件</v3-button>
	</v3-upload>
	<v3-divider direction="horizontal"></v3-divider>
	<v3-upload
		action="https://run.mocky.io/v3/3ee2d053-03de-4e99-bb65-9db767a79eac"
		:onRemove="onStopRemove"
		:multiple="true"
	>
		<v3-button icon="Upload">选择文件</v3-button>
	</v3-upload>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

function onRemove({ file }) {
	alert(`删除成功：${file.raw.name}`);
}

function onStopRemove({ file }) {
	return false;
}
</script>
```

:::

## 文件预览

对于`image/`、`video/`类型的文件，会打开弹窗预览；对于其它文件，会生成`blob`链接在新标签页中预览

也可以通过`onPreview`来自定义文件预览

:::demo

```vue
<template>
	<v3-upload
		action="https://run.mocky.io/v3/3ee2d053-03de-4e99-bb65-9db767a79eac"
		:multiple="true"
	>
		<v3-button icon="Upload">原生预览</v3-button>
	</v3-upload>
	<v3-divider direction="horizontal"></v3-divider>
	<v3-upload
		action="https://run.mocky.io/v3/3ee2d053-03de-4e99-bb65-9db767a79eac"
		:multiple="true"
		:onPreview="onPreview"
		accept="image/*"
	>
		<v3-button icon="Upload">自定义预览</v3-button>
	</v3-upload>
	<img :src="previewUrl" />
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const previewUrl = ref<string>('');
function onPreview({ file }) {
	previewUrl.value = URL.createObjectURL(file.raw);
}
</script>
```

:::

## 文件下载

可以通过`onDownload`来自定义文件下载逻辑

:::demo

```vue
<template>
	<v3-upload
		action="https://run.mocky.io/v3/3ee2d053-03de-4e99-bb65-9db767a79eac"
		:multiple="true"
	>
		<v3-button icon="Upload">选择文件</v3-button>
	</v3-upload>
	<v3-divider direction="horizontal"></v3-divider>
	<v3-upload
		action="https://run.mocky.io/v3/3ee2d053-03de-4e99-bb65-9db767a79eac"
		:multiple="true"
		:onDownload="onDownload"
	>
		<v3-button icon="Upload">自定义下载</v3-button>
	</v3-upload>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

function onDownload({ file }) {}
</script>
```

:::
