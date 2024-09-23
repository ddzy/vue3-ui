# Upload 上传

## 基本用法

:::demo

```vue
<template>
	<v3-upload
		action="https://run.mocky.io/v3/09b76707-1cda-41cb-bb74-3e22c7d03f30"
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

可以通过 `beforeUpload`方法对文件进行预处理，如果返回 `false`、`Promise<false>`、`Promise.reject()`则取消上传

:::demo

```vue
<template>
	<v3-upload
		action="https://run.mocky.io/v3/09b76707-1cda-41cb-bb74-3e22c7d03f30"
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

通过 `multiple`开启多选文件，可以通过设置 `fileList`传入初始的文件列表

:::demo

```vue
<template>
	<v3-upload
		action="https://run.mocky.io/v3/09b76707-1cda-41cb-bb74-3e22c7d03f30"
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

可以通过 `customRequest`方法自定义上传，此时 `beforeUpload`依然有效，并且需要在上传时自行调用 `onSuccess`等方法更改上传状态

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

通过调用组件暴露的 `startUpload`方法来手动上传文件

:::demo

```vue
<template>
	<v3-upload
		ref="uploadRef"
		action="https://run.mocky.io/v3/09b76707-1cda-41cb-bb74-3e22c7d03f30"
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

点击删除按钮时触发 `onRemove`方法，该方法返回 `false`或者 `Promise<false>`或者 `Promise.reject()`则阻止删除

:::demo

```vue
<template>
	<v3-upload
		action="https://run.mocky.io/v3/09b76707-1cda-41cb-bb74-3e22c7d03f30"
		:onRemove="onRemove"
		:multiple="true"
	>
		<v3-button icon="Upload">选择文件</v3-button>
	</v3-upload>
	<v3-divider direction="horizontal"></v3-divider>
	<v3-upload
		action="https://run.mocky.io/v3/09b76707-1cda-41cb-bb74-3e22c7d03f30"
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

对于 `image/`、`video/`类型的文件，会打开弹窗预览；对于其它文件，会生成 `blob`链接在新标签页中预览

也可以通过 `onPreview`来自定义文件预览

:::demo

```vue
<template>
	<v3-upload
		action="https://run.mocky.io/v3/09b76707-1cda-41cb-bb74-3e22c7d03f30"
		:multiple="true"
	>
		<v3-button icon="Upload">原生预览</v3-button>
	</v3-upload>
	<v3-divider direction="horizontal"></v3-divider>
	<v3-upload
		action="https://run.mocky.io/v3/09b76707-1cda-41cb-bb74-3e22c7d03f30"
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

可以通过 `onDownload`来自定义文件下载逻辑

:::demo

```vue
<template>
	<v3-upload
		action="https://run.mocky.io/v3/09b76707-1cda-41cb-bb74-3e22c7d03f30"
		:multiple="true"
	>
		<v3-button icon="Upload">选择文件</v3-button>
	</v3-upload>
	<v3-divider direction="horizontal"></v3-divider>
	<v3-upload
		action="https://run.mocky.io/v3/09b76707-1cda-41cb-bb74-3e22c7d03f30"
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

## 照片墙

:::demo

```vue
<template>
	<v3-upload
		action="https://run.mocky.io/v3/09b76707-1cda-41cb-bb74-3e22c7d03f30"
		method="post"
		list-type="picture-wall"
		:multiple="true"
		:fileList="fileList"
	>
	</v3-upload>
	<v3-divider direction="horizontal">自定义内容</v3-divider>
	<v3-upload
		action="https://run.mocky.io/v3/09b76707-1cda-41cb-bb74-3e22c7d03f30"
		method="post"
		list-type="picture-wall"
		:multiple="true"
		:fileList="fileList"
	>
		点击上传
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

## 禁用状态

:::demo

```vue
<template>
	<v3-upload
		action="https://run.mocky.io/v3/09b76707-1cda-41cb-bb74-3e22c7d03f30"
		method="post"
		:disabled="true"
	>
		<v3-button icon="Upload">选择文件</v3-button>
	</v3-upload>
	<v3-divider direction="horizontal"></v3-divider>
	<v3-upload
		action="https://run.mocky.io/v3/09b76707-1cda-41cb-bb74-3e22c7d03f30"
		method="post"
		list-type="picture-wall"
		:disabled="true"
	>
		点击上传
	</v3-upload>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
</script>
```

:::

## 限制上传个数

:::demo

```vue
<template>
	<v3-upload
		action="https://run.mocky.io/v3/09b76707-1cda-41cb-bb74-3e22c7d03f30"
		method="post"
		:multiple="true"
		:max="3"
	>
		<v3-button icon="Upload">选择文件</v3-button>
	</v3-upload>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
</script>
```

:::

## 拖拽上传

:::demo

```vue
<template>
	<v3-upload
		action="https://run.mocky.io/v3/09b76707-1cda-41cb-bb74-3e22c7d03f30"
		method="post"
		:dropable="true"
		:multiple="true"
	>
		<div :class="$style['wrapper']">
			<v3-icon :class="$style['icon']" type="Upload"></v3-icon>
			<p :class="$style['text']">
				拖动文件到此处，或<v3-button type="text">点击上传</v3-button>
			</p>
		</div>
	</v3-upload>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
</script>
<style module>
.wrapper {
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
}
.icon {
	font-size: 30px;
	color: rgba(0, 160, 255, 1);
}
.text {
	margin-top: 20px;
}
</style>
```

:::

## API

### Upload Props

|       参数名       | 说明                                                                 | 类型                                                                                                                                               | 可选值                  | 默认值 | 是否必填 |
| :----------------: | -------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- | ------ | -------- |
|       action       | 上传的目标地址                                                       | string                                                                                                                                             |                         | '#'    |          |
|       method       | 请求接口的方式                                                       | string                                                                                                                                             |                         | 'POST' |          |
|       accept       | 指定可上传的文件类型                                                 | string                                                                                                                                             |                         |        |          |
|      headers       | 自定义请求头                                                         | IUploadHeader                                                                                                                                      |                         | {}     |          |
|       params       | 额外的请求参数，同 `FormData`                                        | Record<string, string>                                                                                                                             |                         |        |          |
|     autoUpload     | 是否自动上传                                                         | boolean                                                                                                                                            |                         | true   |          |
|    beforeUpload    | 上传前的处理，返回 `false`可终止上传                                 | `(options: {file: IUploadFile}) => boolean \| Promise<boolean>`                                                                                    |                         |        |          |
|    customUpload    | 自定义上传方法                                                       | `(options: {     onSuccess: () => void;     onFailed: () => void;     onProgress: (progress: number) => void;     file: IUploadFile;   }) => void` |                         |        |          |
|      fileList      | 开启多选情况下的默认文件列表                                         | IUploadFile[]                                                                                                                                      |                         |        |          |
|      listType      | 以何种方式显示文件列表                                               | string                                                                                                                                             | 'text' / 'picture-wall' | 'text' |          |
|      disabled      | 是否禁用上传                                                         | boolean                                                                                                                                            |                         | false  |          |
|        max         | 限制可上传的最大个数                                                 | number                                                                                                                                             |                         |        |          |
|      multiple      | 是否开启多选文件                                                     | boolean                                                                                                                                            |                         | false  |          |
|        name        | FormData中文件对应的键                                               | string                                                                                                                                             |                         | 'file' |          |
| showPreviewButton  | 是否显示预览按钮                                                     | boolean                                                                                                                                            |                         | true   |          |
| showDownloadButton | 是否显示下载按钮                                                     | boolean                                                                                                                                            |                         | true   |          |
|  showRemoveButton  | 是否显示删除按钮                                                     | boolean                                                                                                                                            |                         | true   |          |
|  showRetryButton   | 是否显示重试按钮                                                     | boolean                                                                                                                                            |                         | true   |          |
|      dropable      | 是否开启拖拽上传                                                     | boolean                                                                                                                                            |                         | false  |          |
|     onPreview      | 自定义预览                                                           | `(options: {file: IUploadFile}) => void`                                                                                                           |                         |        |          |
|      onRemove      | 删除文件（可返回false、Promise `<false>`、Promise.reject来阻止删除） | `(options: { file: IUploadFile }) => any`                                                                                                          |                         |        |          |
|     onDownload     | 自定义下载文件                                                       | `(options: { file: IUploadFile }) => void`                                                                                                         |                         |        |          |
|     onSuccess      | 上传成功后触发                                                       | `(options: {file: IUploadFile}) => void`                                                                                                           |                         |        |          |
|      onFailed      | 上传失败后触发                                                       | `(options: {file: IUploadFile}) => void`                                                                                                           |                         |        |          |
|     onProgress     | 上传中触发                                                           | `(options: {file: IUploadFile, progress: number}) => void`                                                                                         |                         |        |          |
|      onChange      | 选择文件时触发                                                       | `(options: {file: IUploadFile}) => void`                                                                                                           |                         |        |          |

### Upload Types

```typescript
export type IUploadFile = {
	id: string | number;
	status: IUploadFileStatus;
	name: string;
	type?: string;
	progress?: number;
	size?: number;
	url?: string;
	raw?: File;
};
export type IUploadHeader = Record<string, string>;
export type IUploadListType = 'text' | 'picture-wall';
export type IUploadFileStatus =
	| 'pending'
	| 'uploading'
	| 'success'
	| 'failed'
	| 'removed';
```

### Upload Exposes

| 属性名      | 说明                                              | 类型     |
| ----------- | ------------------------------------------------- | -------- |
| startUpload | 当 `autoUpload`为 `false`时，可调用该方法手动上传 | Function |
