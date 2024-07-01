<template>
	<div class="v3-tab">
		<div class="v3-tab__header">
			<div class="v3-tab__nav">
				<ul class="v3-tab__nav-list">
					<li
						v-for="v in tabPanes"
						:key="v.props.name"
						class="v3-tab__nav-item"
					>
						{{ v.props.title }}
					</li>
				</ul>
			</div>
			<div class="v3-tab__track"></div>
		</div>
		<div class="v3-tab__body">
			<slot></slot>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { reactive, useSlots } from 'vue';
import { ref } from 'vue';
import { provide } from 'vue';
import { watch } from 'vue';

import { TAB_PROVIDE } from '@common/constants/provide-symbol';
import { ITabPaneProvide, ITabProps, ITabProvide } from '@typings/index';

defineOptions({
	name: 'V3Tab',
});

const props = withDefaults(defineProps<ITabProps>(), {
	/** 当前切换的页签 */
	modelValue: 0,
	/** 页签类型 */
	type: 'bar',
	/** 是否可动态增加页签 */
	addable: true,
	/** 是否可关闭页签 */
	closable: true,
	/** 页签大小 */
	size: 'medium',
	/** 切换页签的方式 */
	trigger: 'click',
	/** 页签切换器的位置 */
	placement: 'top',
	/** 是否显示页签切换器 */
	showHeader: true,
	/** 当前活跃的页签切换器项是否始终保持居中 */
	centeredHeader: true,
});
const model = defineModel<boolean>();

const tabPanes = ref<ITabPaneProvide[]>([]);
provide<ITabProvide>(TAB_PROVIDE, {
	tabPanes,
});
</script>
<style lang="scss">
@import './Tab.scss';
</style>
