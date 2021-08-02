<template>
	<div class="demo-container">
		<v3-row>
			<v3-col :span="12">
				<h3>基本用法：</h3>
			</v3-col>
			<v3-col :span="12">
				<v3-slider
					prependIcon="v3-icon-sound-Mute"
					appendIcon="v3-icon-notice"
					label="音量"
					v-model="state.sliderValue1"
					:marks="state.marks1"
				></v3-slider>
			</v3-col>
		</v3-row>
	</div>
</template>
<script lang="ts">
import { defineComponent, h, reactive } from 'vue';

export default defineComponent({
	setup(props, context) {
		const state = reactive({
			sliderValue1: 20,
			marks1: {
				25: {
					label: '25%',
					style: {},
				},
				50: {
					label: '50%',
					style: {},
				},
				75: {
					label: '75%',
					style: {},
				},
				100: {
					label: '100%',
					style: {},
				},
				125: {
					label: '125%',
					style: {},
				},
			},
		});

		return {
			state,
		};
	},
	methods: {},
});
</script>
<style lang="scss" scoped></style>
