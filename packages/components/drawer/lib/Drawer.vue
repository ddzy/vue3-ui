<template>
	<v3-backdrop
		v-model="model"
		:center="false"
		:fixed="true"
		:close-on-click="props.closeOnClickBackdrop"
	>
		<transition :name="`v3-drawer-translate-${props.placement}`">
			<div
				v-if="model"
				class="v3-drawer"
				:class="{
					[`is-${props.placement}`]: true,
					'has-header': computedHasHeader,
					'has-footer': computedHasFooter,
				}"
				:style="{
					width: computedWidth,
					height: computedHeight,
				}"
			>
				<div class="v3-drawer__header">
					<div class="v3-drawer-header__title">
						<template v-if="slots.header">
							<slot name="header"></slot>
						</template>
						<template v-else-if="!slots.header && props.title">
							<h3>{{ props.title }}</h3>
						</template>
					</div>
					<V3Icon
						v-if="props.showClose"
						type="CloseSmall"
						class="v3-drawer-header__close"
						@click="handleClose"
					/>
				</div>
				<div class="v3-drawer__content">
					<slot name="default"></slot>
				</div>
				<div class="v3-drawer__footer">
					<template v-if="slots.footer">
						<slot name="footer"></slot>
					</template>
					<div
						v-else
						class="v3-drawer-footer__btns"
						:class="{
							'has-confirm': props.showConfirm,
							'has-cancel': props.showCancel,
						}"
					>
						<v3-button
							v-if="props.showConfirm"
							:type="'primary'"
							:loading="props.confirmLoading"
							@click="handleConfirm"
							>{{ props.confirmText }}</v3-button
						>
						<v3-button
							v-if="props.showCancel"
							:type="'default'"
							@click="handleClose"
							>{{ props.cancelText }}</v3-button
						>
					</div>
				</div>
			</div>
		</transition>
	</v3-backdrop>
</template>
<script lang="ts" setup>
import * as UTILS from '@common/utils/index';
import V3Backdrop from '@components/backdrop/main';
import V3Button from '@components/button/main';
import V3Icon from '@components/icon/main';
import { IDrawerProps } from '@typings/index';
import { computed, useSlots } from 'vue';

defineOptions({
	name: 'V3Drawer',
});
const props = withDefaults(defineProps<IDrawerProps>(), {
	/** v-model */
	modelValue: false,
	/** 抽屉弹出的位置 */
	placement: 'right',
	/** 抽屉标题，也可通过 slot=header 指定 */
	title: '',
	/** 是否显示关闭按钮 */
	showClose: true,
	/** 点击遮罩层是否关闭抽屉 */
	closeOnClickBackdrop: true,
	/** 确定按钮的文案 */
	confirmText: '确定',
	/** 取消按钮的文案 */
	cancelText: '取消',
	/** 是否显示确定按钮 */
	showConfirm: true,
	/** 是否显示取消按钮 */
	showCancel: true,
	/** 确定按钮的 loading 状态 */
	confirmLoading: false,
	/** 抽屉的宽度（当 placement 为 'left'/'right' 时有效 */
	width: 250,
	/** 抽屉的高度（当 placement 为 'top'/'bottom' 时有效 */
	height: 'auto',
	/** 点击确认按钮时的回调 */
	onConfirm: (done: Function) => {
		done();
	},
	/** 点击取消按钮时的回调（需手动调用 done 来关闭弹窗 */
	onCancel: (done: Function) => {
		done();
	},
});
const emit = defineEmits<{
	(e: 'update:modelValue', v: boolean): void;
}>();
const model = defineModel();
const slots = useSlots();

const computedWidth = computed(() => {
	return ['left', 'right'].includes(props.placement)
		? UTILS.isStrictNumber(props.width)
			? `${props.width}px`
			: UTILS.isString(props.width)
			? props.width
			: `0px`
		: `100%`;
});
const computedHeight = computed(() => {
	return ['top', 'bottom'].includes(props.placement)
		? UTILS.isStrictNumber(props.height)
			? `${props.height}px`
			: UTILS.isString(props.height)
			? props.height
			: `0px`
		: `100%`;
});
const computedHasHeader = computed(() => {
	return !!(slots.header || props.title || props.showClose);
});
const computedHasFooter = computed(() => {
	return !!(slots.footer || props.showConfirm || props.showCancel);
});

function _closeHelper() {
	model.value = false;
}

function handleClose() {
	props.onCancel(_closeHelper);
}

function handleConfirm() {
	UTILS.isFunction(props.onConfirm) && props.onConfirm(_closeHelper);
}
</script>
<style lang="scss">
@import './Drawer.scss';
</style>
