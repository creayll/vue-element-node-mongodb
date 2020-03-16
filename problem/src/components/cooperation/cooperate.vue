<template>
	<div class="cooperate">
		商务合作：{{data.phone}}
	</div>
</template>

<script>
	export default {
		props:['data'],
	}	
</script>

<style scoped="scoped" lang="less">
	.cooperate{
		text-align: center;
		line-height: 200px;
		font-size: 20px;		
	}	
</style>