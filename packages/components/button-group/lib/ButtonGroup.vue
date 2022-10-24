<template>
	<div class="v3-button-group">
		<slot></slot>
	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'V3ButtonGroup',
	setup() {},
});
</script>
<style lang="scss">
@import './ButtonGroup.scss';
</style>
