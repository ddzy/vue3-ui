<template>
	<div
		class="v3-space"
		:class="props.customClass"
		:style="{
			flexDirection: props.direction,
			justifyContent: props.justify,
			alignItems: props.align,
			flexWrap: computedWrap,
		}"
	>
		<template v-for="(v, i) in computedChildren" :key="v">
			<div
				class="v3-space__item"
				:style="{
					margin: `0 ${props.size}px ${props.size}px 0`,
				}"
			>
				<component :is="v"></component>
			</div>
			<span
				v-if="props.separator && i !== computedChildren.length - 1"
				class="v3-space__separator"
				:style="{
					margin: `0 ${props.size}px ${props.size}px 0`,
				}"
			>
				{{ props.separator }}
			</span>
		</template>
	</div>
</template>
<script lang="ts" setup>
import { VNode, computed, useSlots } from 'vue';

import { ISpaceProps } from '@typings/index';

defineOptions({
	name: 'V3Space',
});

const props = withDefaults(defineProps<ISpaceProps>(), {
	customClass: '',
	justify: 'flex-start',
	align: 'center',
	direction: 'row',
	wrap: true,
	separator: '',
	size: 8,
});
const slots = useSlots();

const computedWrap = computed(() => {
	return props.wrap ? 'wrap' : 'nowrap';
});

const computedChildren = computed(() => {
	let children: VNode[] = [];
	if (slots.default && typeof slots.default === 'function') {
		children = slots.default();
		// slot 有可能是通过 v-for 遍历出来的
		if (
			children.length === 1 &&
			children[0] &&
			Array.isArray(children[0].children)
		) {
			children = children[0].children as VNode[];
		}
	}

	return children;
});
</script>
<style lang="scss">
@import './Space.scss';
</style>
