<template>
	<v3-backdrop v-model="state.syncedModelValue">
		<transition name="v3-drawer-translate">
			<div class="v3-drawer" v-if="state.syncedModelValue">drawer</div>
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
import * as TYPES from '@/public/types/drawer';
import V3Backdrop from '@components/backdrop/src/components/Backdrop.vue';
import V3Button from '@components/button/src/components/Button.vue';

interface IState {
	syncedModelValue: boolean;
}

export default defineComponent({
	name: 'V3Drawer',
	components: {
		V3Backdrop,
		V3Button,
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
		/** 是否显示遮罩层 */
		showBackdrop: {
			type: Boolean,
			default: true,
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
			default: 250,
		},
		/** 点击确认按钮时的回调 */
		onConfirm: {
			type: Function as PropType<TYPES.IDrawerOnConfirm>,
			default: null,
		},
		/** 点击取消按钮时的回调（需手动调用 done 来关闭弹窗 */
		onCancel: {
			type: Function as PropType<TYPES.IDrawerOnCancel>,
			default: null,
		},
	},
	setup(props: TYPES.IDrawerProps, context) {
		const state: IState = reactive({
			syncedModelValue: false,
		});
		const app = ref(getCurrentInstance()).value;

		return {
			props,
			context,
			state,
			app,
		};
	},
});
</script>
<style lang="scss" scoped>
@import './Drawer.scss';
</style>
