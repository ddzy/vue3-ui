<template>
	<div class="input-demo-container">
		<div class="input-container">
			<v3-input>
				<template #prepend>
					<span>https://</span>
				</template>
				<!-- <template #prefix>
					<span>前缀元素</span>
				</template> -->
				<!-- <template #suffix>
					<span>后缀元素</span>
				</template> -->
				<template #append>
					<i class="v3-icon v3-icon-search"></i>
				</template>
			</v3-input>
		</div>
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
		};
	},
});
</script>
<style lang="scss" scoped>
.input-container {
	width: 500px;
}
</style>
