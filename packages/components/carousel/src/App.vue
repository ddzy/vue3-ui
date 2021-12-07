<template>
	<div class="demo-container">
		<v3-row>
			<v3-col :span="12">
				<h3>基本的轮播图：</h3>
			</v3-col>
			<v3-col>
				<v3-carousel>
					<v3-carousel-item></v3-carousel-item>
				</v3-carousel>
			</v3-col>
		</v3-row>
	</div>
</template>
<script lang="ts">
import { defineComponent, h, onMounted, reactive, watch } from 'vue';

export default defineComponent({
	setup(props, context) {
		const state = reactive({});

		return {
			state,
		};
	},
	methods: {},
});
</script>
<style lang="scss" scoped></style>
