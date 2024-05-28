<template>
	<v3-backdrop
		v-model="state.syncedModelValue"
		:center="false"
		:fixed="true"
		@click.stop="handleBackdropClick($event)"
	>
		<div
			class="v3-drawer"
			:class="{
				[`is-${props.placement}`]: true,
				'has-header': computedHasHeader,
				'has-footer': computedHasFooter,
			}"
		>
			<transition :name="`v3-drawer-translate-${props.placement}`">
				<div
					v-if="state.syncedModelValue"
					class="v3-drawer__inner"
					:style="{
						width: computedWidth,
						height: computedHeight,
					}"
				>
					<div class="v3-drawer__header">
						<div class="v3-drawer-header__title">
							<template v-if="context.slots.header">
								<slot name="header"></slot>
							</template>
							<template v-else-if="!context.slots.header && props.title">
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
						<template v-if="context.slots.footer">
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
		</div>
	</v3-backdrop>
</template>
<script lang="ts">
import {
	computed,
	defineComponent,
	getCurrentInstance,
	PropType,
	reactive,
	ref,
	toRef,
	watch,
} from 'vue';
import * as TYPES from '@typings/index';
import * as UTILS from '@common/utils/index';
import V3Backdrop from '@components/backdrop/main';
import V3Button from '@components/button/main';
import V3Icon from '@components/icon/main';

interface IState {
	syncedModelValue: boolean;
}

export default defineComponent({
	name: 'V3Drawer',
	components: {
		V3Backdrop,
		V3Button,
		V3Icon,
	},
	props: {
		modelValue: {
			type: Boolean,
			default: false,
		},
		/** 抽屉弹出的位置 */
		placement: {
			type: String as PropType<TYPES.IDrawerPlacement>,
			default: 'right',
			validator: (v: string) => {
				return ['top', 'left', 'bottom', 'right'].includes(v);
			},
		},
		/** 抽屉标题，也可通过 slot=header 指定 */
		title: {
			type: String,
			default: '',
		},
		/** 是否显示关闭按钮 */
		showClose: {
			type: Boolean,
			default: true,
		},
		/** 点击遮罩层是否关闭抽屉 */
		closeOnClickBackdrop: {
			type: Boolean,
			default: true,
		},
		/** 确定按钮的文案 */
		confirmText: {
			type: String,
			default: '确定',
		},
		/** 取消按钮的文案 */
		cancelText: {
			type: String,
			default: '取消',
		},
		/** 是否显示确定按钮 */
		showConfirm: {
			type: Boolean,
			default: true,
		},
		/** 是否显示取消按钮 */
		showCancel: {
			type: Boolean,
			default: true,
		},
		/** 确定按钮的 loading 状态 */
		confirmLoading: {
			type: Boolean,
			default: false,
		},
		/** 抽屉的宽度（当 placement 为 'left'/'right' 时有效 */
		width: {
			type: [String, Number],
			default: 250,
		},
		/** 抽屉的高度（当 placement 为 'top'/'bottom' 时有效 */
		height: {
			type: [String, Number],
			default: 'auto',
		},
		/** 点击确认按钮时的回调 */
		onConfirm: {
			type: Function as PropType<TYPES.IDrawerOnConfirm>,
			default: null,
		},
		/** 点击取消按钮时的回调（需手动调用 done 来关闭弹窗 */
		onCancel: {
			type: Function as PropType<TYPES.IDrawerOnCancel>,
			default: (done: Function) => done(),
		},
	},
	setup(props: Required<TYPES.IDrawerProps>, context) {
		const state: IState = reactive({
			syncedModelValue: props.modelValue,
		});
		const app = ref(getCurrentInstance()).value;

		watch(toRef(props, 'modelValue'), () => {
			state.syncedModelValue = props.modelValue;
		});

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
			return !!(context.slots.header || props.title || props.showClose);
		});
		const computedHasFooter = computed(() => {
			return !!(context.slots.footer || props.showConfirm || props.showCancel);
		});

		function _closeHelper() {
			context.emit('update:modelValue', false);
		}

		function handleClose() {
			props.onCancel(_closeHelper);
		}

		function handleConfirm() {
			UTILS.isFunction(props.onConfirm) && props.onConfirm(_closeHelper);
		}

		function handleBackdropClick(e: MouseEvent) {
			// 点击遮罩层时，要根据 closeOnClickBackdrop 来判断是否可以关闭抽屉
			if (props.closeOnClickBackdrop) {
				const target = e.target as HTMLElement;

				// 只有点击遮罩层本身才会关闭抽屉，点击其内部子元素则不会关闭
				if (
					target.nodeName === 'DIV' &&
					(target.classList.contains('v3-backdrop') ||
						target.classList.contains('v3-drawer'))
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
			computedWidth,
			computedHeight,
			computedHasHeader,
			computedHasFooter,
			handleClose,
			handleConfirm,
			handleBackdropClick,
		};
	},
});
</script>
<style lang="scss">
@import './Drawer.scss';
</style>
