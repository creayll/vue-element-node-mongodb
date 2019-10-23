<template>
	<div class="solvelist">
		<ul class="content">
			<li :style="{borderColor:background}" v-for="i in 6">
				<router-link to="/solve/solvedetail">
					<span class="top" :style="{color: background}">[置顶]</span>
					<span class="title">标题</span>
					<span class="price">奖励金4元</span>
					<span class="read">阅读人数3人</span>
				</router-link>	
				<p class="btnbox">
					<span class="btn" :style="{background: background}"><i class="el-icon-star-on"></i>收藏</span>
					<span class="btn" :style="{background: background}"><i class="el-icon-s-flag"></i>投标</span>
				</p>				
			</li>		
		</ul>		
	</div>
</template>

<script>
	export default {
		props:['background'],
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
	.solvelist{			
		a{
			color: grey;
		}
		li{			
			cursor: pointer;
		}
		.content{
			li{
				line-height: 26px;				
				padding: 8px 10px;
				border-bottom: 1px solid;
			}
			span{
				display: inline-block;	
				vertical-align: middle;
			}
			.top{

			}
			.title{
				max-width: 300px;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;						
			}
			.btnbox{
				float: right;
				.btn{
					color: white;
					padding: 0 12px;
			    	line-height: 26px;		
			    	display: inline-block;		
			    	border-radius: 26px;
			    	font-size: 12px;
			    	margin-left: 20px;
				}				
			}
		}
	}
</style>