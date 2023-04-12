<template>
	<li
		v-show="state.isShow"
		:class="{
			[`v3-select-dropdown__item`]: true,
			[`is-disabled`]: props.disabled,
			[`is-selected`]: state.isSelected,
		}"
		@click="handleClick"
	>
		{{ props.label || props.value }}
	</li>
</template>
<script lang="ts">
import * as TYPES from '@typings/index';
import { SELECT_INSTANCE_PROVIDE } from '@common/constants/provide-symbol';
import * as UTILS from '@common/utils/index';
import {
	ComponentInternalInstance,
	defineComponent,
	getCurrentInstance,
	inject,
	onBeforeUnmount,
	onMounted,
	PropType,
	reactive,
	ref,
	toRef,
	watch,
} from 'vue';

interface IState {
	isSelected: boolean;
	isShow: boolean;
	injectedSelectInstance: any;
	hasInit: boolean;
}

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
			type: [String, Boolean, Number, Object] as PropType<
				TYPES.ISelectOptionValue
			>,
			required: true,
		},
		/** 是否禁用当前选项 */
		disabled: {
			type: Boolean,
			default: false,
		},
	},
	setup(props: TYPES.ISelectOptionProps) {
		const state: IState = reactive({
			/** 当前下拉选项是否选中 */
			isSelected: false,
			/** 当前下拉选项是否显示（由 V3Select 来控制） */
			isShow: true,
			/** V3Select 实例 */
			injectedSelectInstance: {},
			/** 是否已经初始化过默认值 */
			hasInit: false,
		});
		const app = ref(getCurrentInstance());
		const isSelect = checkIsSelect();

		if (isSelect) {
			const internalSelectInstance = inject(
				SELECT_INSTANCE_PROVIDE
			) as ComponentInternalInstance | null;
			state.injectedSelectInstance = internalSelectInstance
				? internalSelectInstance.proxy
				: {};
		}

		/**
		 * 实时监听下拉框的值变化，判断当前下拉选项是否选中
		 */
		watch(
			toRef(state.injectedSelectInstance, 'modelValue'),
			newValue => {
				// 如果值是对象类型，那么需要以【value-key】作比对，判断是否选中
				if (
					UTILS.isStrictObject(props.value) &&
					UTILS.isStrictObject(newValue)
				) {
					state.isSelected =
						props.value[
							state.injectedSelectInstance
								.valueKey as keyof TYPES.ISelectOptionValue
						] === newValue[state.injectedSelectInstance.valueKey];
				} else if (UTILS.isStrictArray(newValue)) {
					// 如果值是数组，则需要遍历比对
					state.isSelected = newValue.includes(props.value);
				} else {
					// 如果值是其它可用类型，那么直接比对即可
					state.isSelected = props.value === newValue;
				}

				// 设置默认选中的项
				if (
					state.isSelected &&
					state.injectedSelectInstance &&
					!state.hasInit
				) {
					state.injectedSelectInstance.handleInit(
						props.value,
						props.label || props.value
					);
				}

				state.hasInit = true;
			},
			{ immediate: true }
		);

		onMounted(() => {
			// 把当前实例追加到 V3Select 列表中
			state.injectedSelectInstance &&
				state.injectedSelectInstance.appendSelectOptionList(app.value);
		});

		onBeforeUnmount(() => {
			state.injectedSelectInstance &&
				state.injectedSelectInstance.subtractSelectOptionList(app.value);
		});

		/**
		 * 检查当前下拉选项的父级是否存在下拉框
		 */
		function checkIsSelect() {
			let parent = app.value!.parent;
			let result = false;

			while (parent) {
				if (parent.type.name === 'V3Select') {
					result = true;
					break;
				}
				parent = parent.parent;
			}

			return result;
		}

		function handleClick() {
			// 如果处于禁用状态，那么不做任何处理
			if (!props.disabled && state.injectedSelectInstance) {
				state.injectedSelectInstance.handleChange(
					props.value,
					props.label || props.value
				);
			}
		}

		return {
			app,
			state,
			props,
			handleClick,
		};
	},
});
</script>
