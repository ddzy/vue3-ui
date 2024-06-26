<template>
	<div
		:class="{
			'v3-card': true,
			'has-header': computedHasHeader,
			'has-footer': computedHasFooter,
			[`is-shadow--${props.shadowSize}`]: true,
			[`is-shadow-trigger--${props.shadowTrigger}`]: true,
		}"
	>
		<div class="v3-card__header" v-if="computedHasHeader">
			<!-- slot="header" 优先级比 title 高 -->
			<slot name="header" v-if="context.slots.header"></slot>
			<h4 v-else-if="props.title && !context.slots.header">
				{{ props.title }}
			</h4>
		</div>
		<div class="v3-card__body" :style="props.bodyStyle">
			<slot></slot>
		</div>
		<div class="v3-card__footer" v-if="computedHasFooter">
			<slot name="footer"></slot>
		</div>
	</div>
</template>
<script lang="ts">
import { PropType, computed, defineComponent, reactive } from 'vue';

import * as TYPES from '@typings/index';

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
		/** 卡片阴影的大小 */
		shadowSize: {
			type: String as PropType<TYPES.ICardShadowSize>,
			default: 'small',
			validator(v: string) {
				return ['small', 'medium', 'large'].includes(v);
			},
		},
	},
	setup(props: Required<TYPES.ICardProps>, context) {
		const state: IState = reactive({});

		const computedHasHeader = computed(() => {
			return !!props.title || !!context.slots.header;
		});
		const computedHasFooter = computed(() => {
			return !!context.slots.footer;
		});

		return {
			state,
			props,
			context,
			computedHasHeader,
			computedHasFooter,
		};
	},
	methods: {
		close() {
			close();
		},
	},
});
</script>
<style lang="scss">
@import './Card.scss';
</style>
