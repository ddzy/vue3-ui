<template>
	<v3-backdrop
		v-model="state.syncedModelValue"
		:center="props.center"
		:fixed="props.fixed"
		@click.stop="handleBackdropClick($event)"
	>
		<transition name="v3-dialog-translate">
			<div
				class="v3-dialog"
				v-if="state.syncedModelValue"
				:style="{
					width: !props.fullscreen ? props.width : '100%',
					marginTop: props.top,
				}"
				:class="[props.customClass, props.fullscreen ? 'is-fullscreen' : '']"
			>
				<div class="v3-dialog__header">
					<div class="v3-dialog-header__title">
						<!-- slot 优先级比 title props 高 -->
						<slot name="title" v-if="context.slots.title"></slot>
						<h3 v-else-if="!context.slots.title && props.title">
							{{ props.title }}
						</h3>
					</div>
					<div class="v3-dialog-header__action">
						<!-- 自定义的按钮组优先级比内置关闭按钮高 -->
						<template v-if="props.headerActions.length">
							<v3-button
								v-for="(v, i) in props.headerActions"
								v-bind="v.buttonProps"
								:key="i"
								@click="v.handler"
							>
								{{ v.text }}
							</v3-button>
						</template>
						<i
							class="v3-icon v3-icon-close"
							v-else-if="!props.headerActions.length && props.showClose"
							@click="handleClose"
						></i>
					</div>
				</div>
				<div class="v3-dialog__body">
					<slot></slot>
				</div>
				<div class="v3-dialog__footer" v-if="context.slots.footer">
					<slot name="footer"></slot>
				</div>
			</div>
		</transition>
	</v3-backdrop>
</template>
<script lang="ts">
import {
	defineComponent,
	getCurrentInstance,
	PropType,
	reactive,
	ref,
	toRef,
	watch,
} from 'vue';
import * as TYPES from '@/public/types/dialog';
import V3Backdrop from '@components/backdrop/src/components/Backdrop.vue';
import V3Button from '@components/button/src/components/Button.vue';

export default defineComponent({
	name: 'V3Dialog',
	components: {
		V3Backdrop,
		V3Button,
	},
	props: {
		/** 弹窗的显隐状态 */
		modelValue: {
			type: Boolean,
			required: true,
		},
		/** 弹窗的标题 */
		title: {
			type: String,
			default: '',
		},
		/** 弹窗宽度 */
		width: {
			type: String,
			default: '50%',
		},
		/** 弹窗整体是否水平垂直居中 */
		center: {
			type: Boolean,
			default: true,
		},
		/** 弹窗距离顶部的距离 */
		top: {
			type: String,
			default: '',
		},
		/** 是否全屏展示 */
		fullscreen: {
			type: Boolean,
			default: false,
		},
		/** 是否禁止滚动穿透 */
		fixed: {
			type: Boolean,
			default: true,
		},
		/** 自定义弹窗的类名 */
		customClass: {
			type: String,
			default: '',
		},
		/** 点击遮罩层时是否同时关闭弹窗 */
		closeOnClickBackdrop: {
			type: Boolean,
			default: true,
		},
		/** 是否显示关闭按钮 */
		showClose: {
			type: Boolean,
			default: true,
		},
		/** header 区域的操作按钮组 */
		headerActions: {
			type: Array as PropType<TYPES.IDialogHeaderActionItem[]>,
			default: [],
		},
		/** 关闭弹窗前要触发的事件（执行 done 回调则表明关闭弹窗，反之则不关闭） */
		beforeClose: {
			type: Function as PropType<TYPES.IDialogBeforeClose>,
			default: null,
		},
	},
	setup(props: TYPES.IDialogProps, context) {
		const state = reactive({
			syncedModelValue: false,
		});
		const app = ref(getCurrentInstance()).value;

		watch(toRef(props, 'modelValue'), () => {
			state.syncedModelValue = props.modelValue;
		});

		function handleClose() {
			// 关闭之前的处理
			if (typeof props.beforeClose === 'function') {
				props.beforeClose(() => {
					context.emit('update:modelValue', false);
				});
			} else {
				context.emit('update:modelValue', false);
			}
		}

		function handleBackdropClick(e: MouseEvent) {
			// 点击遮罩层时，要根据 closeOnClickBackdrop 来判断是否可以关闭弹窗
			if (props.closeOnClickBackdrop) {
				const target = e.target as HTMLElement;

				// 只有点击遮罩层本身才会关闭弹窗，点击其内部子元素则不会关闭
				if (
					target.nodeName === 'DIV' &&
					target.classList.contains('v3-backdrop')
				) {
					handleClose();
				}
			}
		}

		return {
			props,
			context,
			state,
			app,
			handleClose,
			handleBackdropClick,
		};
	},
});
</script>
<style lang="scss" scoped>
@import './Dialog.scss';
</style>
