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
				<div
					ref="thumbRef"
					class="v3-slider-track__thumb"
					:style="{
						left: `${state.donePercent}%`,
						transform: `translate(${computedThumbTransformX}%, -50%)`,
					}"
					@mousedown="handleThumbMouseDown"
				></div>
				<div class="v3-slider-track__mark">
					<ul class="v3-slider-mark__list">
						<!-- <li
							class="v3-slider-mark__item"
							v-for="v in state.marks"
							:key="v.value"
							:style="{
								left: `${v.left}%`,
							}"
						></li> -->

						<template v-for="v in state.marks">
							<li
								class="v3-slider-mark__item"
								v-if="!v.isLimit"
								:key="v.value"
								:style="{
									left: `${v.left}%`,
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
							:style="{
								left: `${v.left}%`,
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
import * as TYPES from '@/public/types/slider';
import { usePosition } from '@common/hooks/index';

interface ILocalMarkItem {
	value: number;
	label: string;
	style: {
		[key: string]: string;
	};
	left: number;
	isLimit: boolean;
}
interface IState {
	isMoving: boolean;
	startX: number;
	donePercent: number;
	marks: ILocalMarkItem[];
}

export default defineComponent({
	name: 'V3Slider',
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

					// 边界处理
					if (clientX.value >= trackX + trackWidth - thumbWidth) {
						// 超出最大宽度
						state.donePercent = 100;
						return;
					} else if (clientX.value <= trackX) {
						// 低于最小宽度
						state.donePercent = 0;
						return;
					} else {
						// 滑块的已完成宽度
						const doneWidth = clientX.value - trackX;
						// 计算已完成的宽度所占滑块总宽度的百分比
						state.donePercent = (doneWidth / trackWidth) * 100;
					}
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
						const isLimit =
							keyToNumber === props.min || keyToNumber === props.max;

						// 过滤掉小于最小值或者大于最大值的项
						if (keyToNumber < props.min || keyToNumber > props.max) {
							continue;
						}

						newMarks.push({
							value: keyToNumber,
							label: value.label,
							style: value.style,
							left: (keyToNumber / props.max) * 100,
							isLimit,
						});
					}
				}

				state.marks = newMarks;
			},
			{ immediate: true, deep: true }
		);

		onMounted(() => {
			document.addEventListener('mouseup', handleDocumentMouseUp, false);
		});
		onUnmounted(() => {
			document.removeEventListener('mouseup', handleDocumentMouseUp);
		});

		function handleDocumentMouseUp() {
			// 直接在 document 上监听鼠标弹起事件，因为当过快拖动时，滑块触发器上并不能触发此事件
			state.isMoving = false;
		}

		function handleThumbMouseDown(e: MouseEvent) {
			state.isMoving = true;
			state.startX = e.pageX;
		}

		return {
			state,
			props,
			context,
			trackRef,
			thumbRef,
			computedThumbTransformX,
			handleThumbMouseDown,
		};
	},
});
</script>
<style lang="scss" scoped>
@import './Slider.scss';
</style>
