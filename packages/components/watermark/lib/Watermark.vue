<template>
	<div class="v3-watermark">
		<slot></slot>
	</div>
</template>
<script lang="ts" setup>
import { IWatermarkProps } from '@/public/typings';

defineOptions({
	name: 'V3Watermark',
});

const props = withDefaults(defineProps<IWatermarkProps>(), {});
</script>
