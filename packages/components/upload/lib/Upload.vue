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
		<div class="v3-upload__list">
			<ul class="v3-upload__list-inner">
				<li class="v3-upload__item"></li>
			</ul>
		</div>
	</div>
</template>
<script lang="tsx" setup>
import { getCurrentInstance, ref, watch } from 'vue';

import { IUploadFile, IUploadProps } from '@typings/index';

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
	onRemove: undefined,
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
}
</script>
<style lang="scss">
@import './Upload.scss';
</style>
