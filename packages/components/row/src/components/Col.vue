<template>
	<div
		:class="{
			'v3-col': true,
			[`v3-col-span-${state.defaultProps.span}`]: state.defaultProps.span,
			[`v3-col-offset-${state.defaultProps.offset}`]: state.defaultProps.offset,
			[`v3-col-push-${state.defaultProps.push}`]: state.defaultProps.push,
			[`v3-col-pull-${state.defaultProps.pull}`]: state.defaultProps.pull,
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
			},
			{ immediate: true }
		);

		/**
		 * 检查当前 col 的直属父级是否为 row
		 */
		function checkIsDirectRow() {
			return app && app.parent && app.parent.type.name === 'V3Row';
		}

		return {
			app,
			state,
			props,
		};
	},
	methods: {
		commonMediaChange(e: MediaQueryListEvent, id: string) {
			if (e.matches && this[id as keyof TYPES.IColProps]) {
				// 响应式相关的 props 字段可能是数字，代表 span
				// 也有可能是键值对
				if (typeof this[id as keyof TYPES.IColProps] === 'number') {
					setTimeout(() => {
						this.state.defaultProps.span = this[
							id as keyof TYPES.IColProps
						] as number;
					}, 0);
				} else if (
					{}.toString.call(this[id as keyof TYPES.IColProps]) ===
					'[object Object]'
				) {
					for (const key in this[id as keyof TYPES.IColProps] as any) {
						if (this.state.defaultProps.hasOwnProperty(key)) {
							const value = this[id as keyof {}][
								key as keyof TYPES.IColBaseOption
							];

							if (typeof value === 'number') {
								setTimeout(() => {
									this.state.defaultProps[key as keyof TYPES.IColProps] = value;
								}, 0);
							}
						}
					}
				}
			} else {
				// 如果没有匹配到宽度，那么就重置为 props 传下来的默认的非响应式的字段（offset、push、pull、span）
				this.state.defaultProps.span = this.span || 0;
				this.state.defaultProps.offset = this.offset || 0;
				this.state.defaultProps.push = this.push || 0;
				this.state.defaultProps.pull = this.pull || 0;
			}
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
