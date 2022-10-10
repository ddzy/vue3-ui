<script lang="ts">
import {
	defineComponent,
	h,
	PropType,
	reactive,
	toRef,
	VNode,
	watch,
} from 'vue';
import * as TYPES from '@/public/types/space';

interface IState {
	children: VNode[];
	wrapValue: 'wrap' | 'nowrap';
}

export default defineComponent({
	name: 'V3Space',
	props: {
		/** 自定义 space 容器的类名 */
		customClass: {
			type: String,
			default: '',
		},
		/** 同 flex 布局的 align-items */
		align: {
			type: String as PropType<TYPES.ISpaceAlign>,
			default: 'center',
			validator(v: string) {
				return ['start', 'end', 'center', 'flex-start', 'flex-end'].includes(v);
			},
		},
		/** 同 flex 布局的 flex-direction */
		direction: {
			type: String as PropType<TYPES.ISpaceDirection>,
			default: 'row',
			validator(v: string) {
				return ['row', 'column', 'row-reverse', 'column-reverse'].includes(v);
			},
		},
		/** 同 flex 布局的 flex-wrap */
		wrap: {
			type: Boolean,
			default: true,
		},
		/** 自定义分隔符，默认为空格 */
		separator: {
			type: [String, Object] as PropType<TYPES.ISpaceSeparator>,
			default: '',
		},
		/** 间隔大小 */
		size: {
			type: Number,
			default: 6,
		},
	},
	setup(props: TYPES.ISpaceProps, context) {
		const state: IState = reactive({
			/** 重新组装的子元素列表 */
			children: [],
			/** flex-wrap 值 */
			wrapValue: 'wrap',
		});

		if (context.slots.default && typeof context.slots.default === 'function') {
			let children = context.slots.default();
			const newChildren: VNode[] = [];

			// slot 有可能是通过 v-for 遍历出来的
			if (
				children.length === 1 &&
				children[0] &&
				Array.isArray(children[0].children)
			) {
				children = children[0].children as VNode[];
			}

			children.forEach((v, i) => {
				const spaceItem = h(
					'div',
					{
						class: 'v3-space__item',
						style: {
							margin: `0 ${props.size}px ${props.size}px 0`,
						},
					},
					v
				);

				// 如果有自定义的分隔符，就需要创建一个分割元素
				// 最后一项不需要添加分隔符
				if (props.separator && i !== children.length - 1) {
					newChildren.push(spaceItem);
					newChildren.push(
						h(
							'span',
							{
								class: 'v3-space__separator',
								style: {
									margin: `0 ${props.size}px ${props.size}px 0`,
								},
							},
							props.separator
						)
					);
				} else {
					newChildren.push(spaceItem);
				}
			});

			state.children = newChildren;
		}

		watch(
			toRef(props, 'wrap'),
			() => {
				state.wrapValue = props.wrap ? 'wrap' : 'nowrap';
			},
			{ immediate: true }
		);

		return () =>
			h(
				'div',
				{
					class: `v3-space ${props.customClass}`,
					style: {
						'flex-direction': props.direction,
						'align-items': props.align,
						'flex-wrap': state.wrapValue,
					},
				},
				state.children
			);
	},
});
</script>
<style lang="scss" scoped>
@import './Space.scss';
</style>
