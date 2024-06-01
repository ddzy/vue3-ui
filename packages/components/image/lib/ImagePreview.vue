<template>
	<v3-backdrop v-model="syncedShow" custom-class="v3-image-preview" fixed>
		<img :src="props.previewSrc" alt="" />
	</v3-backdrop>
</template>
<script lang="ts" setup>
import { reactive, ref, watch } from 'vue';
import V3Backdrop from '@components/backdrop/main';

interface IImagePreviewProps {
	show: boolean;
	previewSrc: string;
}

defineOptions({
	name: 'ImagePreview',
});
const props = withDefaults(defineProps<IImagePreviewProps>(), {});

const syncedShow = ref(false);
watch(
	() => props.show,
	() => {
		syncedShow.value = props.show;
		console.log('props.show :>> ', props.show);
	},
	{ immediate: true },
);
</script>
<style lang="scss">
.v3-image-preview {
}
</style>
