<template>
	<div
		:class="{
			['v3-select']: true,
			['is-visible']: state.showDropdown,
			['is-disabled']: props.disabled,
			['is-clearable']: state.showClear,
		}"
		@mouseenter="handleMouseEnter"
		@mouseleave="handleMouseLeave"
	>
		<div ref="triggerRef" class="v3-select__trigger">
			<v3-input
				v-model="state.inputValue"
				:readonly="!props.filterable"
				:placeholder="state.placeholder"
				@input="handleInput"
				@focus="handleFocus"
				@blur="handleBlur"
			>
				<template #suffix>
					<i
						style="margin-right: 6px;"
						v-if="!state.showClear"
						:class="{
							'v3-icon': true,
							'v3-icon-arrow-down': true,
						}"
					></i>
					<i
						style="margin-right: 6px; cursor: pointer"
						v-else
						:class="{
							'v3-icon': true,
							'v3-icon-reeor': true,
						}"
						@click.stop="handleClear"
					></i>
				</template>
			</v3-input>
		</div>
		<div ref="dropdownRef" class="v3-select__dropdown"></div>
	</div>
</template>
<script lang="ts">
import * as TYPES from '@/public/types/select';
import VARIABLE from '@common/constants/internal-variable';
import 'tippy.js/themes/light-border.css';
import {
	createVNode,
	defineComponent,
	getCurrentInstance,
	nextTick,
	onMounted,
	PropType,
	reactive,
	ref,
	toRef,
	watch,
} from 'vue';
import { useTippy } from 'vue-tippy';
import SelectDropdown from './SelectDropDown.vue';
import SelectOption from './SelectOption.vue';
import { useDebounce } from '@common/hooks/index';

interface IState {
	showDropdown: boolean;
	tippy: {
		hide: () => void;
		show: () => void;
		unmount: () => void;
		mount: () => void;
	} | null;
	inputValue: string;
	selectedLabel: string;
	showClear: boolean;
	selectOptionList: any[];
	initialPlaceholder: string;
	placeholder: string;
	selectDropDownInstance: any;
	hasInit: boolean;
}

export default defineComponent({
	name: 'V3Select',
	props: {
		/** 下拉框的值 */
		modelValue: {
			type: [String, Boolean, Number, Object] as PropType<TYPES.ISelectValue>,
			required: true,
		},
		/** 是否开启多选 */
		multiple: {
			type: Boolean,
			default: false,
		},
		/** 是否禁用下拉框 */
		disabled: {
			type: Boolean,
			default: false,
		},
		/** 当 modelValue 的值为对象类型，该值为 modelValue 的唯一 key */
		valueKey: {
			type: String,
			default: '',
		},
		/** 是否可清空所选值 */
		clearable: {
			type: Boolean,
			default: false,
		},
		/** 在多选状态下，选中多个值，合并为一个展示，可节省空间 */
		collapseTags: {
			type: Boolean,
			default: false,
		},
		/** 多选状态下，限制选择的数量 */
		multipleLimit: {
			type: Number,
			default: -1,
		},
		placeholder: {
			type: String,
			default: '请选择内容',
		},
		/** 是否启用本地模糊搜索 */
		filterable: {
			type: Boolean,
			default: false,
		},
		/** 在 filterable 状态下，是否创建新的条目 */
		allowCreate: {
			type: Boolean,
			default: false,
		},
		/** 是否启用远程搜索 */
		remote: {
			type: Boolean,
			default: false,
		},
		/** 下拉框的加载状态 */
		loading: {
			type: Boolean,
			default: false,
		},
		/** 加载时显示的文本 */
		loadingText: {
			type: String,
			default: '获取数据中',
		},
		/** 在 filterable 状态下，没有匹配的数据时显示的文本 */
		noMatchText: {
			type: String,
			default: '无匹配数据',
		},
		/** 在 remote 或选项为空的状态下显示的文本 */
		noDataText: {
			type: String,
			default: '无数据',
		},
		/** 自定义本地过滤的方法 */
		filterMethod: {
			type: Function as PropType<TYPES.ISelectFilterMethod>,
			default() {
				return () => {};
			},
		},
		/** 自定义远程搜索的方法 */
		remoteMethod: {
			type: Function as PropType<TYPES.ISelectRemoteMethod>,
			default() {
				return () => {};
			},
		},
	},
	components: {
		SelectDropdown,
		SelectOption,
	},
	setup(props: TYPES.ISelectProps, context) {
		const triggerRef = ref(document.createElement('div'));
		const dropdownRef = ref(document.createElement('div'));
		const state: IState = reactive({
			/** 当前的下拉框是否显示 */
			showDropdown: false,
			/** tippy相关 */
			tippy: null,
			/** 当前下拉输入框的值 */
			inputValue: '',
			/** 当前选中的下拉选项的 label 值 */
			selectedLabel: '',
			/** 当前的下拉框是否处于清空状态，即是否显示清空按钮 */
			showClear: false,
			/** 下拉选项（SelectOption）实例列表 */
			selectOptionList: [],
			/** 下拉菜单（SelectDropDown）实例 */
			selectDropDownInstance: null,
			initialPlaceholder: '',
			placeholder: '',
			/** 是否已经初始化过默认值 */
			hasInit: false,
		});
		const app = ref(getCurrentInstance());

		watch(
			toRef(props, 'placeholder'),
			() => {
				state.initialPlaceholder = state.placeholder = props.placeholder;
			},
			{ immediate: true }
		);

		onMounted(() => {
			// 根据是否有 slot，来判断是否显示空状态
			const defaultSlot = context.slots.default ? context.slots.default() : [];
			const hasSelectOption = defaultSlot.length
				? (defaultSlot[0] as any).children.length
				: 0;

			state.tippy = useTippy(
				triggerRef,
				{
					content: createVNode(
						SelectDropdown,
						{
							selectInstance: app.value,
						},
						!!hasSelectOption
							? context.slots.default
							: [
									createVNode(
										'p',
										{
											class: 'v3-select-dropdown__empty',
										},
										props.noDataText
									),
							  ]
					),
					animation: 'v3-select-slide-fade',
					theme: 'light-border',
					trigger: 'click',
					arrow: true,
					interactive: true,
					allowHTML: true,
					delay: 0,
					zIndex: VARIABLE.getNextZIndex(),
					appendTo: dropdownRef.value,
					placement: 'bottom',
					offset: [0, 10],
					onShow() {
						// 如果当前下拉框为禁用状态，那么下拉菜单不需要显示
						const showDropdown = !props.disabled;
						state.showDropdown = showDropdown;

						if (!showDropdown) {
							return showDropdown;
						}
					},
					onHide() {
						state.showDropdown = false;
					},
				},
				{ mount: true }
			);
		});

		/**
		 * 把 V3SelectOption 实例追加到列表，统一管理
		 */
		function appendSelectOptionList(instance: any) {
			state.selectOptionList = state.selectOptionList.concat(instance);
		}

		/**
		 * 把 V3SelectDropDown 实例保存至本地
		 */
		function setSelectDropDownInstance(instance: any) {
			state.selectDropDownInstance = instance;
		}

		function handleChange(value: TYPES.ISelectValue, label: string) {
			context.emit('update:modelValue', value);
			context.emit('change', value);

			// 更新输入框中显示的值
			state.inputValue = label;
			state.selectedLabel = label;

			// 关闭下拉框
			if (state.tippy) {
				state.tippy.hide();
			}
		}

		function handleMouseEnter() {
			// 鼠标移入下拉框，如果可清空并且已选中值，则显示清空按钮
			if (props.clearable && (state.inputValue || state.selectedLabel)) {
				state.showClear = true;
			}
		}

		function handleMouseLeave() {
			// 鼠标移出，隐藏清空按钮
			state.showClear = false;
		}

		function handleClear() {
			// 清空的时候，关闭下拉框
			if (state.tippy) {
				state.tippy.hide();
			}

			state.inputValue = '';
			state.selectedLabel = '';
			state.showClear = false;
			state.placeholder = state.initialPlaceholder;
			state.selectDropDownInstance.proxy.state.isNoMatchData = false;

			context.emit('update:modelValue', '');
			context.emit('change', '');
		}

		/**
		 * 设置默认选中的值，SelectOption 直接调用
		 */
		function handleInit(value: TYPES.ISelectValue, label: string) {
			if (state.hasInit) {
				// 保证下拉组件的默认值只初始化一次
				return;
			}
			state.selectedLabel = label;
			state.inputValue = label;
			state.hasInit = true;
		}

		function handleInput(e: Event) {
			const target = e.target as HTMLInputElement;

			// 没有输入值时，需要显示全部的下拉选项
			state.selectOptionList.forEach(v => {
				v.proxy.state.isShow = target.value
					? v.proxy.label.includes(target.value)
					: true;
			});

			// 如果本地搜索的时候，结果为空，那么就显示未匹配的文本
			const isEmpty = state.selectOptionList.every(v => {
				return !v.proxy.state.isShow;
			});
			state.selectDropDownInstance.proxy.state.isNoMatchData = isEmpty;

			// 输入的时候，如果有输入值，那么就显示清空按钮
			state.showClear = !!target.value;
		}

		function handleFocus() {
			// 输入框聚焦时，如果当前处于 filterable 状态，那么就把已选中的值作为 placeholder
			if (props.filterable) {
				state.inputValue = '';
				state.placeholder = state.selectedLabel || state.initialPlaceholder;
				state.selectOptionList.forEach(v => {
					v.proxy.state.isShow = true;
				});
			}
		}

		function handleBlur() {
			// 输入框失去焦点时，如果当前处于 filterable 状态，那么把已选中的值作为输入框的值
			if (props.filterable) {
				state.inputValue = state.selectedLabel;
				state.selectDropDownInstance.proxy.state.isNoMatchData = false;
			}
		}

		return {
			app,
			state,
			props,
			triggerRef,
			dropdownRef,
			appendSelectOptionList,
			setSelectDropDownInstance,
			handleChange,
			handleMouseEnter,
			handleMouseLeave,
			handleClear,
			handleInit,
			handleInput: useDebounce(handleInput, 200),
			handleFocus,
			handleBlur,
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
