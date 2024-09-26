<template>
	<component
		:is="computedIcon"
		:theme="theme"
		:size="size"
		:spin="spin"
		:fill="fill"
		:strokeWidth="strokeWidth"
		:strokeLinecap="strokeLinecap"
		:strokeLinejoin="strokeLinejoin"
	></component>
</template>
<script lang="ts">
import { PropType, defineComponent } from 'vue';

import { DEFAULT_ICON_CONFIGS, IconProvider } from '@icon-park/vue-next';
import '@icon-park/vue-next/styles/index.css';
import type { IIconProps } from '@typings/index';
import { useChangeCase } from '@vueuse/integrations/useChangeCase';

import * as iconMap from './iconMap';

export default defineComponent({
	name: 'V3Icon',
	components: {
		...iconMap,
	},
	props: {
		type: {
			type: String as PropType<IIconProps['type']>,
			required: true,
		},
		theme: {
			type: String as PropType<IIconProps['theme']>,
			default: 'outline',
			validator(v: string) {
				return ['outline', 'filled', 'two-tone', 'multi-color'].includes(v);
			},
		},
		size: {
			type: [String, Number] as PropType<IIconProps['size']>,
			default: '1em',
		},
		spin: {
			type: Boolean as PropType<IIconProps['spin']>,
			default: false,
		},
		fill: {
			type: [String, Array] as PropType<IIconProps['fill']>,
			default: 'currentColor',
		},
		strokeLinecap: {
			type: String as PropType<IIconProps['strokeLinecap']>,
			default: 'round',
			validator(v: string) {
				return ['round', 'butt', 'square'].includes(v);
			},
		},
		strokeLinejoin: {
			type: String as PropType<IIconProps['strokeLinejoin']>,
			default: 'round',
			validator(v: string) {
				return ['round', 'miter', 'bevel'].includes(v);
			},
		},
		strokeWidth: {
			type: Number as PropType<IIconProps['strokeWidth']>,
			default: 4,
		},
	},
	emits: ['click'],
	setup() {
		IconProvider({
			...DEFAULT_ICON_CONFIGS,
			prefix: 'v3',
			size: '1em',
		});
	},
	computed: {
		computedIcon() {
			const icon = useChangeCase(this.type, 'pascalCase');
			return icon.value;
		},
	},
});
</script>
<style lang="scss">
@import './Icon.scss';
</style>
