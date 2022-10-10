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

		<v3-row>
			<v3-col :span="12"><h3>禁用状态：</h3></v3-col>
			<v3-col>
				<v3-switch v-model="state.switchValue5" :disabled="true"></v3-switch>
			</v3-col>
		</v3-row>

		<v3-row>
			<v3-col :span="12"><h3>自定义宽度：</h3></v3-col>
			<v3-col>
				<v3-switch v-model="state.switchValue6" :width="60"></v3-switch>
			</v3-col>
		</v3-row>

		<v3-row>
			<v3-col :span="12"
				><h3>可以绑定多种类型的值（string、boolean、number）：</h3></v3-col
			>
			<v3-col :span="1">
				<v3-switch
					v-model="state.switchValue7"
					:activeValue="1"
					:inactiveValue="0"
					@change="handleChange"
				></v3-switch>
			</v3-col>
			<v3-col :span="1">
				<v3-switch
					v-model="state.switchValue8"
					:activeValue="'Beijing'"
					:inactiveValue="'Shanghai'"
					@change="handleChange"
				></v3-switch>
			</v3-col>
		</v3-row>
	</div>
</template>
<script lang="ts">
import V3Message from '@components/message/main';
import { defineComponent, reactive, toRef, watch } from 'vue';

export default defineComponent({
	setup(props, context) {
		const state = reactive({
			switchValue1: true,
			switchValue2: true,
			switchValue3: false,
			switchValue4: false,
			switchValue5: false,
			switchValue6: false,
			switchValue7: 1,
			switchValue8: 'Shanghai',
		});

		function handleChange(v: any) {
			V3Message.success({
				message: `选中的值为：${v}`,
			});
		}

		return {
			state,
			handleChange,
		};
	},
	methods: {},
});
</script>
<style lang="scss" scoped></style>
