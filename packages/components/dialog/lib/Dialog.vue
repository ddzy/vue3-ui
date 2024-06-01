<template>
	<v3-backdrop v-model="model" :center="props.center" :fixed="props.fixed">
		<transition name="v3-dialog-translate">
			<div
				v-if="model"
				class="v3-dialog"
				:style="{
					width: !props.fullscreen ? props.width : '100%',
					marginTop: props.top,
				}"
				:class="[props.customClass, props.fullscreen ? 'is-fullscreen' : '']"
			>
				<div class="v3-dialog__header">
					<div class="v3-dialog-header__title">
						<!-- slot 优先级比 title props 高 -->
						<slot name="title" v-if="slots.title"></slot>
						<h3 v-else-if="!slots.title && props.title">
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
						<V3Icon
							v-else-if="!props.headerActions.length && props.showClose"
							type="CloseSmall"
							@click="handleClose"
						/>
					</div>
				</div>
				<div class="v3-dialog__body">
					<slot></slot>
				</div>
				<div class="v3-dialog__footer" v-if="slots.footer">
					<slot name="footer"></slot>
				</div>
			</div>
		</transition>
	</v3-backdrop>
</template>
<script lang="ts" setup>
import { useSlots } from 'vue';
import type { IDialogProps } from '@typings/index';
import V3Backdrop from '@components/backdrop/main';
import V3Button from '@components/button/main';
import V3Icon from '@components/icon/main';

defineOptions({
	name: 'V3Dialog',
});
const props = withDefaults(defineProps<IDialogProps>(), {
	/** v-model */
	modelValue: false,
	/** 弹窗的标题 */
	title: '',
	/** 弹窗宽度 */
	width: '50%',
	/** 弹窗整体是否水平垂直居中 */
	center: true,
	/** 弹窗距离顶部的距离 */
	top: '',
	/** 是否全屏展示 */
	fullscreen: false,
	/** 是否禁止滚动穿透 */
	fixed: true,
	/** 自定义弹窗的类名 */
	customClass: '',
	/** 点击遮罩层时是否关闭弹窗 */
	closeOnClickBackdrop: true,
	/** 是否显示关闭按钮 */
	showClose: true,
	/** header 区域的操作按钮组 */
	headerActions: () => [],
	/** 关闭弹窗前要触发的事件（执行 done 回调则表明关闭弹窗，反之则不关闭） */
	beforeClose: (done: Function) => {
		done();
	},
});
const emit = defineEmits<{
	(e: 'update:modelValue', v: boolean): void;
}>();
const slots = useSlots();
const model = defineModel();

function handleClose() {
	// 关闭之前的处理
	props.beforeClose(() => {
		model.value = false;
	});
}
</script>
<style lang="scss">
@import './Dialog.scss';
</style>
