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
		<span class="v3-upload__trigger" @click="handleTrigger">
			<slot></slot>
		</span>
		<div class="v3-upload__list-wrapper">
			<ul class="v3-upload__list">
				<li
					v-for="(v, i) in fileList"
					:key="i"
					:class="['v3-upload__item', `is-${v.status}`]"
					:style="{
						'--progress': isNumber(v.progress) ? `${multiply(subtract(1, v.progress!), 100)}%` : 'auto',
					}"
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

import { divide, multiply, subtract } from '@common/utils';
import { V3Icon } from '@components/main';
import { IUploadFile, IUploadHeader, IUploadProps } from '@typings/index';
import { forOwn, isFunction, isNumber, isPlainObject } from 'lodash-es';

defineOptions({
	name: 'V3Upload',
});

const props = withDefaults(defineProps<IUploadProps>(), {
	/**
	 * 上传的目标地址
	 */
	action: '#',
	/**
	 * 请求接口的方式
	 */
	method: 'POST',
	/**
	 * 指定可上传的文件类型
	 */
	accept: undefined,
	/**
	 * 自定义请求头
	 */
	headers: () => ({}),
	/**
	 * 额外的请求参数，同 FormData
	 */
	params: undefined,
	/**
	 * 是否自动上传
	 */
	autoUpload: true,
	/**
	 * 上传前的处理，返回false可终止上传
	 */
	beforeUpload: undefined,
	/**
	 * 自定义上传方法
	 */
	customUpload: undefined,
	/**
	 * 开启多选情况下的默认文件列表
	 */
	fileList: undefined,
	/**
	 * 以何种方式显示文件列表
	 */
	listType: 'text',
	/**
	 * 是否禁用上传
	 */
	disabled: false,
	/**
	 * 限制可上传的最大个数
	 */
	max: undefined,
	/**
	 * 是否开启多选文件
	 */
	multiple: false,
	/**
	 * FormData中文件对应的键
	 */
	name: 'file',
	/**
	 * 是否显示预览按钮
	 */
	showPreviewButton: true,
	/**
	 * 是否显示下载按钮
	 */
	showDownloadButton: true,
	/**
	 * 是否显示删除按钮
	 */
	showRemoveButton: true,
	/**
	 * 是否显示重试按钮
	 */
	showRetryButton: true,
	/**
	 * 点击预览按钮时触发
	 */
	onPreview: undefined,
	/**
	 * 点击删除按钮时触发
	 */
	onDelete: undefined,
	/**
	 * 上传成功后触发
	 */
	onSuccess: undefined,
	/**
	 * 上传失败后触发
	 */
	onFailed: undefined,
	/**
	 * 上传中触发
	 */
	onProgress: undefined,
	/**
	 * 选择文件时触发
	 */
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
			progress: 0,
		}) as IUploadFile;
	});
	fileList.value = fileList.value.concat(files);

	if (props.autoUpload) {
		startUpload();
	}
}

function handleDelete() {}

function handlePreview() {}

function handleSuccess(file: IUploadFile) {
	file.status = 'success';
	file.progress = 1;
	if (props.onSuccess) {
		props.onSuccess({ file });
	}
	fileList.value = fileList.value.slice();
}

function handleFailed(file: IUploadFile) {
	file.status = 'failed';
	file.progress = 1;
	if (props.onSuccess) {
		props.onSuccess({ file });
	}
	fileList.value = fileList.value.slice();
}

function handleProgress(file: IUploadFile, progress: number) {
	file.status = 'uploading';
	file.progress = progress;
	if (props.onProgress) {
		props.onProgress({ file, progress });
	}
	fileList.value = fileList.value.slice();
}

async function startUpload() {
	// 只需上传还未上传的文件
	fileList.value
		.filter((file) => file.status === 'pending')
		.forEach(async (file) => {
			// 上传前预处理
			let canUpload = true;
			if (isFunction(props.beforeUpload)) {
				canUpload = await props.beforeUpload!(file);
			}
			if (canUpload) {
				const formData = new FormData();
				formData.append(props.name, file);
				if (props.params) {
					forOwn(props.params, (v, k) => {
						formData.append(k, v);
					});
				}
				const headers: IUploadHeader = {
					...(props.headers || {}),
					'Content-Type': 'multipart/form-data',
				};

				const xhr = new XMLHttpRequest();
				xhr.open(props.method, props.action, true);
				if (isPlainObject(headers)) {
					forOwn(headers, (v, k) => {
						xhr.setRequestHeader(k, v);
					});
				}
				xhr.addEventListener('load', (e) => {
					if (xhr.readyState === 4 && xhr.status === 200) {
						handleSuccess(file);
					} else {
						handleFailed(file);
					}
				});
				xhr.upload.addEventListener('error', (e) => {
					handleFailed(file);
				});
				xhr.upload.addEventListener('progress', (e) => {
					if (e.lengthComputable) {
						let progress = divide(e.loaded, e.total);
						handleProgress(file, progress);
					}
				});
				xhr.send(formData);
			}
		});
}
</script>
<style lang="scss">
@import './Upload.scss';
</style>
