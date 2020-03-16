<template>
	<div class="about" v-html="data.introduction"></div>
</template>

<script>
	export default {
		props:['data']
	}	
</script>

<style>
	img{
		max-width: 100%;
	}	
</style>