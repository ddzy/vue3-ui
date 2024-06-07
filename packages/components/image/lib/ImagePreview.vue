<template>
	<v3-backdrop
		v-model="model"
		ref="imgWrapperRef"
		custom-class="v3-image-preview"
		fixed
		:close-on-click="false"
	>
		<img
			v-if="props.previewSrc"
			:src="props.previewSrc"
			:style="{
				transform: `scale(${scale})`,
			}"
			ref="imgRef"
			alt=""
			class="v3-image-preview__inner"
		/>
		<div v-if="props.showToolbar" class="v3-image-preview__toolbar">
			<ul class="v3-image-preview__toolbar__list">
				<li class="v3-image-preview__toolbar__item">
					<v3-icon type="Undo"></v3-icon>
				</li>
				<li class="v3-image-preview__toolbar__item">
					<v3-icon type="Redo"></v3-icon>
				</li>
				<li class="v3-image-preview__toolbar__item">
					<v3-icon type="ZoomOut" @click="handleZoomOut"></v3-icon>
				</li>
				<li class="v3-image-preview__toolbar__item">
					<v3-icon type="ZoomIn" @click="handleZoomIn"></v3-icon>
				</li>
				<li class="v3-image-preview__toolbar__item">
					<v3-icon type="Close" @click="model = false"></v3-icon>
				</li>
			</ul>
		</div>
	</v3-backdrop>
</template>
<script lang="ts" setup>
import { useDraggable } from '@common/hooks';
import V3Backdrop from '@components/backdrop/main';
import V3Icon from '@components/icon/main';
import { ref } from 'vue';

interface IImagePreviewProps {
	modelValue: boolean;
	previewSrc: string;
	showToolbar?: boolean;
}

defineOptions({
	name: 'ImagePreview',
});
const props = withDefaults(defineProps<IImagePreviewProps>(), {
	showToolbar: true,
});
const emit = defineEmits<{
	(e: 'update:modelValue', v: boolean): void;
}>();
const model = defineModel();

// 可拖动
const imgWrapperRef = ref();
const imgRef = ref();
useDraggable(imgRef);

// 可放大缩小
const scale = ref(1);
function handleZoomIn() {
	scale.value += 0.2;
}
function handleZoomOut() {
	scale.value -= 0.2;
}
</script>
<style lang="scss">
@import './ImagePreview.scss';
</style>
