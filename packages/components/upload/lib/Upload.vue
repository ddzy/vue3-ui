<template>
	<div class="v3-upload">
		<input
			v-show="false"
			:id="`v3-upload__trigger--${app?.uid}`"
			:multiple="props.multiple"
			type="file"
			ref="inputRef"
			@change="handleChange"
		/>
		<div class="v3-upload__trigger" @click="handleTrigger">
			<slot></slot>
		</div>
		<div class="v3-upload__list-wrapper">
			<ul class="v3-upload__list">
				<li
					v-for="(v, i) in fileList"
					:key="i"
					:class="['v3-upload__item', `is-${v.status}`]"
				>
					<V3Icon type="Link" class="v3-upload__item-thumb" />
					<span class="v3-upload__item-name">{{ v.name }}</span>
					<V3Icon
						type="PreviewOpen"
						class="v3-upload__item-preview"
						title="预览"
					/>
					<V3Icon
						type="Download"
						class="v3-upload__item-download"
						title="下载"
					/>
					<V3Icon type="Delete" class="v3-upload__item-delete" title="删除" />
					<V3Icon type="Redo" class="v3-upload__item-retry" title="重试" />
				</li>
			</ul>
		</div>
	</div>
</template>
<script lang="tsx" setup>
import { getCurrentInstance, ref, watch } from 'vue';

import { divide } from '@common/utils';
import { V3Icon } from '@components/main';
import { IUploadFile, IUploadProps } from '@typings/index';
import { forOwn, isFunction, isPlainObject } from 'lodash-es';

defineOptions({
	name: 'V3Upload',
});

const props = withDefaults(defineProps<IUploadProps>(), {
	action: '#',
	method: 'POST',
	accept: undefined,
	headers: () => ({}),
	autoUpload: true,
	beforeUpload: undefined,
	customUpload: undefined,
	fileList: undefined,
	listType: 'text',
	disabled: false,
	max: undefined,
	multiple: false,
	name: 'file',
	showPreviewButton: true,
	showCancelButton: true,
	showDownloadButton: true,
	showRemoveButton: true,
	showRetryButton: true,
	onPreview: undefined,
	onDelete: undefined,
	onSuccess: undefined,
	onFailed: undefined,
	onProgress: undefined,
	onChange: undefined,
});
const app = getCurrentInstance();

const inputRef = ref<HTMLInputElement>();
function handleTrigger() {
	inputRef.value?.click?.();
}

const fileList = ref<IUploadFile[]>([]);
watch(
	() => props.fileList,
	(newValue) => {
		if (newValue) {
			fileList.value = newValue;
		}
	},
	{ immediate: true, deep: true },
);
function handleChange(e: Event) {
	const target = e.target as HTMLInputElement;
	const rawFiles = target.files ? Array.from(target.files) : [];
	const files: IUploadFile[] = rawFiles.map((v) => {
		return Object.assign(v, {
			status: 'pending',
			percentage: 0,
		}) as IUploadFile;
	});
	fileList.value = fileList.value.concat(files);

	if (props.autoUpload) {
		startUpload();
	}
}

function handleSuccess() {}

function handleFailed() {}

function handleProgress(percentage: number) {}

function handleDelete() {}

function handlePreview() {}

async function startUpload() {
	fileList.value.forEach(async (file) => {
		// 上传前预处理
		let canUpload = true;
		if (isFunction(props.beforeUpload)) {
			canUpload = await props.beforeUpload!(file);
		}
		if (canUpload) {
			const xhr = new XMLHttpRequest();
			xhr.open(props.method, props.action);
			if (isPlainObject(props.headers)) {
				forOwn(props.headers, (v, k) => {
					xhr.setRequestHeader(k, v);
				});
			}
			xhr.addEventListener('load', (e) => {
				if (xhr.readyState === 4 && xhr.status === 200) {
					handleSuccess();
				}
			});
			xhr.addEventListener('error', (e) => {
				handleFailed();
			});
			xhr.addEventListener('progress', (e) => {
				if (e.lengthComputable) {
					let percentage = divide(e.loaded, e.total);
					handleProgress(percentage);
				}
			});
			xhr.send();
		}
	});
}
</script>
<style lang="scss">
@import './Upload.scss';
</style>
