<template>
	<div
		:class="{
			'v3-slider': true,
			'is-moving': state.isMoving,
			'is-moving-2': state.isMoving2,
			'is-vertical': props.vertical,
			'is-range': props.range,
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
			<div
				ref="trackInnerRef"
				class="v3-slider-track__inner"
				:style="{
					backgroundColor: props.trackColor,
					'--slider-track-height': props.height,
				}"
			>
				<div
					class="v3-slider-track__done"
					:style="{
						[`${props.vertical ? 'height' : 'width'}`]: `${state.donePercent}%`,
						backgroundColor: props.doneTrackColor,
					}"
				></div>
				<v3-tooltip
					v-model="state.showTooltip"
					trigger="manual"
					placement="top"
					:offset="[0, 20]"
					@mount="instance => handleTooltipMount(instance, 1)"
					@clickOutside="handleTooltipClickOutside(1)"
				>
					<div
						ref="thumbRef"
						class="v3-slider-track__thumb"
						:style="{
							[`${props.vertical ? 'top' : 'left'}`]: `${state.donePercent}%`,
							backgroundColor: props.thumbColor,
							'--thumb-shadow-color': props.thumbShadowColor,
						}"
						@mousedown="handleThumbMouseDown($event, 1)"
						@mouseenter="handleThumbMouseEnter(1)"
						@mouseleave="handleThumbMouseLeave(1)"
					></div>

					<template #content>
						{{ computedModelValue1 }}
					</template>
				</v3-tooltip>

				<!-- 范围选择器才会出现 -->
				<template v-if="props.range">
					<v3-tooltip
						v-model="state.showTooltip2"
						trigger="manual"
						placement="top"
						:offset="[0, 20]"
						@mount="instance => handleTooltipMount(instance, 2)"
						@clickOutside="handleTooltipClickOutside(2)"
					>
						<div
							ref="thumbRef2"
							class="v3-slider-track__thumb v3-slider-track-thumb-2"
							:style="{
								[`${
									props.vertical ? 'top' : 'left'
								}`]: `${state.donePercent2}%`,
								backgroundColor: props.thumbColor,
								'--thumb-shadow-color': props.thumbShadowColor,
							}"
							@mousedown="handleThumbMouseDown($event, 2)"
							@mouseenter="handleThumbMouseEnter(2)"
							@mouseleave="handleThumbMouseLeave(2)"
						></div>

						<template #content>
							{{ computedModelValue2 }}
						</template>
					</v3-tooltip>
				</template>

				<div v-if="props.showStop" class="v3-slider-track__mark">
					<ul class="v3-slider-mark__list">
						<template v-for="(v, i) in state.stops" :key="v.value">
							<li
								v-if="![0, state.stops.length - 1].includes(i)"
								class="v3-slider-mark__item"
								:style="{
									[`${props.vertical ? 'top' : 'left'}`]: `${v.style.left}%`,
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
							:style="{
								[`${props.vertical ? 'top' : 'left'}`]: v.style.left,
							}"
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
import { usePosition, useResize } from '@common/hooks/index';
import V3Tooltip from '@components/tooltip/main';
import {
	computed,
	defineComponent,
	onMounted,
	onUnmounted,
	PropType,
	reactive,
	ref,
} from 'vue';
import Decimal from 'decimal.js';
import * as UTILS from '@common/utils/index';

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
	isMoving2: boolean;
	donePercent: number;
	donePercent2: number;
	marks: ILocalMarkItem[];
	showTooltip: boolean;
	showTooltip2: boolean;
	tooltipInstance: ITooltipInstance | null;
	tooltipInstance2: ITooltipInstance | null;
	stops: ILocalStopItem[];
	halfOfStepPos: number;
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
			default: 'auto',
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
		/** 断点label列表 */
		marks: {
			type: Object as PropType<TYPES.ISliderMarkItem>,
			default: null,
		},
		/** 滑块的颜色 */
		thumbColor: {
			type: String,
			default: 'rgba(0, 160, 255, 1)',
		},
		/** 滑块阴影的颜色 */
		thumbShadowColor: {
			type: String,
			default: 'rgba(0, 170, 250, 0.3)',
		},
		/** 滑动条的颜色 */
		trackColor: {
			type: String,
			default: 'rgba(221, 221, 221, 1)',
		},
		/** 已完成的进度条的颜色 */
		doneTrackColor: {
			type: String,
			default: 'rgba(0, 160, 255, 1)',
		},
	},
	setup(props: TYPES.ISliderProps, context) {
		const state: IState = reactive({
			/** 是否处于拖动状态 */
			isMoving: false,
			/** 滑块二是否处于拖动状态 */
			isMoving2: false,
			/** 已完成的宽度所占百分比 */
			donePercent: 0,
			/**  */
			donePercent2: 0,
			/** 处理后的断点 label 列表 */
			marks: [],
			/** 处理后的断点列表 */
			stops: [],
			/** tooltip 气泡的显隐状态 */
			showTooltip: false,
			/** tooltip2 气泡的显隐状态 */
			showTooltip2: false,
			/** tooltip 气泡的实例 */
			tooltipInstance: null,
			/** tooltip2 气泡的实例 */
			tooltipInstance2: null,
			/** 半个步长所对应的宽度（高度） */
			halfOfStepPos: 0,
		});
		const trackInnerRef = ref(document.createElement('div'));
		const thumbRef = ref(document.createElement('div'));
		const thumbRef2 = ref(document.createElement('div'));

		const { pageX, pageY } = usePosition({
			throttleTime: 0,
			callback() {
				if (state.isMoving || state.isMoving2) {
					// 更新已完成的进度
					updateDonePercent(
						props.vertical ? pageY.value : pageX.value,
						state.isMoving ? 1 : state.isMoving2 ? 2 : 0
					);
					// 更新 tooltip 的位置
					updateTooltipPosition();
				}
			},
		});
		const {} = useResize({
			throttleTime: 20,
			callback() {
				// 窗口大小发生变化时，也要更新断点的位置
				updateStops();
			},
		});

		const computedModelValue1 = computed(() => {
			return computeModelValueHelper(0);
		});
		const computedModelValue2 = computed(() => {
			return computeModelValueHelper(1);
		});

		onMounted(() => {
			if (!props.range) {
				// 组件挂载后，更新滑块触发器的位置
				state.donePercent = new Decimal(
					new Decimal(props.modelValue)
						.div(props.max)
						.mul(100)
						.toFixed(2)
				).toNumber();
			} else {
				// 范围选择器
				const newModelValue =
					props.modelValue.length === 2
						? [
								Math.min(props.modelValue[0], props.modelValue[1]),
								Math.max(props.modelValue[0], props.modelValue[1]),
						  ]
						: [props.min, props.max];

				state.donePercent = new Decimal(
					new Decimal(newModelValue[0])
						.div(props.max)
						.mul(100)
						.toFixed(2)
				).toNumber();
				state.donePercent2 = new Decimal(
					new Decimal(newModelValue[1])
						.div(props.max)
						.mul(100)
						.toFixed(2)
				).toNumber();
			}

			if (props.showTooltip && props.showTooltipAlways) {
				state.showTooltip = true;
				state.showTooltip2 = true;

				setTimeout(() => {
					updateTooltipPosition();
				}, 0);
			}

			updateStops();
			updateMarks();

			document.addEventListener('mouseup', handleDocumentMouseUp, false);
		});
		onUnmounted(() => {
			document.removeEventListener('mouseup', handleDocumentMouseUp);
		});

		function computeModelValueHelper(type: number) {
			if (typeof props.formatTooltip === 'function') {
				return props.formatTooltip(props.modelValue);
			} else {
				// 范围选择器
				if (props.range) {
					return (props.modelValue as number[])[type];
				} else {
					return props.modelValue;
				}
			}
		}

		function updateMarks() {
			// 组装断点 label 列表
			const newMarks: typeof state.marks = [];

			for (const key in props.marks) {
				if (Object.prototype.hasOwnProperty.call(props.marks, key)) {
					const decimalKey = new Decimal(key);
					const decimalValue = props.marks[decimalKey.toNumber()];
					// 找到与标记值相对应的断点（得到偏移量）
					const foundStop = state.stops.find(
						v => v.value === decimalKey.toNumber()
					);

					// 过滤掉小于最小值 && 大于最大值的项
					if (decimalKey.lt(props.min) || decimalKey.gt(props.max)) {
						continue;
					}

					if (foundStop) {
						newMarks.push({
							value: decimalKey.toNumber(),
							label: decimalValue.label,
							style: {
								...decimalValue.style,
								left: `${foundStop.style.left}%`,
							},
						});
					}
				}
			}

			state.marks = newMarks;
		}

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
			// 要判断水平还是垂直方向
			const trackInnerRectSize = props.vertical
				? trackInnerRect.height
				: trackInnerRect.width;
			const trackInnerRectPos = props.vertical
				? UTILS.getDomOffsetToDocument(trackInnerEl).top
				: UTILS.getDomOffsetToDocument(trackInnerEl).left;

			state.halfOfStepPos = new Decimal(trackInnerRectSize)
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
					x: new Decimal(trackInnerRectPos)
						.plus(
							new Decimal(trackInnerRectSize).mul(
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
					x: new Decimal(trackInnerRectPos)
						.plus(trackInnerRectSize)
						.round()
						.toNumber(),
				});
			}

			state.stops = newStops;
		}

		function updateDonePercent(mousePosition: number, type: number) {
			// 鼠标移动的距离
			const decimalMousePosition = new Decimal(mousePosition);
			// 半个步长所对应的距离
			const decimalHalfOfStepPos = new Decimal(state.halfOfStepPos);
			// 寻找鼠标移动时经过的断点
			const foundMark = state.stops.find(v => {
				const decimalVPos = new Decimal(v.x);

				// 只要在 +=半个步长距离 的范围内，就可以移动滑块了
				return (
					decimalMousePosition.gte(decimalVPos.minus(decimalHalfOfStepPos)) &&
					decimalMousePosition.lte(decimalVPos.plus(decimalHalfOfStepPos))
				);
			});

			if (foundMark) {
				if (!props.range) {
					state.donePercent = foundMark.style.left as number;
					context.emit('update:modelValue', Math.ceil(foundMark.value));
				} else {
					switch (type) {
						case 1: {
							state.donePercent = foundMark.style.left as number;
							context.emit('update:modelValue', [
								Math.ceil(foundMark.value),
								(props.modelValue as number[])[1],
							]);

							break;
						}
						case 2: {
							state.donePercent2 = foundMark.style.left as number;
							context.emit('update:modelValue', [
								(props.modelValue as number[])[0],
								Math.ceil(foundMark.value),
							]);

							break;
						}
						default: {
							break;
						}
					}
				}
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
			if (state.tooltipInstance2) {
				state.tooltipInstance2.setProps({
					getReferenceClientRect: () => thumbRef2.value.getBoundingClientRect(),
				});
			}
		}

		function handleDocumentMouseUp() {
			// 直接在 document 上监听鼠标弹起事件，因为当过快拖动时，滑块触发器上并不能触发此事件
			state.isMoving = false;
			state.isMoving2 = false;

			// 鼠标结束拖动滑块触发器时，隐藏 tooltip
			if (props.showTooltip && !props.showTooltipAlways) {
				state.showTooltip = false;
				state.showTooltip2 = false;
			}
		}

		function handleThumbMouseDown(e: MouseEvent, type: number) {
			if (!props.range) {
				state.isMoving = true;
			} else {
				switch (type) {
					case 1: {
						state.isMoving = true;
						break;
					}
					case 2: {
						state.isMoving2 = true;
						break;
					}
					default: {
						break;
					}
				}
			}

			// 鼠标点击滑块触发器时，显示 tooltip 并更新其位置
			if (props.showTooltip) {
				if (!props.range) {
					state.showTooltip = true;
				} else {
					switch (type) {
						case 1: {
							state.showTooltip = true;
							break;
						}
						case 2: {
							state.showTooltip2 = true;
							break;
						}
						default: {
							break;
						}
					}
				}

				setTimeout(() => {
					updateTooltipPosition();
				}, 0);
			}
		}

		function handleThumbMouseEnter(type: number) {
			// 鼠标移入滑块触发器时，显示 tooltip 并更新其位置
			if (props.showTooltip) {
				if (props.range) {
					switch (type) {
						case 1: {
							state.showTooltip = true;
							break;
						}
						case 2: {
							state.showTooltip2 = true;
							break;
						}
						default: {
							break;
						}
					}
				} else {
					state.showTooltip = true;
				}

				setTimeout(() => {
					updateTooltipPosition();
				}, 0);
			}
		}

		function handleThumbMouseLeave(type: number) {
			// 鼠标移出触发器时，如果不处于拖动状态，那么直接关闭 tooltip
			if (!props.range) {
				if (!state.isMoving && props.showTooltip && !props.showTooltipAlways) {
					state.showTooltip = false;
				}
			} else {
				if (
					(!state.isMoving || !state.isMoving2) &&
					props.showTooltip &&
					!props.showTooltipAlways
				) {
					switch (type) {
						case 1: {
							state.showTooltip = false;
							break;
						}
						case 2: {
							state.showTooltip2 = false;
							break;
						}
						default: {
							break;
						}
					}
				}
			}
		}

		function handleTooltipMount(instance: any, type: number) {
			if (!props.range) {
				state.tooltipInstance = instance;
			} else {
				switch (type) {
					case 1: {
						state.tooltipInstance = instance;
						break;
					}
					case 2: {
						state.tooltipInstance2 = instance;
						break;
					}
					default: {
						break;
					}
				}
			}
		}

		function handleTooltipClickOutside(type: number) {
			if (!props.range) {
				state.showTooltip = true;
			} else {
				switch (type) {
					case 1: {
						state.showTooltip = true;
						break;
					}
					case 2: {
						state.showTooltip2 = true;
						break;
					}
					default: {
						break;
					}
				}
			}
		}

		function handleTrackClick(e: MouseEvent) {
			updateDonePercent(
				props.vertical ? e.pageY : e.pageX,
				state.isMoving ? 1 : state.isMoving2 ? 2 : 0
			);
			updateTooltipPosition();
		}

		return {
			state,
			props,
			context,
			trackInnerRef,
			thumbRef,
			thumbRef2,
			computedModelValue1,
			computedModelValue2,
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
