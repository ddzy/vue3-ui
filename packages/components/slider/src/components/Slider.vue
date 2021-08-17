<template>
	<div
		:class="{
			'v3-slider': true,
			'is-moving': state.isMoving,
		}"
	>
		<div class="v3-slider__prepend">
			<!-- 优先级：slot="prepend" > prependIcon > label -->
			<slot name="prepend" v-if="context.slots.prepend"></slot>
			<i
				:class="{
					'v3-icon': true,
					[`${props.prependIcon}`]: true,
				}"
				v-else-if="!context.slots.prepend && props.prependIcon"
			></i>
			<label
				v-else-if="!context.slots.prepend && !props.prependIcon && props.label"
			>
				{{ props.label }}
			</label>
		</div>
		<div class="v3-slider__track" ref="trackRef">
			<div class="v3-slider-track__inner">
				<div
					class="v3-slider-track__done"
					:style="{
						width: `${state.donePercent}%`,
					}"
				></div>
				<v3-tooltip
					v-model="state.showTooltip"
					trigger="manual"
					placement="top"
					:offset="[0, 20]"
					:getReferenceClientRect="() => thumbRef.value.getBoundingClientRect()"
					@mount="handleTooltipMount"
				>
					<div
						ref="thumbRef"
						class="v3-slider-track__thumb"
						:style="{
							left: `${state.donePercent}%`,
							transform: `translate(${computedThumbTransformX}%, -50%)`,
						}"
						@mousedown="handleThumbMouseDown"
						@mouseenter="handleThumbMouseEnter"
					></div>

					<template #content>
						{{ props.modelValue }}
					</template>
				</v3-tooltip>
				<template v-if="props.showMark">
					<div class="v3-slider-track__mark">
						<ul class="v3-slider-mark__list">
							<template v-for="v in state.marks">
								<li
									class="v3-slider-mark__item"
									v-if="!v.isMax && !v.isMin"
									:key="v.value"
									:style="{
										left: v.style.left,
									}"
								></li>
							</template>
						</ul>
					</div>
					<div class="v3-slider-track__label">
						<ul class="v3-slider-label__list">
							<li
								class="v3-slider-label__item"
								v-for="v in state.marks"
								:key="v.value"
								:style="v.style"
							>
								{{ v.label }}
							</li>
						</ul>
					</div>
				</template>
			</div>
		</div>
		<div class="v3-slider__append">
			<!-- 优先级：slot="append" > appendIcon > label -->
			<slot name="append" v-if="context.slots.append"></slot>
			<i
				:class="{
					'v3-icon': true,
					[`${props.appendIcon}`]: true,
				}"
				v-else-if="!context.slots.append && props.appendIcon"
			></i>
		</div>
	</div>
</template>
<script lang="ts">
import {
	computed,
	defineComponent,
	nextTick,
	onMounted,
	onUnmounted,
	PropType,
	reactive,
	ref,
	watch,
} from 'vue';
import * as TYPES from '@/public/types/slider';
import { usePosition } from '@common/hooks/index';
import V3Tooltip from '@components/tooltip/main';

interface ILocalMarkItem {
	value: number;
	label: string;
	style: {
		[key: string]: string;
	};
	isMax: boolean;
	isMin: boolean;
}
interface ITooltipInstance {
	setProps: (props: { [key: string]: any }) => void;
}
interface IState {
	isMoving: boolean;
	startX: number;
	donePercent: number;
	marks: ILocalMarkItem[];
	showTooltip: boolean;
	tooltipInstance: ITooltipInstance | null;
}

export default defineComponent({
	name: 'V3Slider',
	components: {
		V3Tooltip,
	},
	props: {
		/** 滑块的值 */
		modelValue: {
			type: [Number, Array] as PropType<TYPES.ISliderModelValue>,
			required: true,
		},
		/** 滑块最大值 */
		max: {
			type: Number,
			default: 100,
		},
		/** 滑块最小值 */
		min: {
			type: Number,
			default: 0,
		},
		/** 是否禁用滑块 */
		disabled: {
			type: Boolean,
			default: false,
		},
		/** 步数 */
		step: {
			type: Number,
			default: 1,
		},
		/** 是否显示间断点 */
		showMark: {
			type: Boolean,
			default: false,
		},
		/** 是否显示气泡框 */
		showTooltip: {
			type: Boolean,
			default: true,
		},
		/** 是否一直显示气泡框 */
		showTooltipAlways: {
			type: Boolean,
			default: false,
		},
		/** 格式化 tooltip 显示的值 */
		formatTooltip: {
			type: Function as PropType<TYPES.ISliderFormatTooltip>,
			default: null,
		},
		/** 是否为范围滑块 */
		range: {
			type: Boolean,
			default: false,
		},
		/** 是否为垂直方向 */
		vertical: {
			type: Boolean,
			default: false,
		},
		/** 滑块为垂直方向时的高度 */
		height: {
			type: String,
			default: '0px',
		},
		/** 滑块的 label */
		label: {
			type: String,
			default: '',
		},
		/** 前置图标 */
		prependIcon: {
			type: String,
			default: '',
		},
		/** 后置图标 */
		appendIcon: {
			type: String,
			default: '',
		},
		/** 自定义 tooltip 的类名 */
		customTooltipClass: {
			type: String,
			default: '',
		},
		/** 间断点列表 */
		marks: {
			type: Object as PropType<TYPES.ISliderMarkItem>,
			default: null,
		},
	},
	setup(props: TYPES.ISliderProps, context) {
		const state: IState = reactive({
			/** 是否处于拖动状态 */
			isMoving: false,
			/** 触发器的起始位置 */
			startX: 0,
			/** 已完成的宽度所占百分比 */
			donePercent: 0,
			/** 处理后的断点列表 */
			marks: [],
			/** tooltip 气泡的显隐状态 */
			showTooltip: false,
			/** tooltip 气泡的实例 */
			tooltipInstance: null,
		});
		const trackRef = ref(document.createElement('div'));
		const thumbRef = ref(document.createElement('div'));

		const { clientX } = usePosition({
			throttleTime: 0,
			callback() {
				if (state.isMoving) {
					const thumbRect = thumbRef.value.getBoundingClientRect();
					const trackRect = trackRef.value.getBoundingClientRect();
					// 滑块左端的偏移量
					const trackX = trackRect.x;
					// 滑块宽度
					const trackWidth = trackRect.width;
					// 触发器宽度
					const thumbWidth = thumbRect.width;
					// 滑块的已完成宽度
					const doneWidth = clientX.value - trackX;
					// 最新的 modelValue 绑定值
					let newModelValue = 0;

					// 更新 tooltip 的位置
					updateTooltipPosition();

					// 边界处理
					if (clientX.value >= trackX + trackWidth - thumbWidth) {
						// 超出最大宽度
						state.donePercent = 100;
						newModelValue = props.max;
					} else if (clientX.value <= trackX) {
						// 低于最小宽度
						state.donePercent = 0;
						newModelValue = props.min;
					} else {
						// 计算已完成的宽度所占滑块总宽度的百分比
						state.donePercent = (doneWidth / trackWidth) * 100;
						const donePercentToFloat = Number.parseFloat(
							state.donePercent.toFixed(1)
						);

						newModelValue = Math.floor((donePercentToFloat / 100) * props.max);
					}

					// 更新 modelValue 绑定值
					context.emit('update:modelValue', newModelValue);
				}
			},
		});

		// 当触发器到达最大值时，需要向右移动其自身的宽度的距离
		const computedThumbTransformX = computed(() => {
			return state.donePercent === 100 ? -100 : 0;
		});

		watch(
			() => props.marks,
			() => {
				// 组装断点列表
				const newMarks: typeof state.marks = [];

				for (const key in props.marks) {
					if (Object.prototype.hasOwnProperty.call(props.marks, key)) {
						const keyToNumber = Number.parseInt(key);
						const value = props.marks[keyToNumber];
						// 是否为最小值
						const isMin = keyToNumber === props.min;
						// 是否为最大值
						const isMax = keyToNumber === props.max;

						// 过滤掉小于最小值或者大于最大值的项
						if (keyToNumber < props.min || keyToNumber > props.max) {
							continue;
						}

						newMarks.push({
							value: keyToNumber,
							label: value.label,
							style: {
								...value.style,
								left: `${(keyToNumber / props.max) * 100}%`,
								transform: `translate(${isMin ? 0 : isMax ? -100 : -50}%, 0)`,
							},
							isMin,
							isMax,
						});
					}
				}

				state.marks = newMarks;
			},
			{ immediate: true, deep: true }
		);

		onMounted(() => {
			if (!Array.isArray(props.modelValue)) {
				// 组件挂载后，更新滑块触发器的位置
				state.donePercent = (props.modelValue / props.max) * 100;
			}

			document.addEventListener('mouseup', handleDocumentMouseUp, false);
		});
		onUnmounted(() => {
			document.removeEventListener('mouseup', handleDocumentMouseUp);
		});

		/**
		 * 更新 tooltip 的位置
		 */
		function updateTooltipPosition() {
			if (state.tooltipInstance) {
				state.tooltipInstance.setProps({
					getReferenceClientRect: () => thumbRef.value.getBoundingClientRect(),
				});
			}
		}

		function handleDocumentMouseUp() {
			// 直接在 document 上监听鼠标弹起事件，因为当过快拖动时，滑块触发器上并不能触发此事件
			state.isMoving = false;

			// 鼠标结束拖动滑块触发器时，隐藏 tooltip
			if (props.showTooltip && !props.showTooltipAlways) {
				state.showTooltip = false;
			}
		}

		function handleThumbMouseDown(e: MouseEvent) {
			state.isMoving = true;
			state.startX = e.pageX;

			// 鼠标点击滑块触发器时，显示 tooltip 并更新其位置
			if (props.showTooltip) {
				state.showTooltip = true;

				setTimeout(() => {
					updateTooltipPosition();
				}, 0);
			}
		}

		function handleThumbMouseEnter() {
			// 鼠标移入滑块触发器时，显示 tooltip 并更新其位置
			if (props.showTooltip) {
				state.showTooltip = true;

				setTimeout(() => {
					updateTooltipPosition();
				}, 0);
			}
		}

		function handleTooltipMount(instance: any) {
			state.tooltipInstance = instance;
		}

		return {
			state,
			props,
			context,
			trackRef,
			thumbRef,
			computedThumbTransformX,
			handleThumbMouseDown,
			handleThumbMouseEnter,
			handleTooltipMount,
		};
	},
});
</script>
<style lang="scss" scoped>
@import './Slider.scss';
</style>
