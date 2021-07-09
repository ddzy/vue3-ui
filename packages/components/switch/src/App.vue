<template>
	<div class="demo-container">
		<v3-row>
			<v3-col :span="12"><h3>基本用法：</h3></v3-col>
			<v3-col>
				<v3-switch v-model="state.switchValue1"></v3-switch>
			</v3-col>
		</v3-row>

		<v3-row>
			<v3-col :span="12"><h3>自定义颜色：</h3></v3-col>
			<v3-col>
				<v3-switch
					v-model="state.switchValue2"
					activeColor="#00A0FF"
					inactiveColor="#B8B0B0"
				></v3-switch>
			</v3-col>
		</v3-row>

		<v3-row>
			<v3-col :span="12"><h3>在不同状态下显示的文本：</h3></v3-col>
			<v3-col>
				<v3-switch
					v-model="state.switchValue3"
					activeLabel="开"
					inactiveLabel="关"
				></v3-switch>
			</v3-col>
		</v3-row>

		<v3-row>
			<v3-col :span="12"><h3>可以用图标代替文本：</h3></v3-col>
			<v3-col>
				<v3-switch
					v-model="state.switchValue4"
					activeLabel="开"
					inactiveLabel="关"
					activeIcon="v3-icon-notice"
					inactiveIcon="v3-icon-sound-Mute"
				></v3-switch>
			</v3-col>
		</v3-row>
	</div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
	setup() {
		const state = reactive({
			switchValue1: true,
			switchValue2: true,
			switchValue3: false,
			switchValue4: false,
		});

		return {
			state,
		};
	},
	methods: {},
});
</script>
<style lang="scss" scoped></style>
