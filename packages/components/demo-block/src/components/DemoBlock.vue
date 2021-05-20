<template>
	<div class="v3-demo-block">
		<div
			class="v3-demo-block__view v3-demo-block__common"
			v-if="app.slots.default"
		>
			<slot></slot>
		</div>
		<div
			class="v3-demo-block__description v3-demo-block__common"
			v-if="app.slots.description"
		>
			<div class="description__tip" v-if="props.descriptionTip">
				{{ props.descriptionTip }}
			</div>
			<div class="description__detail">
				<slot name="description"></slot>
			</div>
		</div>
		<transition
			v-if="app.slots.detail"
			@enter="transitionEnter"
			@leave="transitionLeave"
		>
			<div
				class="v3-demo-block__detail v3-demo-block__common"
				v-show="state.isDetailAreaExpand"
			>
				<slot name="detail"></slot>
			</div>
		</transition>
		<div class="v3-demo-block__functional v3-demo-block__common">
			<div class="functional__expand">
				<span @click="expandDetailArea">{{
					state.isDetailAreaExpand
						? props.expandedBtnText
						: props.defaultBtnText
				}}</span>
			</div>
			<div class="functional__extra">
				<div
					class="functional-extra__item"
					v-for="v in props.extraList"
					:key="v.icon"
					@click="handleExtraItemClick(v)"
				>
					<i
						:class="{
							'v3-icon': true,
							[v.icon]: true,
						}"
						:title="v.title"
					></i>
				</div>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
import {
	defineComponent,
	getCurrentInstance,
	PropType,
	reactive,
	watch,
} from 'vue';

import * as TYPES from '@/public/types/demo-block';
import * as UTILS from '@common/utils/index';

export default defineComponent({
	name: 'V3DemoBlock',
	props: {
		/** 描述区域的提示*/
		descriptionTip: {
			type: String,
			default: '',
		},
		/** 功能按钮列表 */
		extraList: {
			type: Array as PropType<TYPES.IDemoBlockExtraItem[]>,
			default: [],
		},
		/** 详情区域展开时的按钮文本 */
		expandedBtnText: {
			type: String,
			default: '点击收缩',
		},
		/** 详情区域收缩时的按钮文本 */
		defaultBtnText: {
			type: String,
			default: '点击展开',
		},
	},
	emits: ['extraClick'],
	setup(props: TYPES.IDemoBlockProps) {
		const state = reactive({
			/** 详情区域是否展开 */
			isDetailAreaExpand: false,
		});
		const app = getCurrentInstance();

		return {
			app,
			state,
			props,
		};
	},
	methods: {
		handleExtraItemClick(v: TYPES.IDemoBlockExtraItem) {
			this.$emit('extraClick', v);
		},
		/**
		 * 展开 or 收缩内容区域
		 */
		expandDetailArea() {
			this.state.isDetailAreaExpand = !this.state.isDetailAreaExpand;
		},
		transitionEnter(el: HTMLElement) {
			UTILS.handleTransitionEnter(el);
		},
		transitionLeave(el: HTMLElement) {
			UTILS.handleTransitionLeave(el);
		},
	},
});
</script>
<style lang="scss" scoped>
@import './DemoBlock.scss';
</style>
