<template>
	<div class="v3-badge">
		<slot></slot>
		<div class="v3-badge__content"></div>
	</div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';
import * as TYPES from '@/public/types/badge';

interface IState {}

export default defineComponent({
	name: 'V3Badge',
	props: {},
	setup(props: TYPES.IBadgeProps, context) {
		const state: IState = reactive({});
	},
});
</script>
<style lang="scss" scoped>
@import './Badge.scss';
</style>
