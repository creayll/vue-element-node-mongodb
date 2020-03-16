<template>
	<div class="title" :style="{background: background}">
		{{title}}		
		<router-link v-if='!more' :to='to' class="more">更多 <i class="el-icon-more"></i></router-link>
	</div>
</template>

<script>
	export default {
		props:['title','background','more','to'],	
		data(){
			return {
				tto:this.to
			}
		},
 		mounted(){
			console.log(this.tto)
 		},		
	}	
</script>

<style scoped="scoped" lang="less">
	.title{
		line-height: 35px;
		margin-top: 20px;
		padding: 0 10px;
		color: white;		
		.more{
			float: right;
			font-size: 12px;
			cursor: pointer;
			color: white;
		}
	}
</style>