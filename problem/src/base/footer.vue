<template>
	<div class="footer" :style="{background: background}">		
			<a href="http://www.beian.miit.gov.cn/" target="_blank" v-if="data">{{data.copyright}}</a>
	</div>
</template>

<script>
	export default {
		props:['background'],
		data(){
			return{
				 data:null
			}
		},
		mounted(){
			axios.get(this.https+'home/index/copyrightread')
				.then((res)=>{
					console.log(res.data)
					this.data=res.data.data								
				})
				.catch(function(error){
					s(error)
				}) 	
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
		a{
			color: white;
		}
	}
</style>