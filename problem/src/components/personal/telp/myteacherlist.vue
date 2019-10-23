<template>
	<router-link to='/teachers/teacherdetail' class="myteacherlist">
		<img class="photo" src="../../home/img/banner2.jpg"/>
		<div class="right">
			<p>擅长:html</p>
			<p>曾任职:阿里</p>
			<p>联系方式:2121212</p>
			<p>空闲时间:09:21-08:19</p>
		</div>
	</router-link>		
</template>

<script>
	export default {
	  	data () {
		    return {

		    }
	    }, 	   	
	   	methods:{
   			    
	   	},
 		mounted(){
			
 		},	
		components: {

		}
	}	
</script>

<style scoped="scoped" lang="less">
	.myteacherlist{
		vertical-align: middle;	
		color: #2c3e50;	
		border: 1px solid gainsboro;
		margin-bottom: 10px;
		display: block;
		border-radius: 2px;
		overflow: hidden;
		.photo{
			width: 100px;
			height: 100px;
			vertical-align: middle;
		}
		.right{
			display: inline-block;
			padding-left: 5px;
			vertical-align: middle;
			p{
				margin-bottom: 2px;
			}
		}
	}
</style>