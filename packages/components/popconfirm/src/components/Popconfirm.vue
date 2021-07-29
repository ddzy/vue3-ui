<template>
	<v3-base-popper customClass="v3-popconfirm" v-bind="$attrs" theme="light">
		<template v-for="(_, v) of context.slots" v-slot:[v]="scope">
			<slot v-bind="scope" :name="v"></slot>
		</template>
	</v3-base-popper>
</template>
<script lang="ts">
import * as TYPES from '@/public/types/popconfirm';
import {
	defineComponent,
	getCurrentInstance,
	PropType,
	reactive,
	ref,
} from 'vue';
import V3BasePopper from '@components/base-popper/main';

interface IState {}

export default defineComponent({
	name: 'V3Popconfirm',
	components: {
		V3BasePopper,
	},
	props: {
		/** 不可配置主题 */
		theme: {
			type: String as PropType<TYPES.IPopconfirmTheme>,
			default: 'light',
		},
		/** 不可配置标题 */
		title: {
			type: String,
			default: '',
		},

		/** 确定按钮的文字 */
		confirmBtnText: {
			type: String,
			default: '确定',
		},
		/** 确定按钮的类型 */
		confirmBtnType: {
			type: String as PropType<TYPES.IButtonType>,
			default: 'primary',
			validator: (v: string) => {
				return [
					'primary',
					'success',
					'danger',
					'default',
					'warning',
					'info',
					'text',
				].includes(v);
			},
		},
		/** 取消按钮的文字 */
		cancelBtnText: {
			type: String,
			default: '取消',
		},
		/** 取消按钮的类型 */
		cancelBtnType: {
			type: String as PropType<TYPES.IButtonType>,
			default: 'text',
			validator: (v: string) => {
				return [
					'primary',
					'success',
					'danger',
					'default',
					'warning',
					'info',
					'text',
				].includes(v);
			},
		},
		/** 图标类名 */
		icon: {
			type: String,
			default: 'v3-icon-warning-fill',
		},
		/** 图标颜色 */
		iconColor: {
			type: String,
			default: 'rgba(237, 170, 83, 1)',
		},
		/** 是否显示图标 */
		showIcon: {
			type: Boolean,
			default: true,
		},
	},
	setup(props: TYPES.IPopconfirmProps, context) {
		const state: IState = reactive({});
		const app = ref(getCurrentInstance()).value;

		return {
			state,
			app,
			props,
			context,
		};
	},
});
</script>
<style lang="scss" scoped>
@import './Popconfirm.scss';
</style>
