<template>
	<div class="contact">
		联系我们：{{data.email}}
	</div>
</template>

<script>
	export default {
		props:['data']
	}	
</script>

<style scoped="scoped" lang="less">
	.contact{
		text-align: center;
		line-height: 200px;
		font-size: 20px;
	}
</style>