<template>
	<div class="solvedetail">
		<div class="table">
			<div class="table-cell">
				<img src="../components/home/img/banner.jpg"/>
				<span class="name">刘杰 (21231)</span>
			</div>
			<div class="table-cell">
				<span class="btn" :style="{background:color}">终止任务</span>
				<span class="btn" :style="{background:color}">终止投标</span>
				<span class="btn" :style="{background:color}">投标</span>
			</div>
		</div>
		<div class="content">
			<p class="title">vue-cli全局安装每次都需要吗？</p>
			<div class="detail">
				老师，全局的vue-cli每次创建新项目都需要全局安装吗？还是第一次安装了之后，
				以后在用init创建新项目的时候就不需要再安装vue-cli了呢？
				以后在用init创建新项目的时候就不需要再安装vue-cli了呢？
			</div>
			<div class="foot">
				<div class="pull-left">2019-09-09</div>
				<div class="pull-right">浏览3231</div>
			</div>
		</div>
	</div>	
</template>

<script>
	export default {
		props:['color'],
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
	.solvedetail{			
		padding: 0 10px;
		padding-bottom: 4px;
		border-bottom: 1px solid gainsboro;
		.content{
			.title{
				margin-top: 2px;
			}
			.detail{
				margin: 10px 0;
				line-height: 22px;
			}
			.foot{
				overflow: hidden;
				font-size: 13px;
				color: gray;
			}
		}
		.table{
			display: table;
			width: 100%;
			.table-cell{
				display: table-cell;
				vertical-align: middle;					
				img{
					width: 40px;
					height: 40px;
					border-radius: 100%;
					vertical-align: middle;	
				}
				.name{
					vertical-align: middle;	
				}
				.btn{
					line-height: 30px;		
					padding: 0 20px;
					display: inline-block;
					color: white;
					border-radius: 30px;
					cursor: pointer;
					float: right;						
				}					
			}
		}
	}	
</style>