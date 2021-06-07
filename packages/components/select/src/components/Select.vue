<template>
	<div
		:class="{
			['v3-select']: true,
			['is-visible']: state.showDropdown,
			['is-disabled']: props.disabled,
		}"
	>
		<div ref="triggerRef" class="v3-select__trigger">
			<v3-input
				v-model="state.selectedLabel"
				:readonly="true"
				:placeholder="'请选择内容'"
			>
				<template #suffix>
					<i
						style="margin-right: 6px;"
						:class="['v3-icon', 'v3-icon-arrow-down']"
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
	onMounted,
	PropType,
	reactive,
	ref,
} from 'vue';
import { useTippy } from 'vue-tippy';
import SelectDropdown from './SelectDropDown.vue';

interface IState {
	showDropdown: boolean;
	tippy: {
		hide: () => void;
		show: () => void;
		unmount: () => void;
		mount: () => void;
	} | null;
	selectedLabel: string;
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
	},
	setup(props: TYPES.ISelectProps, context) {
		const triggerRef = ref(document.createElement('div'));
		const dropdownRef = ref(document.createElement('div'));
		const state: IState = reactive({
			/** 当前的下拉框是否显示 */
			showDropdown: false,
			/** tippy相关 */
			tippy: null,
			/** 当前选中的下拉选项的 label 值 */
			selectedLabel: '',
		});
		const app = ref(getCurrentInstance());

		onMounted(() => {
			state.tippy = useTippy(
				triggerRef,
				{
					content: createVNode(
						SelectDropdown,
						{
							width: triggerRef.value.getBoundingClientRect().width || 0,
							selectInstance: app.value,
						},
						context.slots.default
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

		function handleChange(value: TYPES.ISelectValue, label: string) {
			context.emit('update:modelValue', value);
			context.emit('change', value);

			// 更新输入框中显示的值
			state.selectedLabel = label;

			// 关闭下拉框
			if (state.tippy) {
				state.tippy.hide();
			}
		}

		return {
			app,
			state,
			props,
			triggerRef,
			dropdownRef,
			handleChange,
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
