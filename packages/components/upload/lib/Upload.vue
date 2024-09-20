<template>
	<div :class="['v3-upload']">
		<input
			v-show="false"
			:id="`v3-upload__trigger--${app?.uid}`"
			:multiple="props.multiple"
			:accept="props.accept"
			type="file"
			ref="inputRef"
			@change="handleChange"
		/>
		<span
			v-if="props.listType === 'text'"
			class="v3-upload__trigger"
			@click="handleTrigger"
		>
			<slot></slot>
		</span>
		<div :class="['v3-upload__list-wrapper', `is-list-${props.listType}`]">
			<ul class="v3-upload__list">
				<li
					v-for="(v, i) in fileList"
					:key="v.id"
					:class="['v3-upload__item', `is-${v.status}`]"
					:style="{
						'--url': `url(${formatPreviewUrl(v)})`,
					}"
				>
					<V3Icon
						v-if="props.listType === 'text'"
						:type="
							v.status === 'success'
								? 'CheckOne'
								: v.status === 'failed'
									? 'CloseOne'
									: v.status === 'uploading'
										? 'LoadingOne'
										: 'Link'
						"
						:spin="v.status === 'uploading'"
						class="v3-upload__item-thumb"
					/>
					<span v-if="props.listType === 'text'" class="v3-upload__item-name">{{
						v.name
					}}</span>
					<div class="v3-upload__item-action">
						<V3Icon
							v-if="props.showPreviewButton"
							type="PreviewOpen"
							class="v3-upload__item-preview"
							title="预览"
							@click="handlePreview(v, i)"
						/>
						<V3Icon
							v-if="props.showDownloadButton && v.status === 'success'"
							type="Download"
							class="v3-upload__item-download"
							title="下载"
							@click="handleDownload(v, i)"
						/>
						<V3Icon
							v-if="props.showRemoveButton"
							type="Delete"
							class="v3-upload__item-remove"
							title="删除"
							@click="handleRemove(v, i)"
						/>
						<V3Icon
							v-if="props.showRetryButton && v.status === 'failed'"
							type="Redo"
							class="v3-upload__item-retry"
							title="重试"
							@click="handleRetry(v, i)"
						/>
					</div>
					<div
						:style="{
						right: isNumber(v.progress) ? `${multiply(subtract(1, v.progress!), 100)}%` : 'auto',
					}"
						class="v3-upload__item-progress"
					></div>
				</li>
				<li
					v-if="props.listType === 'picture-wall'"
					class="v3-upload__item is-uploader"
					@click="handleTrigger"
				>
					<slot v-if="slots.default"></slot>
					<V3Icon v-else type="Plus" size="20px" />
				</li>
			</ul>
		</div>

		<V3Dialog v-model="showPreviewDialog">
			<img v-if="isImageURL(currentFile?.name)" :src="previewUrl" alt="" />
			<video
				v-else-if="isVideoURL(currentFile?.name)"
				:src="previewUrl"
				alt=""
				autoplay
				controls
				muted
			/>
		</V3Dialog>
	</div>
</template>
<script lang="tsx" setup>
import { getCurrentInstance, ref, toRef, useSlots, watch } from 'vue';

import { divide, multiply, subtract } from '@common/utils';
import { V3Dialog, V3Icon } from '@components/main';
import { IUploadFile, IUploadHeader, IUploadProps } from '@typings/index';
import {
	cloneDeep,
	forOwn,
	isFunction,
	isNumber,
	isPlainObject,
} from 'lodash-es';
import { v4 as uuidv4 } from 'uuid';

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
	 * 自定义预览
	 */
	onPreview: undefined,
	/**
	 * 删除文件（可返回false、Promise<false>、Promise.reject来阻止删除）
	 */
	onRemove: undefined,
	/**
	 * 自定义下载文件
	 */
	onDownload: undefined,
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
const slots = useSlots();

function isImageURL(url: string = '') {
	const imageRegex = /\.(jpg|jpeg|png|gif|bmp|svg)$/i;
	return imageRegex.test(url);
}
function isVideoURL(url: string = '') {
	const videoRegex = /\.(mp4|mkv|avi|mov|flv|wmv)$/i;
	return videoRegex.test(url);
}

const inputRef = ref<HTMLInputElement>();
function handleTrigger() {
	inputRef.value?.click?.();
}

const fileList = ref<IUploadFile[]>([]);
watch(
	() => props.fileList,
	(newValue) => {
		if (newValue) {
			fileList.value = cloneDeep(newValue);
		}
	},
	{ immediate: true, deep: true },
);
function handleChange(e: Event) {
	const target = e.target as HTMLInputElement;
	const rawFiles = target.files ? Array.from(target.files) : [];
	const files: IUploadFile[] = rawFiles.map((v) => {
		return {
			id: uuidv4(),
			status: 'pending',
			name: v.name,
			type: v.type,
			progress: 0,
			size: v.size,
			raw: v,
		} as IUploadFile;
	});
	fileList.value = fileList.value.concat(toRef(files).value);

	if (props.autoUpload) {
		startUpload();
	}
}

const currentFile = ref<IUploadFile>();

async function handleRemove(file: IUploadFile, fileIndex: number) {
	let canRemove = true;
	if (props.onRemove) {
		try {
			canRemove = await props.onRemove({ file });
		} catch (error) {
			canRemove = false;
		}
	}
	if (canRemove !== false) {
		file.status = 'removed';
		fileList.value = fileList.value.filter((v) => v !== file);
	}
}

/**
 * 图片预览
 */
const showPreviewDialog = ref(false);
const previewUrl = ref<string>('');
function handlePreview(file: IUploadFile, fileIndex: number) {
	if (props.onPreview) {
		props.onPreview({ file });
	} else {
		currentFile.value = file;
		previewUrl.value = formatPreviewUrl(file);
		// 图片和视频用弹窗预览
		if (isImageURL(file.name) || isVideoURL(file.name)) {
			showPreviewDialog.value = true;
		} else {
			// 其它文件在新标签页预览
			window.open(previewUrl.value, '_blank');
		}
	}
}
function formatPreviewUrl(file: IUploadFile) {
	return file.url ? file.url : file.raw ? URL.createObjectURL(file.raw!) : '';
}

function handleRetry(file: IUploadFile, fileIndex: number) {
	file.status = 'pending';
	file.progress = 0;
	fileList.value = fileList.value.slice();
	startUpload();
}

async function handleDownload(file: IUploadFile, fileIndex: number) {
	if (props.onDownload) {
		props.onDownload({ file });
	} else {
		const a = document.createElement('a');
		a.download = file.name;
		a.href = formatPreviewUrl(file);
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
	}
}

/**
 * 文件上传成功
 * @param file 文件对象
 * @param shouldTrigger 是否需要调用传入的`onSuccess`回调
 */
function handleSuccess(file: IUploadFile, shouldTrigger: boolean = true) {
	file.status = 'success';
	file.progress = 1;
	fileList.value = fileList.value.slice();
	if (props.onSuccess && shouldTrigger) {
		props.onSuccess({ file });
	}
}

function handleFailed(file: IUploadFile, shouldTrigger: boolean = true) {
	file.status = 'failed';
	file.progress = 1;
	fileList.value = fileList.value.slice();
	if (props.onFailed && shouldTrigger) {
		props.onFailed({ file });
	}
}

function handleProgress(
	file: IUploadFile,
	progress: number,
	shouldTrigger: boolean = true,
) {
	file.status = 'uploading';
	file.progress = progress;
	fileList.value = fileList.value.slice();
	if (props.onProgress && shouldTrigger) {
		props.onProgress({ file, progress });
	}
}

async function startUpload() {
	// 只需上传还未上传的文件
	fileList.value
		.filter((file) => file.status === 'pending')
		.forEach(async (file) => {
			if (!file.raw) {
				return;
			}
			// 上传前预处理
			let canUpload = true;
			if (isFunction(props.beforeUpload)) {
				try {
					let _canUpload = await props.beforeUpload!({ file });
					canUpload = _canUpload !== false;
				} catch (error) {
					canUpload = false;
				}
			}
			if (canUpload) {
				if (props.customUpload) {
					// 如果是自定义上传
					props.customUpload({
						file,
						onSuccess() {
							handleSuccess(file, false);
						},
						onFailed() {
							handleFailed(file, false);
						},
						onProgress(progress) {
							handleProgress(file, progress, false);
						},
					});
				} else {
					const formData = new FormData();
					formData.append(props.name, file.raw!);
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
			} else {
				fileList.value = fileList.value.filter((v) => v !== file);
			}
		});
}

defineExpose({
	startUpload,
});
</script>
<style lang="scss">
@import './Upload.scss';
</style>
