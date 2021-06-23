<template>
	<ul
		:class="{
			[`v3-select-dropdown__list`]: true,
			'is-no-match-data': state.isNoMatchData,
		}"
	>
		<slot v-if="!state.isNoMatchData"></slot>
		<p v-else>{{ selectInstance.proxy.noMatchText }}</p>
	</ul>
</template>
<script lang="ts">
import {
	ComponentInternalInstance,
	defineComponent,
	getCurrentInstance,
	onMounted,
	reactive,
	ref,
} from 'vue';

interface IState {
	isNoMatchData: boolean;
}

export default defineComponent({
	name: 'V3SelectDropDown',
	props: {
		/** V3Select 的实例 */
		selectInstance: {
			type: Object,
			required: true,
		},
	},
	setup(props) {
		const state: IState = reactive({
			/** 是否为未匹配到数据的状态（由父组件-V3Select控制 */
			isNoMatchData: false,
		});
		const app = ref(getCurrentInstance());

		onMounted(() => {
			const selectInternalInstance = props.selectInstance as ComponentInternalInstance;
			const selectPublicInstance: any = selectInternalInstance
				? selectInternalInstance.proxy
				: null;

			// 把当前实例存储到 V3Select 中
			if (selectPublicInstance) {
				selectPublicInstance.setSelectDropDownInstance(app.value);
			}
		});

		return {
			app,
			state,
			props,
		};
	},
});
</script>
<style lang="scss">
@import '@common/styles/global-animation.scss';
</style>
<style lang="scss" scoped>
@import './Select.scss';
</style>
