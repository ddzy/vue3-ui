<template>
	<!-- 反之，如果是容器内的 loading -->
	<transition name="v3-backdrop-fade" appear>
		<div
			v-if="state.isShow"
			:class="[
				'v3-loading',
				props.fullscreen ? 'is-fullscreen' : '',
				props.fixed ? 'is-fixed' : '',
				props.customClass,
			]"
			:id="`v3-loading-${app.uid}`"
			:style="{
				backgroundColor: props.backgroundColor,
				color: props.color,
				zIndex: VARIABLE.getNextZIndex(),
			}"
		>
			<div class="v3-loading__spinning">
				<i class="v3-icon v3-icon-loading"></i>
			</div>

			<div class="v3-loading__content">
				<!-- 如果自定义内容为字符串 -->
				<span v-if="!isVNode(props.content)">
					{{ props.content }}
				</span>

				<!-- 如果自定义内容为 VNode -->
				<RenderVNode v-else :vnode="props.content" />
			</div>
		</div>
	</transition>
</template>
<script lang="ts">
import {
	defineComponent,
	h,
	PropType,
	reactive,
	VNode,
	isVNode,
	ref,
	getCurrentInstance,
	watch,
	toRef,
} from 'vue';
import * as TYPES from '@/public/types/loading';
import V3Backdrop from '@components/backdrop/main';
import { close } from './LoadingConstructor';
import VARIABLE from '@common/constants/internal-variable';

interface IState {
	isShow: boolean;
}

export default defineComponent({
	name: 'V3Loading',
	components: {
		V3Backdrop,
		RenderVNode: defineComponent({
			props: {
				vnode: {
					type: Object as PropType<VNode>,
					default: null,
				},
			},
			setup(props) {
				return () => h(props.vnode);
			},
		}),
	},
	props: {
		/** 是否全屏显示 */
		fullscreen: {
			type: Boolean,
			default: false,
		},
		/** 是否避免滚动穿透 */
		fixed: {
			type: Boolean,
			default: true,
		},
		/** 自定义 loading 内容 */
		content: {
			type: [String, Object] as PropType<TYPES.ILoadingContent>,
			default: 'Loading...',
		},
		/** 自定义 loading 遮罩层的背景色 */
		backgroundColor: {
			type: String,
			default: '',
		},
		/** 自定义 loading 的文字颜色 */
		color: {
			type: String,
			default: '',
		},
		/** 自定义 loading 容器类名 */
		customClass: {
			type: String,
			default: '',
		},
	},
	setup(props: Required<TYPES.ILoadingProps>, context) {
		const state: IState = reactive({
			/** 当前 loading 的显隐状态 */
			isShow: true,
		});
		const app = ref(getCurrentInstance()).value;

		watch(
			toRef(props, 'fullscreen'),
			() => {
				computeBodyClass();
			},
			{ immediate: true }
		);

		/**
		 * 解决滚动穿透
		 */
		function computeBodyClass() {
			if (props.fullscreen) {
				if (props.fixed) {
					document.body.classList.add('v3-body--fixed');
				}
			} else {
				document.body.classList.remove('v3-body--fixed');
			}
		}

		return {
			state,
			props,
			context,
			app,
			isVNode,
			VARIABLE,
		};
	},
	methods: {
		close() {
			close(this);
		},
	},
});
</script>
<style lang="scss">
.v3-body--fixed {
	overflow: hidden;
}
</style>

<style lang="scss" scoped>
@import './Loading.scss';
</style>
