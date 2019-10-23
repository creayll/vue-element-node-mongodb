<template>
	<div class="footer" :style="{background: background}">		
			Copyright ©2019 大表哥！
	</div>
</template>

<script>
	export default {
		props:['background'],
		data(){
			return{
				 
			}
		}
	}
</script>

<style scoped="scoped" lang="less">
	.footer{
	    position: absolute;
	    bottom: 0;
	    width: 100%;
		text-align: center;
		line-height: 40px;
		color: white;
	}
</style>