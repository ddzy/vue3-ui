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
		<div class="v3-slider__track" @click="handleTrackClick">
			<div ref="trackInnerRef" class="v3-slider-track__inner">
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
					@mount="handleTooltipMount"
					@clickOutside="handleTooltipClickOutside"
				>
					<div
						ref="thumbRef"
						class="v3-slider-track__thumb"
						:style="{
							left: `${state.donePercent}%`,
						}"
						@mousedown="handleThumbMouseDown"
						@mouseenter="handleThumbMouseEnter"
						@mouseleave="handleThumbMouseLeave"
					></div>

					<template #content>
						{{ computedModelValue }}
					</template>
				</v3-tooltip>
				<div v-if="props.showStop" class="v3-slider-track__mark">
					<ul class="v3-slider-mark__list">
						<template v-for="(v, i) in state.stops" :key="v.value">
							<li
								v-if="![0, state.stops.length - 1].includes(i)"
								class="v3-slider-mark__item"
								:style="{
									left: `${v.style.left}%`,
								}"
							></li>
						</template>
					</ul>
				</div>
				<div v-if="state.marks.length" class="v3-slider-track__label">
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
import * as TYPES from '@/public/types/slider';
import { usePosition } from '@common/hooks/index';
import V3Tooltip from '@components/tooltip/main';
import {
	computed,
	defineComponent,
	onMounted,
	onUnmounted,
	PropType,
	reactive,
	ref,
	watch,
} from 'vue';
import Decimal from 'decimal.js';

interface ILocalMarkItem {
	value: number;
	label: string;
	style: {
		[key: string]: string;
	};
}
interface ILocalStopItem {
	value: number;
	style: {
		[key: string]: string | number;
	};
	// 断点的 X 轴距离
	x: number;
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
	stops: ILocalStopItem[];
	halfOfStepX: number;
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
		showStop: {
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
			/** 处理后的断点 label 列表 */
			marks: [],
			/** 处理后的断点列表 */
			stops: [],
			/** tooltip 气泡的显隐状态 */
			showTooltip: false,
			/** tooltip 气泡的实例 */
			tooltipInstance: null,
			/** 半个步长所对应的宽度 */
			halfOfStepX: 0,
		});
		const trackInnerRef = ref(document.createElement('div'));
		const thumbRef = ref(document.createElement('div'));

		const { clientX } = usePosition({
			throttleTime: 0,
			callback() {
				if (state.isMoving) {
					// 更新已完成的进度
					updateDonePercent(clientX.value);
					// 更新 tooltip 的位置
					updateTooltipPosition();
				}
			},
		});

		const computedModelValue = computed(() => {
			if (typeof props.formatTooltip === 'function') {
				return props.formatTooltip(props.modelValue);
			}
			return props.modelValue;
		});

		watch(
			() => props.marks,
			() => {
				// 组装断点 label 列表
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
				state.donePercent = new Decimal(
					new Decimal(props.modelValue)
						.div(props.max)
						.mul(100)
						.toFixed(2)
				).toNumber();
			}

			if (props.showTooltip && props.showTooltipAlways) {
				state.showTooltip = true;

				setTimeout(() => {
					updateTooltipPosition();
				}, 0);
			}

			updateStops();

			document.addEventListener('mouseup', handleDocumentMouseUp, false);
		});
		onUnmounted(() => {
			document.removeEventListener('mouseup', handleDocumentMouseUp);
		});

		function updateStops() {
			const newStops: typeof state.stops = [];
			const decimalStep = new Decimal(props.step);
			const decimalMax = new Decimal(props.max);
			// 总步数
			const stepCount = decimalMax
				.div(decimalStep)
				.floor()
				.toNumber();
			// 每步所占整个滑动条的百分比
			const stepPercent = decimalStep
				.div(decimalMax)
				.mul(100)
				.toFixed(2);

			const trackInnerEl = trackInnerRef.value as HTMLElement;
			const trackInnerRect = trackInnerEl.getBoundingClientRect();

			state.halfOfStepX = new Decimal(trackInnerRect.width)
				.mul(
					new Decimal(stepPercent)
						.mul(1)
						.div(100)
						.div(2)
						.toNumber()
				)
				.round()
				.toNumber();

			for (let i = 0; i <= stepCount; i++) {
				newStops.push({
					value: props.step * i,
					style: {
						left: new Decimal(stepPercent).mul(i).toNumber(),
					},
					x: new Decimal(trackInnerRect.left)
						.plus(
							new Decimal(trackInnerRect.width).mul(
								new Decimal(stepPercent)
									.mul(i)
									.div(100)
									.toNumber()
							)
						)
						.round()
						.toNumber(),
				});
			}

			// 如果有余数，则表明有剩余的步数，那么就需要追加末尾项
			if (!decimalMax.div(decimalStep).isInteger()) {
				newStops.push({
					value: decimalMax.toNumber(),
					style: {
						left: 100,
					},
					x: new Decimal(trackInnerRect.left)
						.plus(trackInnerRect.width)
						.round()
						.toNumber(),
				});
			}

			state.stops = newStops;
		}

		function updateDonePercent(clientX: number) {
			// 鼠标移动的距离
			const decimalClientX = new Decimal(clientX);
			// 半个步长所对应的距离
			const decimalHalfOfStepX = new Decimal(state.halfOfStepX);
			// 寻找鼠标移动时经过的断点
			const foundMark = state.stops.find(v => {
				const decimalVX = new Decimal(v.x);

				// 只要在 +=半个步长距离 的范围内，就可以移动滑块了
				return (
					decimalClientX.gte(decimalVX.minus(decimalHalfOfStepX)) &&
					decimalClientX.lte(decimalVX.plus(decimalHalfOfStepX))
				);
			});

			if (foundMark) {
				state.donePercent = foundMark.style.left as number;
				context.emit('update:modelValue', Math.ceil(foundMark.value));
			}
		}

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

		function handleThumbMouseLeave() {
			// 鼠标移出触发器时，如果不处于拖动状态，那么直接关闭 tooltip
			if (!state.isMoving && props.showTooltip && !props.showTooltipAlways) {
				state.showTooltip = false;
			}
		}

		function handleTooltipMount(instance: any) {
			state.tooltipInstance = instance;
		}

		function handleTooltipClickOutside() {
			state.showTooltip = true;
		}

		function handleTrackClick(e: MouseEvent) {
			updateDonePercent(e.clientX);
			updateTooltipPosition();
		}

		return {
			state,
			props,
			context,
			trackInnerRef,
			thumbRef,
			computedModelValue,
			handleThumbMouseDown,
			handleThumbMouseEnter,
			handleThumbMouseLeave,
			handleTooltipMount,
			handleTooltipClickOutside,
			handleTrackClick,
		};
	},
});
</script>
<style lang="scss" scoped>
@import './Slider.scss';
</style>
