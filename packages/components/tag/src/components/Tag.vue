<template>
	<div class="v3-tag">
		<slot></slot>
	</div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';
import * as TYPES from '@/public/types/tag';

export default defineComponent({
	name: 'V3Tag',
	props: {
		/** 标签的类型（与 V3Button 大体相同） */
		type: {
			type: String as PropType<TYPES.ITagType>,
			default: 'default',
			validator(v: any) {
				return [
					'primary',
					'success',
					'danger',
					'default',
					'warning',
					'info',
				].includes(v);
			},
		},
		/** 是否可关闭标签 */
		closeable: {
			type: Boolean,
			default: false,
		},
		/** 是否为朴素标签（与 V3Button 相同） */
		plain: {
			type: Boolean,
			default: true,
		},
		/** 标签尺寸 */
		size: {
			type: String as PropType<TYPES.ITagSize>,
			default: 'medium',
			validator(v: any) {
				return ['small', 'medium', 'large'].includes(v);
			},
		},
		/** 自定义标签的背景色 */
		backgroundColor: {
			type: String,
			default: '',
		},
		/** 自定义标签的文字颜色 */
		color: {
			type: String,
			default: '',
		},
	},
	setup(props: TYPES.ITagProps, context) {},
});
</script>
<style lang="scss" scoped>
@import './Tag.scss';
</style>
