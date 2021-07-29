<template>
	<v3-base-popper customClass="v3-popconfirm" v-bind="$attrs" theme="light">
		<template #default>
			<slot></slot>
		</template>

		<template #content>
			<div class="v3-popconfirm-content__text">
				<i
					v-if="props.showIcon"
					:class="{
						'v3-icon': true,
						'v3-popconfirm-text__icon': true,
						[`${props.icon}`]: true,
					}"
					:style="{
						color: props.iconColor,
					}"
				></i>

				<!-- slot="content" 优先级比 content props 高 -->
				<slot name="content" v-if="context.slots.content"></slot>
				<span v-else-if="!context.slots.content && props.content">{{
					props.content
				}}</span>
			</div>

			<div class="v3-popconfirm-content__action">
				<v3-button
					:type="props.cancelBtnType"
					:size="props.cancelBtnSize"
					:loading="props.cancelBtnLoading"
					@click="handleAction('cancel')"
					>{{ props.cancelBtnText }}</v3-button
				>
				<v3-button
					:type="props.confirmBtnType"
					:size="props.confirmBtnSize"
					:loading="props.confirmBtnLoading"
					@click="handleAction('confirm')"
					>{{ props.confirmBtnText }}</v3-button
				>
			</div>
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

		/** 气泡确认框的内容 */
		content: {
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
		/** 确定按钮的大小 */
		confirmBtnSize: {
			type: String as PropType<TYPES.IButtonSize>,
			default: 'small',
			validator(v: string) {
				return ['small', 'medium', 'large'].includes(v);
			},
		},
		/** 确定按钮的 loading 状态 */
		confirmBtnLoading: {
			type: Boolean,
			default: false,
		},
		/** 取消按钮的大小 */
		cancelBtnSize: {
			type: String as PropType<TYPES.IButtonSize>,
			default: 'medium',
			validator(v: string) {
				return ['small', 'medium', 'large'].includes(v);
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
		/** 取消按钮的 loading 状态 */
		cancelBtnLoading: {
			type: Boolean,
			default: false,
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

		function handleAction(type: string) {
			context.emit(type);
		}

		return {
			state,
			app,
			props,
			context,
			handleAction,
		};
	},
});
</script>
<style lang="scss" scoped>
@import './Popconfirm.scss';
</style>
