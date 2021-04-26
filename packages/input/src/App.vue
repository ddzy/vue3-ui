<template>
	<div class="input-demo-container">
		<v3-button
			type="primary"
			icon="v3-icon-search"
			@click="search"
		>搜索</v3-button>

		<v3-input>
			<template #prepend>
				<span>前置元素</span>
			</template>
			<template #suffix>
				<span>后缀元素</span>
			</template>
		</v3-input>
	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import V3Input from './components/Input.vue';

export default defineComponent({
	components: {
		V3Input,
	},
	setup(props, context) {
		function search(e) {
			console.log('e :>> ', e);
		}

		return {
			search,
		}
	},
});
</script>
<style lang="scss" scoped></style>
