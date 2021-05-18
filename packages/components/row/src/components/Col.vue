<template>
	<div
		:class="{
			'v3-col': true,
			[`v3-col-${props.span}`]: props.span,
			[`v3-col-offset-${props.offset}`]: props.offset,
			[`v3-col-push-${props.push}`]: props.push,
			[`v3-col-pull-${props.pull}`]: props.pull,
			[`${state.xsClass}`]: true,
			[`${state.smClass}`]: true,
			[`${state.mdClass}`]: true,
			[`${state.lgClass}`]: true,
			[`${state.xlClass}`]: true,
			[`${state.xsOffsetClass}`]: true,
			[`${state.smOffsetClass}`]: true,
			[`${state.mdOffsetClass}`]: true,
			[`${state.lgOffsetClass}`]: true,
			[`${state.xlOffsetClass}`]: true,
			[`${state.xsPushClass}`]: true,
			[`${state.smPushClass}`]: true,
			[`${state.mdPushClass}`]: true,
			[`${state.lgPushClass}`]: true,
			[`${state.xlPushClass}`]: true,
			[`${state.xsPullClass}`]: true,
			[`${state.smPullClass}`]: true,
			[`${state.mdPullClass}`]: true,
			[`${state.lgPullClass}`]: true,
			[`${state.xlPullClass}`]: true,
		}"
		:style="{
			[state.injectedRowInstance
				? 'padding-left'
				: '']: state.injectedRowInstance
				? `${state.injectedRowInstance.props.gutter / 2}px`
				: 0,
			[state.injectedRowInstance
				? 'padding-right'
				: '']: state.injectedRowInstance
				? `${state.injectedRowInstance.props.gutter / 2}px`
				: 0,
		}"
	>
		<slot></slot>
	</div>
</template>
<script lang="ts">
import {
	defineComponent,
	getCurrentInstance,
	inject,
	PropType,
	reactive,
	watch,
} from 'vue';

import * as TYPES from '@/public/types/row';
import * as UTILS from '@common/utils/index';
import { ROW_INSTANCE_PROVIDE } from '@common/constants/provide-symbol';

export default defineComponent({
	name: 'V3Col',
	props: {
		/** 所占行数（总数 12）*/
		span: {
			type: Number as PropType<TYPES.IColSpan>,
			default: 0,
		},
		/** 距主轴左侧偏移量 */
		offset: {
			type: Number as PropType<TYPES.IColOffset>,
			default: 0,
		},
		/** 相对于自身，向其右侧的偏移量 */
		push: {
			type: Number as PropType<TYPES.IColPush>,
			default: 0,
		},
		/** 相对于自身，向其左侧的偏移量 */
		pull: {
			type: Number as PropType<TYPES.IColPull>,
			default: 0,
		},
		/** < 576px */
		xs: {
			type: [Number, Object] as PropType<TYPES.IColXS>,
			default: 0,
		},
		/** < 768px */
		sm: {
			type: [Number, Object] as PropType<TYPES.IColSM>,
			default: 0,
		},
		/** < 992px */
		md: {
			type: [Number, Object] as PropType<TYPES.IColMD>,
			default: 0,
		},
		/** < 1200px */
		lg: {
			type: [Number, Object] as PropType<TYPES.IColLG>,
			default: 0,
		},
		/** > 1201px */
		xl: {
			type: [Number, Object] as PropType<TYPES.IColXL>,
			default: 0,
		},
	},
	setup(props: TYPES.IColProps) {
		const state = reactive({
			/** 父级 v3-row 实例 */
			injectedRowInstance: null,
			defaultProps: {
				span: 0,
				offset: 0,
				push: 0,
				pull: 0,
				xs: 0,
				sm: 0,
				md: 0,
				lg: 0,
				xl: 0,
			} as TYPES.IColProps,

			xsMedia: window.matchMedia('(max-width: 576px)'),
			smMedia: window.matchMedia('(min-width: 577px) and (max-width: 768px)'),
			mdMedia: window.matchMedia('(min-width: 769px) and (max-width: 992px)'),
			lgMedia: window.matchMedia('(min-width: 993px) and (max-width: 1200px)'),
			xlMedia: window.matchMedia('(min-width: 1201px)'),

			/** 各响应式尺寸对应的类名 */
			xsClass: '',
			smClass: '',
			mdClass: '',
			lgClass: '',
			xlClass: '',

			xsOffsetClass: '',
			smOffsetClass: '',
			mdOffsetClass: '',
			lgOffsetClass: '',
			xlOffsetClass: '',

			xsPushClass: '',
			smPushClass: '',
			mdPushClass: '',
			lgPushClass: '',
			xlPushClass: '',

			xsPullClass: '',
			smPullClass: '',
			mdPullClass: '',
			lgPullClass: '',
			xlPullClass: '',
		});
		const app = getCurrentInstance();
		const isDirectRow = checkIsDirectRow();

		if (isDirectRow) {
			state.injectedRowInstance = inject(ROW_INSTANCE_PROVIDE)!;
		}

		watch(
			props,
			() => {
				state.defaultProps = {
					...state.defaultProps,
					...reactive(props),
				};

				// 根据传入的响应式 prop 的类型，计算出相应的 class 类名
				if (app) {
					state.xsClass = computeResponsiveClass('xs', props.xs, 'span');
					state.smClass = computeResponsiveClass('sm', props.sm, 'span');
					state.mdClass = computeResponsiveClass('md', props.md, 'span');
					state.lgClass = computeResponsiveClass('lg', props.lg, 'span');
					state.xlClass = computeResponsiveClass('xl', props.xl, 'span');

					state.xsOffsetClass = computeResponsiveClass(
						'xs',
						props.xs,
						'offset'
					);
					state.smOffsetClass = computeResponsiveClass(
						'sm',
						props.sm,
						'offset'
					);
					state.mdOffsetClass = computeResponsiveClass(
						'md',
						props.md,
						'offset'
					);
					state.lgOffsetClass = computeResponsiveClass(
						'lg',
						props.lg,
						'offset'
					);
					state.xlOffsetClass = computeResponsiveClass(
						'xl',
						props.xl,
						'offset'
					);

					state.xsPushClass = computeResponsiveClass('xs', props.xs, 'push');
					state.smPushClass = computeResponsiveClass('sm', props.sm, 'push');
					state.mdPushClass = computeResponsiveClass('md', props.md, 'push');
					state.lgPushClass = computeResponsiveClass('lg', props.lg, 'push');
					state.xlPushClass = computeResponsiveClass('xl', props.xl, 'push');

					state.xsPullClass = computeResponsiveClass('xs', props.xs, 'pull');
					state.smPullClass = computeResponsiveClass('sm', props.sm, 'pull');
					state.mdPullClass = computeResponsiveClass('md', props.md, 'pull');
					state.lgPullClass = computeResponsiveClass('lg', props.lg, 'pull');
					state.xlPullClass = computeResponsiveClass('xl', props.xl, 'pull');
				}
			},
			{ immediate: true }
		);

		/**
		 * 检查当前 col 的直属父级是否为 row
		 */
		function checkIsDirectRow() {
			return app && app.parent && app.parent.type.name === 'V3Row';
		}

		/**
		 * 计算各响应式 prop 对应的 class 类名
		 */
		function computeResponsiveClass(
			baseId: string,
			val: any,
			childId: string
		): string {
			if (UTILS.isStrictNumber(val) && val) {
				return childId === 'span' ? `v3-col-${baseId}-${val}` : '';
			} else if (
				UTILS.isStrictObject(val) &&
				val.hasOwnProperty(childId) &&
				UTILS.isStrictNumber(val[childId]) &&
				val[childId]
			) {
				return childId === 'span'
					? `v3-col-${baseId}-${val[childId]}`
					: `v3-col-${baseId}-${childId}-${val[childId]}`;
			} else {
				return '';
			}
		}

		return {
			app,
			state,
			props,
		};
	},
	methods: {
		commonMediaChange(e: MediaQueryListEvent, id: string) {
			// if (e.matches && this[id as keyof TYPES.IColProps]) {
			// 	// 响应式相关的 props 字段可能是数字，代表 span
			// 	// 也有可能是键值对
			// 	if (UTILS.isStrictNumber(this[id as keyof TYPES.IColProps])) {
			// 		setTimeout(() => {
			// 			this.state.defaultProps.span = this[
			// 				id as keyof TYPES.IColProps
			// 			] as number;
			// 		}, 0);
			// 	} else if (
			// 		{}.toString.call(this[id as keyof TYPES.IColProps]) ===
			// 		'[object Object]'
			// 	) {
			// 		for (const key in this[id as keyof TYPES.IColProps] as any) {
			// 			if (this.state.defaultProps.hasOwnProperty(key)) {
			// 				const value = this[id as keyof {}][
			// 					key as keyof TYPES.IColBaseOption
			// 				];
			// 				if (UTILS.isStrictNumber(value)) {
			// 					setTimeout(() => {
			// 						this.state.defaultProps[key as keyof TYPES.IColProps] = value;
			// 					}, 0);
			// 				}
			// 			}
			// 		}
			// 	}
			// } else {
			// 	// 如果没有匹配到宽度，那么就重置为 props 传下来的默认的非响应式的字段（offset、push、pull、span）
			// 	this.state.defaultProps.span = this.span || 0;
			// 	this.state.defaultProps.offset = this.offset || 0;
			// 	this.state.defaultProps.push = this.push || 0;
			// 	this.state.defaultProps.pull = this.pull || 0;
			// }
		},
		xsMediaChange(e: MediaQueryListEvent) {
			this.commonMediaChange(e, 'xs');
		},
		smMediaChange(e: MediaQueryListEvent) {
			this.commonMediaChange(e, 'sm');
		},
		mdMediaChange(e: MediaQueryListEvent) {
			this.commonMediaChange(e, 'md');
		},
		lgMediaChange(e: MediaQueryListEvent) {
			this.commonMediaChange(e, 'lg');
		},
		xlMediaChange(e: MediaQueryListEvent) {
			this.commonMediaChange(e, 'xl');
		},
	},
	mounted() {
		// 媒体查询页面宽度变化，更改对应的 span、offset 等
		this.state.xsMedia &&
			this.state.xsMedia.addEventListener('change', this.xsMediaChange);
		this.state.smMedia &&
			this.state.smMedia.addEventListener('change', this.smMediaChange);
		this.state.mdMedia &&
			this.state.mdMedia.addEventListener('change', this.mdMediaChange);
		this.state.lgMedia &&
			this.state.lgMedia.addEventListener('change', this.lgMediaChange);
		this.state.xlMedia &&
			this.state.xlMedia.addEventListener('change', this.xlMediaChange);
	},
	beforeUnmount() {
		// 移除各监听器
		if (this.state.xsMedia && this.xsMediaChange) {
			this.state.xsMedia.removeEventListener('change', this.xsMediaChange);
		}
		if (this.state.smMedia && this.smMediaChange) {
			this.state.xsMedia.removeEventListener('change', this.smMediaChange);
		}
		if (this.state.mdMedia && this.mdMediaChange) {
			this.state.mdMedia.removeEventListener('change', this.mdMediaChange);
		}
		if (this.state.lgMedia && this.lgMediaChange) {
			this.state.xsMedia.removeEventListener('change', this.lgMediaChange);
		}
		if (this.state.xlMedia && this.xlMediaChange) {
			this.state.xsMedia.removeEventListener('change', this.xlMediaChange);
		}
	},
});
</script>
<style lang="scss" scoped>
@import './Col.scss';
</style>
