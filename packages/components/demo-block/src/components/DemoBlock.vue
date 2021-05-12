<template>
	<div class="v3-demo-block">
		<div class="v3-demo-block__view" v-if="app.slots.default">
			<slot></slot>
		</div>
		<div class="v3-demo-block__description" v-if="app.slots.description">
			<div class="description__tip">
				{{ state.defaultProps.descriptionTip }}
			</div>
			<div class="description__content">
				<slot name="description"></slot>
			</div>
		</div>
		<div class="v3-demo-block__code" v-if="state.defaultProps.code" v-highlight>
			<pre>
        <code>{{ state.defaultProps.code }}</code>
      </pre>
		</div>
		<div class="v3-demo-block__functional">
			<div class="functional__expand">
				<span>点击展开</span>
			</div>
			<div class="functional__extra">
				<div
					class="functional-extra__item"
					v-for="v in state.defaultProps.extraList"
					:key="v.icon"
					@click="handleExtraClick(v)"
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
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';

import * as TYPES from '../../index';

export default defineComponent({
	name: 'V3DemoBlock',
	props: {
		/** 描述区域的提示（默认为【概述】） */
		descriptionTip: String as PropType<TYPES.IDemoBlcokDescriptionTip>,
		/** 功能按钮列表 */
		extraList: Array as PropType<TYPES.IDemoBlockExtraItem[]>,
		/** 是否需要显示默认的【复制】功能按钮 */
		hasCopy: Boolean as PropType<TYPES.IDemoBlockHasCopy>,
		/** 是否需要显示默认的【CodeSandbox】功能按钮 */
		hasCodeSandbox: Boolean as PropType<TYPES.IDemoBlockHasCodesandbox>,
		/** 代码块中展示的【代码】 */
		code: String as PropType<TYPES.IDemoBlockCode>,
	},
	emits: ['extraClick'],
	directives: {
		highlight: {
			mounted(el) {
				const blocks = el.querySelectorAll('pre code');
				blocks.forEach((block: any) => {
					hljs.highlightBlock(block);
				});
			},
		},
	},
	setup(props, context) {
		const state = reactive({
			defaultProps: {
				descriptionTip: '概述',
				extraList: [],
				hasCopy: false,
				hasCodeSandbox: false,
				code: '',
			} as {
				descriptionTip: TYPES.IDemoBlcokDescriptionTip;
				extraList: TYPES.IDemoBlockExtraItem[];
				hasCopy: TYPES.IDemoBlockHasCopy;
				hasCodeSandbox: TYPES.IDemoBlockHasCodesandbox;
				code: TYPES.IDemoBlockCode;
			},
		});
		const app = getCurrentInstance();

		watch(
			props,
			() => {
				state.defaultProps = {
					...state.defaultProps,
					...reactive(props),
				};

				if (state.defaultProps.hasCodeSandbox) {
					state.defaultProps.extraList = ([
						{
							icon: 'v3-icon-similar-product',
							title: '在 CodeSandbox 中打开',
						},
					] as TYPES.IDemoBlockExtraItem[]).concat(
						state.defaultProps.extraList
					);
				}

				if (state.defaultProps.hasCopy) {
					state.defaultProps.extraList = ([
						{
							icon: 'v3-icon-confirm',
							title: '复制',
						},
					] as TYPES.IDemoBlockExtraItem[]).concat(
						state.defaultProps.extraList
					);
				}
			},
			{
				immediate: true,
			}
		);

		return {
			app,
			state,
		};
	},
	methods: {
		handleExtraClick(v: TYPES.IDemoBlockExtraItem) {
			this.$emit('extraClick', v);
		},
	},
});
</script>
<style lang="scss" scoped>
@import './DemoBlock.scss';
</style>
