<template>
	<Popper
		class="v3-base-popper"
		style="border: none; margin: 0"
		:class="{
			[`is-theme-${props.theme}`]: true,
		}"
		:arrow="props.arrow"
		:show="props.modelValue"
		:placement="props.placement"
		:content="props.content"
		:offsetDistance="`${props.offset}`"
		:disabled="props.disabled"
		:openDelay="props.delay[0]"
		:closeDelay="props.delay[1]"
		:interactive="true"
		:hover="props.trigger === 'hover'"
		:disableClickAway="false"
		@open:popper="handleOpen"
		@close:popper="handleClose"
	>
		<template #default>
			<div class="v3-base-popper__trigger">
				<slot name="default"></slot>
			</div>
		</template>

		<template #content>
			<div class="v3-base-popper__dropdown">
				<slot name="content"></slot>
			</div>
		</template>
	</Popper>
</template>
<script lang="ts">
import * as TYPES from '@/public/types/base-popper';
import {
	defineComponent,
	getCurrentInstance,
	PropType,
	reactive,
	ref,
} from 'vue';
import Popper from 'vue3-popper';

interface IState {}

export default defineComponent({
	name: 'V3BasePopper',
	components: {
		Popper,
	},
	props: {
		/** 自行控制 Popper 显隐 */
		modelValue: {
			type: Boolean,
			default: null,
		},
		/** 触发的方式 */
		trigger: {
			type: String as PropType<TYPES.IBasePopperTrigger>,
			default: 'hover',
			validator(v: string) {
				return ['click', 'hover'].includes(v);
			},
		},
		/** 弹出位置 */
		placement: {
			type: String as PropType<TYPES.IBasePopperPlacement>,
			default: 'auto',
			validator(v: string) {
				return [
					'top',
					'top-start',
					'top-end',
					'right',
					'right-start',
					'right-end',
					'bottom',
					'bottom-start',
					'bottom-end',
					'left',
					'left-start',
					'left-end',
					'auto',
					'auto-start',
					'auto-end',
				].includes(v);
			},
		},
		/** 是否禁用 popper */
		disabled: {
			type: Boolean,
			default: false,
		},
		/** 箭头的显隐状态 */
		arrow: {
			type: Boolean,
			default: true,
		},
		/** 显示/隐藏的延迟 */
		delay: {
			type: Array as PropType<TYPES.IBasePopperDelay>,
			default: [0, 0],
			validator(v: number[]) {
				return v.length === 2;
			},
		},
		/** popper 内容，也可以通过 slot="content" 传入 */
		content: {
			type: String,
			default: '',
		},
		/** 主题色（黑/白） */
		theme: {
			type: String as PropType<TYPES.IBasePopperTheme>,
			default: 'dark',
			validator(v: string) {
				return ['dark', 'light'].includes(v);
			},
		},
		/** 距离触发器的距离 */
		offset: {
			type: Number,
			default: 12,
		},
	},
	setup(props: TYPES.IBasePopperProps, context) {
		const state: IState = reactive({});
		const app = ref(getCurrentInstance()).value;

		function handleOpen() {
			context.emit('open');
		}
		function handleClose() {
			context.emit('close');
		}

		return {
			state,
			app,
			props,
			context,
			handleOpen,
			handleClose,
		};
	},
});
</script>
<style lang="scss" scoped>
@import './BasePopper.scss';
</style>
