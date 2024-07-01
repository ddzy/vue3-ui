<template>
	<div class="v3-tab-pane">
		<slot></slot>
	</div>
</template>
<script lang="ts" setup>
import { inject } from 'vue';
import { watch } from 'vue';

import { TAB_PROVIDE } from '@common/constants/provide-symbol';
import { ITabPaneProps, ITabProvide } from '@typings/index';

defineOptions({
	name: 'V3TabPane',
});

const props = withDefaults(defineProps<ITabPaneProps>(), {
	/** 页签的唯一标识名称 */
	name: 0,
	/** 页签的标题 */
	title: '0',
	/** 是否禁用当前页签 */
	disabled: false,
	/** 当前页签是否可关闭 */
	closable: true,
});
const tab = inject<ITabProvide>(TAB_PROVIDE);
watch(
	props,
	() => {
		if (tab) {
			let found = tab.tabPanes.value.find((v) => v.props.name === props.name);
			if (!found) {
				tab.tabPanes.value = tab.tabPanes.value.concat({
					props: {
						...props,
					},
				});
			} else {
				tab.tabPanes.value = tab.tabPanes.value.map((v) => {
					return v.props.name === props.name
						? {
								...v,
								props: {
									...v.props,
									...props,
								},
							}
						: v;
				});
			}
		}
	},
	{ immediate: true },
);
</script>
<style lang="scss" scoped>
@import './TabPane.scss';
</style>
