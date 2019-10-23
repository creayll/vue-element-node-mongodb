<template>
	<div class="message">
		<div class="item" v-for="i in 5">
			<div class="top">
				<img src="../home/img/banner.jpg"/>
				<span class="name">liujie(12123)</span>
				<i class="el-icon-close"></i>
			</div>
			<div class="content">
				辅导费发的发的发生分数是多少会很高很高好好干哈和哈哈哈规划
				辅导费发的发的发生分数是多少会很高很高好好干哈和哈哈哈规划
				辅导费发的发的发生分数是多少会很高很高好好干哈和哈哈哈规划
				辅导费发的发的发生分数是多少会很高很高好好干哈和哈哈哈规划
				辅导费发的发的发生分数是多少会很高很高好好干哈和哈哈哈规划
			</div>
		</div>
		<el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>			
	</div>
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
	.message{
		.item{
		    padding-bottom: 5px;
		    margin: 10px 0;
		    width: 100%;
		    border-bottom: 1px solid gainsboro;		
		    .content{
		    	line-height: 22px;
		    	text-indent: 2em;
		    }	
			.top{
				vertical-align: middle;
				position: relative;
				img{
					vertical-align: middle;
					width: 40px;
					height: 40px;
					border-radius: 100%;					
				}
				span{
					vertical-align: middle;
				}
				i{
					position: absolute;
					top: 50%;
					transform: translateY(-50%);
					right: 10px;
					cursor: pointer;
					color: rgba(0,0,0,0.5);
				}
				i:hover{
					color: black;
				}
			}
		}
	}
</style>