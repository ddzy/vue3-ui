<template>
	<div
		:class="{
			['v3-select']: true,
			['is-visible']: state.showDropdown,
			['is-disabled']: props.disabled,
			['is-clearable']: state.showClear,
			['is-no-match-data']: state.isNoMatchData,
			['is-no-data']: !computedChildrenLength,
		}"
		@mouseenter="handleMouseEnter"
		@mouseleave="handleMouseLeave"
	>
		<tippy
			trigger="click"
			theme="light-border"
			animation="v3-select-slide-fade"
			placement="bottom"
			:zIndex="state.nextZIndex"
			:arrow="false"
			:interactive="true"
			:allowHTML="true"
			:delay="0"
			:offset="[0, 5]"
			:onShow="handleShow"
			:onHide="handleHide"
			:onMount="handleMount"
		>
			<div class="v3-select__trigger">
				<v3-input
					v-model="state.inputValue"
					:readonly="!props.filterable"
					:placeholder="state.placeholder"
					@input="handleInput"
					@focus="handleFocus"
					@blur="handleBlur"
					@compositionstart="handleCompositionStart"
					@compositionend="handleCompositionEnd"
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
			<template #content>
				<div class="v3-select__dropdown">
					<ul
						:class="{
							[`v3-select-dropdown__list`]: true,
						}"
					>
						<slot v-if="computedChildrenLength"></slot>
						<template v-else>
							<!-- 未匹配到数据（优先级比【无数据】高） -->
							<p v-if="state.isNoMatchData">{{ props.noMatchText }}</p>
							<!-- 无数据 -->
							<p v-else>{{ props.noDataText }}</p>
						</template>
					</ul>
				</div>
			</template>
		</tippy>
	</div>
</template>
<script lang="ts">
import * as TYPES from '@/public/types/select';
import VARIABLE from '@common/constants/internal-variable';
import { SELECT_INSTANCE_PROVIDE } from '@common/constants/provide-symbol';
import { useDebounce } from '@common/hooks/index';
import 'tippy.js/themes/light-border.css';
import {
	ComponentInternalInstance,
	computed,
	defineComponent,
	getCurrentInstance,
	PropType,
	provide,
	reactive,
	ref,
	toRef,
	watch,
} from 'vue';
import { Tippy, TippyInstance } from 'vue-tippy';

type ILocalTippyInstance =
	| (TippyInstance & {
			hide: () => void;
			show: () => void;
			unmount: () => void;
			mount: () => void;
	  })
	| null;

interface IState {
	showDropdown: boolean;
	tippy: ILocalTippyInstance;
	inputValue: string;
	selectedLabel: string;
	showClear: boolean;
	selectOptionList: any[];
	initialPlaceholder: string;
	placeholder: string;
	hasInit: boolean;
	nextZIndex: number;
	isNoMatchData: boolean;
	isCompositionStart: boolean;
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
		remotePlaceholder: {
			type: String,
			default: '请输入关键字',
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
			default: null,
		},
		/** 自定义远程搜索的方法 */
		remoteMethod: {
			type: Function as PropType<TYPES.ISelectRemoteMethod>,
			default: null,
		},
	},
	components: {
		Tippy,
	},
	setup(props: TYPES.ISelectProps, context) {
		const state: IState = reactive({
			/** 当前的下拉框是否显示 */
			showDropdown: false,
			/** tippy 实例 */
			tippy: null,
			/** 当前下拉输入框的值 */
			inputValue: '',
			/** 当前选中的下拉选项的 label 值 */
			selectedLabel: '',
			/** 当前的下拉框是否处于清空状态，即是否显示清空按钮 */
			showClear: false,
			/** 下拉选项（SelectOption）实例列表 */
			selectOptionList: [],
			initialPlaceholder: props.remote
				? props.remotePlaceholder
				: props.placeholder,
			placeholder: props.remote ? props.remotePlaceholder : props.placeholder,
			/** 是否已经初始化过默认值 */
			hasInit: false,
			/** 下拉菜单的 z-index（统一管理） */
			nextZIndex: VARIABLE.getNextZIndex(),
			/** 是否为未搜索到本地数据的状态 */
			isNoMatchData: false,
			/** 是否为输入开始阶段 */
			isCompositionStart: false,
		});
		const app = ref(getCurrentInstance()).value as ComponentInternalInstance;

		provide(SELECT_INSTANCE_PROVIDE, app);

		/**
		 * 计算 slot 的长度（即判断内容是否为空）
		 */
		const computedChildrenLength = computed<number>(() => {
			const defaultSlot: Function | undefined = context.slots.default;

			if (typeof defaultSlot !== 'function') {
				return 0;
			}

			const defaultChildren = defaultSlot()[0].children;

			return defaultChildren.length;
		});

		watch(toRef(state, 'showDropdown'), () => {
			context.emit('visible', state.showDropdown);
		});

		function handleShow() {
			// 如果当前下拉框为禁用状态，那么下拉菜单不需要显示
			const showDropdown = !props.disabled;
			state.showDropdown = showDropdown;

			if (!showDropdown) {
				return showDropdown;
			}
		}

		function handleHide() {
			state.showDropdown = false;
		}

		function handleMount(instance: ILocalTippyInstance) {
			state.tippy = instance;
		}

		/**
		 * 把 V3SelectOption 实例追加到列表，统一管理
		 */
		function appendSelectOptionList(instance: any) {
			state.selectOptionList = state.selectOptionList.concat(instance);
		}

		/**
		 * 把 V3SelectOption 实例从列表中移除
		 */
		function subtractSelectOptionList(instance: any) {
			state.selectOptionList = state.selectOptionList.filter(
				v => v !== instance
			);
		}

		function handleChange(value: TYPES.ISelectValue, label: string) {
			// 更新输入框中显示的值
			state.inputValue = label;
			state.selectedLabel = label;
			state.placeholder = label;

			// 关闭下拉框
			if (state.tippy) {
				state.tippy.hide();
			}

			context.emit('update:modelValue', value);
			context.emit('change', value);
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
			state.isNoMatchData = false;

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

			// 输入中文的过程中，不需要触发 input 事件，只在最终选取字符时才继续做处理
			if (state.isCompositionStart) {
				return;
			}

			// 如果是远程搜索，就为远程搜索模式；反之，则判断是否为过滤模式
			if (props.remote) {
				if (typeof props.remoteMethod === 'function') {
					props.remoteMethod(target.value);
				}
			} else {
				// 如果有自定义的过滤方法，就用自定义的；反之，直接用内置的
				if (typeof props.filterMethod === 'function') {
					props.filterMethod(target.value);

					// 如果本地搜索的时候，结果为空，那么就显示未匹配的文本
					state.isNoMatchData = !computedChildrenLength.value;
					state.selectOptionList.forEach(v => {
						v.proxy.state.isShow = true;
					});
				} else {
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
					state.isNoMatchData = isEmpty;
				}
			}

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

				// 如果开启了远程搜索，那么需要触发一次搜索
				if (props.remote) {
					props.remoteMethod(state.selectedLabel);
				}
			}
		}

		function handleBlur() {
			// 输入框失去焦点时，如果当前处于 filterable 状态，那么需要重置【未匹配到数据】的状态
			if (props.filterable) {
				state.isNoMatchData = false;
			}
			// 失去焦点时，需要把输入框的值设为已选中的值
			state.inputValue = state.selectedLabel;
		}

		function handleCompositionStart() {
			state.isCompositionStart = true;
		}

		function handleCompositionEnd() {
			state.isCompositionStart = false;
		}

		return {
			app,
			state,
			props,
			computedChildrenLength,
			appendSelectOptionList,
			subtractSelectOptionList,
			handleChange,
			handleMouseEnter,
			handleMouseLeave,
			handleClear,
			handleInit,
			handleInput: useDebounce(handleInput, 200),
			handleFocus,
			handleBlur,
			handleShow,
			handleHide,
			handleMount,
			handleCompositionStart,
			handleCompositionEnd,
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
