<template>
	<IconPark v-bind="{ ...props }" :key="state.key" />
</template>
<script lang="ts">
export default {
	name: 'V3Icon',
};
</script>
<script lang="ts" setup>
import {
	PropType,
	defineComponent,
	reactive,
	watch,
	useAttrs,
	toRefs,
} from 'vue';
import { IconPark } from '@icon-park/vue-next/lib/all';
import { IconProvider, DEFAULT_ICON_CONFIGS } from '@icon-park/vue-next';
import '@icon-park/vue-next/styles/index.css';

import type { IIconProps } from '@typings/index';

IconProvider({
	...DEFAULT_ICON_CONFIGS,
	prefix: 'v3',
	size: '1em',
});

const props = withDefaults(defineProps<IIconProps>(), {
	theme: 'outline',
	size: '1em',
	spin: false,
	fill: 'currentColor',
	strokeLinecap: 'round',
	strokeLinejoin: 'round',
	strokeWidth: 4,
});
const state = reactive({
	key: 0,
});

watch(props, () => {
	state.key += 1;
});
</script>
<style lang="scss">
@import './Icon.scss';
</style>
