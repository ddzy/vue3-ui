<template>
	<div class="input-demo-container">
		<h3>基本的输入框</h3>
		<v3-row>
			<v3-col>
				<v3-input v-model="state.inputValue" :type="'text'"> </v3-input>
			</v3-col>
		</v3-row>
		<h3>可清空输入框</h3>
		<v3-row>
			<v3-col>
				<v3-input v-model="state.inputValue2" :type="'text'" :clearable="true">
				</v3-input>
			</v3-col>
		</v3-row>
		<h3>限制输入字符数量</h3>
		<v3-row>
			<v3-col>
				<v3-input
					v-model="state.inputValue3"
					:type="'text'"
					:maxlength="10"
					:showWordLimit="true"
				>
				</v3-input>
			</v3-col>
		</v3-row>
		<h3>自定义前缀/后缀图标</h3>
		<v3-row>
			<v3-col>
				<v3-input
					v-model="state.inputValue3"
					:type="'text'"
					:prefixIcon="'v3-icon-editor'"
				>
				</v3-input>
			</v3-col>
		</v3-row>
		<h3>自定义前置/后置图标</h3>
		<v3-row>
			<v3-col>
				<v3-input
					v-model="state.inputValue4"
					:type="'text'"
					:appendIcon="'v3-icon-search'"
				>
				</v3-input>
			</v3-col>
		</v3-row>

		<h3>高度自动撑开</h3>
		<v3-row>
			<v3-col>
				<v3-input-textarea
					v-model="state.inputValue5"
					:width="100"
					:height="150"
					:resize="'both'"
					:disabled="false"
					:readonly="false"
					:autoHeight="true"
				></v3-input-textarea>
			</v3-col>
		</v3-row>

		<h3>基本的计数器</h3>
		<v3-row>
			<v3-col>
				<v3-input-number
					v-model="state.inputValue6"
					:controlsPosition="'both'"
					:precision="0"
					:disabled="false"
					:readonly="false"
					:stepStrictly="true"
				></v3-input-number>
			</v3-col>
		</v3-row>
		<h3>限制步长和最大值</h3>
		<v3-row>
			<v3-col>
				<v3-input-number
					v-model="state.inputValue7"
					:controlsPosition="'both'"
					:precision="0"
					:disabled="false"
					:readonly="false"
					:step="2"
					:min="0"
					:max="20"
					:stepStrictly="true"
				></v3-input-number>
			</v3-col>
		</v3-row>
		<h3>可调整控制按钮组的位置</h3>
		<v3-row>
			<v3-col>
				<v3-input-number
					v-model="state.inputValue8"
					:controlsPosition="'right'"
					:precision="0"
					:disabled="false"
					:readonly="false"
					:stepStrictly="true"
				></v3-input-number>
			</v3-col>
		</v3-row>
	</div>
</template>
<script lang="ts">
import { defineComponent, reactive, watch } from 'vue';
import V3Input from './components/Input.vue';
import V3InputNumber from './components/InputNumber.vue';
import V3InputTextarea from './components/InputTextarea.vue';

export default defineComponent({
	components: {
		V3Input,
		V3InputTextarea,
		V3InputNumber,
	},
	setup(props, context) {
		const state = reactive({
			inputValue: '测试值123456789',
			inputValue2: '',
			inputValue3: '',
			inputValue4: '',
			inputValue5: '',
			inputValue6: 0,
			inputValue7: 0,
			inputValue8: 0,
		});

		watch(state, () => {
			console.log('state :>> ', state);
		});

		function handleInput(e: Event) {
			console.log('input_e :>> ', e);
		}
		function handleChange(e: Event) {
			console.log('change_e :>> ', (e.target as HTMLInputElement).value);
		}
		function handleFocus(e: Event) {
			console.log('focus_e :>> ', e);
		}
		function handleBlur(e: Event) {
			console.log('blur_e :>> ', e);
		}
		function handleClear() {
			console.log('cleared :>> ', 'cleared');
		}
		function handleKeypress() {
			console.log('2 :>> ', 2);
		}

		return {
			state,
			handleChange,
			handleFocus,
			handleInput,
			handleBlur,
			handleClear,
			handleKeypress,
		};
	},
});
</script>
<style lang="scss" scoped>
.input-container {
	width: 200px;
	h3 {
		margin: 0;
		padding: 0;
	}
}
</style>
