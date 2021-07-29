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
