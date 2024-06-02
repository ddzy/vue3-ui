<template>
	<v3-backdrop v-model="model" custom-class="v3-image-preview" fixed>
		<img
			v-if="props.previewSrc"
			:src="props.previewSrc"
			ref="imgRef"
			alt=""
			class="v3-image-preview__inner"
			draggable="true"
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
					<v3-icon type="ZoomOut"></v3-icon>
				</li>
				<li class="v3-image-preview__toolbar__item">
					<v3-icon type="ZoomIn"></v3-icon>
				</li>
				<li class="v3-image-preview__toolbar__item">
					<v3-icon type="Close"></v3-icon>
				</li>
			</ul>
		</div>
	</v3-backdrop>
</template>
<script lang="ts" setup>
import useElementBounding from '@common/hooks/useElementBounding';
import V3Backdrop from '@components/backdrop/main';
import V3Icon from '@components/icon/main';
import { onMounted, ref } from 'vue';

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

const imgRef = ref<HTMLElement | null>(null);

onMounted(() => {
	useElementBounding(imgRef.value);
});
</script>
<style lang="scss">
@import './ImagePreview.scss';
</style>
