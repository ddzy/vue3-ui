<template>
	<div
		:class="{
			'v3-checkbox': true,
			'is-disabled': state.defaultProps.disabled,
			'is-bordered': props.border,
			'is-checked': !!state.checkboxValue,
			'is-indeterminated': props.indeterminate,
			[`is-size--${props.size}`]: props.size,
		}"
	>
		<label
			class="v3-checkbox__label-wrapper"
			:for="`v3-checkbox__input--${app.uid}`"
		>
			<input
				v-model="state.checkboxValue"
				ref="checkboxRef"
				type="checkbox"
				class="v3-checkbox__input"
				:value="props.label"
				:id="`v3-checkbox__input--${app.uid}`"
				:disabled="state.defaultProps.disabled"
				@change="handleChange"
			/>

			<div
				class="v3-checkbox__select"
				:class="{
					'is-custom-icon': computedIsCustomIcon,
				}"
			>
				<template v-if="computedIsCustomIcon">
					<!--
          有三种状态的图标
          其中，如果状态为【indeterminate】，则图标不能发生变化
          反之，则切换【选中】or【不选中】的图标
        	-->
					<V3Icon
						v-if="props.indeterminate"
						:type="props.indeterminatedIcon"
						:strokeWidth="2"
						class="is-indeterminated"
					/>
					<V3Icon
						v-else-if="!props.indeterminate && state.checkboxValue"
						:type="props.selectedIcon"
						:strokeWidth="2"
					/>
					<V3Icon
						v-else-if="!props.indeterminate && !state.checkboxValue"
						:type="props.defaultIcon"
						:strokeWidth="2"
					/>
				</template>
				<!-- viewBox 旨在让子元素在 40x40 范围内定义大小，方便自适应 -->
				<svg v-else width="1em" height="1em" viewBox="0 0 40 40">
					<rect x="0" y="0" width="100%" height="100%" rx="4" />
					<!-- 不确定状态的线条 -->
					<polyline
						v-if="props.indeterminate"
						:class="{
							'is-indeterminated': true,
						}"
						points="10,20 30,20"
						stroke="#fff"
						stroke-width="4"
						fill="none"
					></polyline>
					<!-- 选中状态的线条 -->
					<polyline
						v-else
						points="8,18 16,27 32,9"
						stroke="#fff"
						stroke-width="4"
						fill="none"
					></polyline>
				</svg>
			</div>
			<div class="v3-checkbox__label">
				<slot v-if="app.slots.default"></slot>
				<span v-else>{{
					isCheckboxGroup ? props.modelValue : props.label
				}}</span>
			</div>
		</label>
	</div>
</template>
<script lang="ts">
import {
	defineComponent,
	getCurrentInstance,
	PropType,
	reactive,
	ref,
	toRef,
	watch,
	inject,
	onMounted,
	ComponentOptionsWithObjectProps,
	computed,
} from 'vue';
import * as TYPES from '@typings/index';
import {
	CHECKBOX_GROUP_CHANGE_FUNC_PROVIDE,
	CHECKBOX_GROUP_INSTANCE_PROVIDE,
	CHECKBOX_GROUP_ADD_INSTANCE_FUNC_PROVIDE,
} from '@common/constants/provide-symbol';
import V3Icon from '@components/icon/main';

export default defineComponent({
	name: 'V3Checkbox',
	components: {
		V3Icon,
	},
	props: {
		/** 是否带有边框 */
		border: {
			type: Boolean,
			default: false,
		},
		/** 禁用状态 */
		disabled: {
			type: Boolean,
			default: false,
		},
		/** 复选框的值 */
		label: {
			type: [String, Number, Boolean] as PropType<TYPES.ICheckboxLabel>,
			default: '',
		},
		/** 复选框是否为不确定状态 */
		indeterminate: {
			type: Boolean,
			default: false,
		},
		/** 选中时的复选框图标 */
		selectedIcon: {
			type: String,
			default: '',
		},
		/** 不确定时的复选框图标 */
		indeterminatedIcon: {
			type: String,
			default: '',
		},
		/** 未选中状态下的复选框图标 */
		defaultIcon: {
			type: String,
			default: '',
		},
		/** 复选框的尺寸 */
		size: {
			type: String as PropType<TYPES.ICheckboxSize>,
			default: 'medium',
			validator(v: string) {
				return ['small', 'medium', 'large'].includes(v);
			},
		},
		modelValue: {
			type: Boolean,
			default: false,
		},
	},
	emits: ['change', 'update:modelValue'],
	setup(props: Required<TYPES.ICheckboxProps>, context) {
		const state = reactive({
			defaultProps: {
				disabled: false,
			},
			/**
			 * 复选框的值
			 */
			checkboxValue: false,
			/** CheckboxGroup 的 change 事件 */
			injectedOnCheckboxGroupChange: null,
			/** CheckboxGroup 实例 */
			injectedCheckboxGroupInstance: null,
			/** CheckboxGroup 的追加当前实例方法 */
			injectedCheckboxGroupAppendInstance: null,
		});
		const app = ref(getCurrentInstance()!);
		const checkboxRef = ref(document.createElement('input'));
		const isCheckboxGroup = checkIsCheckboxGroup();

		if (isCheckboxGroup) {
			state.injectedOnCheckboxGroupChange = inject(
				CHECKBOX_GROUP_CHANGE_FUNC_PROVIDE,
			)!;
			state.injectedCheckboxGroupInstance = inject(
				CHECKBOX_GROUP_INSTANCE_PROVIDE,
			)!;
			state.injectedCheckboxGroupAppendInstance = inject(
				CHECKBOX_GROUP_ADD_INSTANCE_FUNC_PROVIDE,
			)!;
		}

		const computedIsCustomIcon = computed(() => {
			// defaultIcon、selectedIcon、indeterminatedIcon 三种状态的图标必须同时传入，才会使用图标
			return (
				props.defaultIcon && props.selectedIcon && props.indeterminatedIcon
			);
		});

		watch(
			props,
			() => {
				state.defaultProps.disabled = props.disabled;
			},
			{ immediate: true },
		);

		watch(
			toRef(
				isCheckboxGroup
					? (
							state.injectedCheckboxGroupInstance! as ComponentOptionsWithObjectProps
					  ).props
					: props,
				'modelValue',
			),
			(newValue) => {
				// 判断选中状态
				if (isCheckboxGroup) {
					state.checkboxValue = (newValue as TYPES.ICheckboxLabel[]).includes(
						props.label!,
					);
				} else {
					state.checkboxValue = newValue as unknown as boolean;
				}
			},
			{ immediate: true },
		);

		onMounted(() => {
			if (isCheckboxGroup) {
				(state.injectedCheckboxGroupAppendInstance as unknown as Function)(
					app.value,
				);
			}
		});

		/**
		 * 检查当前单选器的父级是否存在单选器组
		 */
		function checkIsCheckboxGroup() {
			let parent = app.value!.parent;
			let result = false;

			while (parent) {
				if (parent.type.name === 'V3CheckboxGroup') {
					result = true;
					break;
				}
				parent = parent.parent;
			}

			return result;
		}

		function handleChange(e: Event) {
			if (isCheckboxGroup) {
				(state.injectedOnCheckboxGroupChange as unknown as Function)(
					state.checkboxValue,
					props.label,
					e,
				);
			} else {
				context.emit('update:modelValue', state.checkboxValue);
				context.emit('change', state.checkboxValue, e);
			}
		}

		return {
			state,
			props,
			app,
			handleChange,
			checkboxRef,
			isCheckboxGroup,
			computedIsCustomIcon,
		};
	},
	methods: {},
});
</script>
<style lang="scss">
@import './Checkbox.scss';
</style>
