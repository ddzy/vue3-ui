<template>
	<div class="input-demo-container">
		<div class="input-container">
			<v3-input
				v-model="state.inputValue"
				:type="'password'"
				:suffixIcon="'v3-icon-editor'"
				:readonly="false"
				:disabled="false"
				:clearable="true"
				:showWordLimit="true"
				:maxlength="1000"
				:placeholder="'请填写用户名'"
				:showPassword="true"
			>
				<!-- <template #prepend>
					<span>https://</span>
				</template> -->
				<!-- <template #prefix>
					<span>前缀元素</span>
				</template> -->
				<!-- <template #suffix>
					<span>后缀元素</span>
				</template> -->
				<!-- <template #append>
					<i class="v3-icon v3-icon-editor"></i>
				</template> -->
			</v3-input>
		</div>
		<div class="textarea-container">
			<v3-input-textarea></v3-input-textarea>
		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';
import V3Input from './components/Input.vue';
import V3InputTextarea from './components/InputTextarea.vue';

export default defineComponent({
	components: {
		V3Input,
		V3InputTextarea,
	},
	setup(props, context) {
		const state = reactive({
			inputValue: '',
		});

		function handleInput(e) {
			console.log('input_e :>> ', e);
		}
		function handleChange(e: Event) {
			console.log('change_e :>> ', (e.target as HTMLInputElement).value);
		}
		function handleFocus(e) {
			console.log('focus_e :>> ', e);
		}
		function handleBlur(e) {
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
	width: 300px;
}
</style>
