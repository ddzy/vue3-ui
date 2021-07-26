<template>
	<div class="v3-card">card</div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';
import * as TYPES from '@/public/types/card';

interface IState {}

export default defineComponent({
	name: 'V3Card',
	components: {},
	props: {},
	setup(props: Required<TYPES.ICardProps>, context) {
		const state: IState = reactive({});

		return {
			state,
			props,
			context,
		};
	},
	methods: {
		close() {
			close();
		},
	},
});
</script>
<style lang="scss" scoped>
@import './Card.scss';
</style>
