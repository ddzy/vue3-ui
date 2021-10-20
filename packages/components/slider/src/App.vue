<template>
	<div class="demo-container">
		<v3-row>
			<v3-col :span="12">
				<h3>基本用法：</h3>
			</v3-col>
			<v3-col :span="12">
				<v3-slider label="音量" v-model="state.sliderValue1"></v3-slider>
			</v3-col>
		</v3-row>

		<v3-row>
			<v3-col :span="12">
				<h3>可显示间断点：</h3>
			</v3-col>
			<v3-col :span="12">
				<v3-slider
					v-model="state.sliderValue2"
					label="音量"
					:marks="state.marks2"
					:showStop="true"
					:step="25"
				></v3-slider>
			</v3-col>
		</v3-row>

		<v3-row>
			<v3-col :span="12">
				<h3>自定义前置和后置图标：</h3>
			</v3-col>
			<v3-col :span="12">
				<v3-slider
					v-model="state.sliderValue3"
					prependIcon="v3-icon-sound-Mute"
					appendIcon="v3-icon-notice"
					label="音量"
				></v3-slider>
			</v3-col>
		</v3-row>

		<v3-row>
			<v3-col :span="12">
				<h3>实时显示值：</h3>
			</v3-col>
			<v3-col :span="12">
				<v3-slider
					v-model="state.sliderValue4"
					prependIcon="v3-icon-sound-Mute"
					appendIcon="v3-icon-notice"
					label="音量"
					:max="200"
				></v3-slider>
			</v3-col>
		</v3-row>

		<v3-row>
			<v3-col :span="12">
				<h3>自定义步数：</h3>
			</v3-col>
			<v3-col :span="12">
				<v3-slider
					v-model="state.sliderValue5"
					prependIcon="v3-icon-sound-Mute"
					appendIcon="v3-icon-notice"
					label="音量"
					showTooltipAlways
					showStop
					:max="204"
					:step="5"
				></v3-slider>
			</v3-col>
		</v3-row>
	</div>
</template>
<script lang="ts">
import { defineComponent, h, reactive, watch } from 'vue';

export default defineComponent({
	setup(props, context) {
		const state = reactive({
			sliderValue1: 20,
			sliderValue2: 0,
			sliderValue3: 0,
			sliderValue4: 20,
			sliderValue5: 0,
			marks2: {
				0: {
					label: '0%',
					style: {},
				},
				25: {
					label: '25%',
					style: {},
				},
				50: {
					label: '50%',
					style: {
						color: 'red',
					},
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

		watch(
			() => state.sliderValue5,
			() => {
				console.log('state.sliderValue5 :>> ', state.sliderValue5);
			}
		);

		return {
			state,
		};
	},
	methods: {},
});
</script>
<style lang="scss" scoped></style>
