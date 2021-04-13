<template>
	<canvas id="renderCanvas"
		touch-action="none"></canvas>
</template>

<script lang="ts">
	import { defineComponent, nextTick, onMounted } from "vue";
	import { babylonInit } from "./babylon-main";
	import indexScenes from "@/scenes/indexScenes";

	export default defineComponent({
		name: "App",
		components: {
			// HelloWorld
		},
		setup() {
			onMounted(() => {
				nextTick(() => {
					babylonInit(indexScenes).then((scene) => {
						// do something
					});
				});
			});
			return {};
		},
	});
</script>

<style>
	#renderCanvas {
		width: 100%;
		height: 100%;
		touch-action: none;
	}
</style>