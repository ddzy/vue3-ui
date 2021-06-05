<template>
	<li
		:class="{
			[`v3-select-dropdown__item`]: true,
			[`is-disabled`]: props.disabled,
			[`is-selected`]: state.isSelected,
		}"
		@click="handleClick(false)"
	>
		{{ props.label || props.value }}
	</li>
</template>
<script lang="ts">
import * as TYPES from '@/public/types/select';
import {
	ComponentInternalInstance,
	defineComponent,
	getCurrentInstance,
	PropType,
	reactive,
	ref,
	toRef,
	watch,
} from 'vue';

export default defineComponent({
	name: 'V3SelectOption',
	props: {
		/** 显示的文本 */
		label: {
			type: String,
			default: '',
		},
		/** 对应的值 */
		value: {
			type: [String, Boolean, Number, Object] as PropType<TYPES.ISelectValue>,
			required: true,
		},
		/** 是否禁用当前选项 */
		disabled: {
			type: Boolean,
			default: false,
		},
	},
	setup(props) {
		const state = reactive({
			/** 当前下拉选项是否选中 */
			isSelected: false,
		});
		const app = ref(getCurrentInstance());
		// V3Select 实例
		const selectInstance = findSelectInstance();
		const selectPublicInstance: any = selectInstance
			? selectInstance.proxy
			: null;

		/**
		 * 实时监听下拉框的值变化，判断当前下拉选项是否选中
		 */
		watch(
			toRef(selectPublicInstance, 'modelValue'),
			newValue => {
				state.isSelected = props.value === newValue;

				// 设置默认选中的项
				if (state.isSelected) {
					handleClick(true);
				}
			},
			{ immediate: true }
		);

		/**
		 * 当前下拉选项的父组件并不是 V3Select 而是 V3SelectDropDown
		 */
		function findSelectInstance(): ComponentInternalInstance | null {
			let parent = (app.value as ComponentInternalInstance).parent;
			let result = null;

			while (parent) {
				if (parent.type.name === 'V3SelectDropDown') {
					result = parent.props.selectInstance as ComponentInternalInstance;
					break;
				}
				parent = parent.parent;
			}

			return result;
		}

		/**
		 * @param isInitial 是否初次改变值
		 */
		function handleClick(isInitial: boolean) {
			// 如果处于禁用状态或者非首次改变值，那么不做任何处理
			if (isInitial || !props.disabled) {
				if (selectPublicInstance) {
					selectPublicInstance.handleChange(
						props.value,
						props.label || props.value
					);
				}
			}
		}

		return {
			app,
			state,
			props,
			handleClick,
			selectPublicInstance,
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
