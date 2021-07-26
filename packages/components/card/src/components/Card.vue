<template>
	<div class="v3-card">
		<div class="v3-card__header">
			<slot name="header"></slot>
		</div>
		<div class="v3-card__body" :style="props.bodyStyle">
			<slot></slot>
		</div>
		<div class="v3-card__footer">
			<slot name="footer"></slot>
		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent, PropType, reactive } from 'vue';
import * as TYPES from '@/public/types/card';

interface IState {}

export default defineComponent({
	name: 'V3Card',
	props: {
		/** 卡片标题（可通过 slot="header" 自定义） */
		title: {
			type: String,
			default: '',
		},
		/** 自定义卡片内容区的样式 */
		bodyStyle: {
			type: Object as PropType<TYPES.ICardBodyStyle>,
			default: {},
		},
		/** 何时显示卡片阴影 */
		shadowTrigger: {
			type: String as PropType<TYPES.ICardShadowTrigger>,
			default: 'alway',
			validator(v: string) {
				return ['hover', 'alway', 'never'].includes(v);
			},
		},
	},
	setup(props: TYPES.ICardProps, context) {
		const state: IState = reactive({});

		return {
			state,
			props,
			context,
		};
	},
	methods: {
		close() {
			close();
		},
	},
});
</script>
<style lang="scss" scoped>
@import './Card.scss';
</style>
