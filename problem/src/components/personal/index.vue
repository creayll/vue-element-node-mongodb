<template>
	<div class="personal">
		<div class="herd" :style="{background:color}">
			<img src="../home/img/banner.jpg"/>
			<div class="boxs">
				<p class="name">刘杰(12121)</p>
				<p class="box">
					<span>收徒数:0个</span>
					<span>解决问题:0个</span>
				</p>
			</div>
		</div>		
		<div class="container">
			<div class="pull-left">
				<router-link  v-for='(item,i) in tab' :to='item.path' :key='i' class="item" :class='{active:$route.path==item.path}' :style="{background:$route.path==item.path?color:''}">{{item.name}}</router-link> 			
			</div>
			<div class="content">
				<router-view />
			</div>			
		</div>
	</div>
</template>

<script>
	import { mapState } from "vuex";
	export default {
	  	data () {
		    return {
				tab:[{path:'/personal',name:'我的资料'},{path:'/personal/myteacher',name:'我的师傅'},{path:'/personal/myapprentice',name:'我的徒弟'},
					{path:'/personal/mybid',name:'我的投标'},{path:'/personal/mycollection',name:'我的收藏'},{path:'/personal/myfollow',name:'我的关注'},
					{path:'/personal/myconsumption',name:'消费记录'},{path:'/personal/mypushstorage',name:'我的推存'},
				],
				tabindex:0
		    }
	    }, 	   	
	   	methods:{
// 			eltab(path){
// 				this.$router.push({path:path})
// 			}   			    
	   	},
 		mounted(){

 		},	
		computed: {
			// 对象中的state 和数组中的localJobTitle 都是和login中的参数一一对应。
			...mapState("themecolor", {
				color: state => state.color
			})
		}, 		
		components: {

		}
	}	
</script>

<style scoped="scoped" lang="less">
	.personal{
		height: 100%;
		width: 100%;	
		background: white;
		.container{
			padding: 10px;			
			overflow: hidden;
			.pull-left{
				width: 200px;
				a{
					line-height: 50px;
					text-align: center;
					display: block;
				}
				.active{
					color: white;
				}
			}
			.content{
				/*padding: 10px;*/
				padding-left: 210px;			
			}			
		}
		.herd{
			padding: 20px 0;
			color: white;
			text-align:center;	
			vertical-align: middle;		
			img{
				width: 100px;
				height: 100px;
				border-radius: 100%;
				vertical-align: middle;
			}
			.boxs{
				display: inline-block;
				vertical-align: middle;
				margin-left: 5px;
				.name{					
					font-size: 20px;
					text-align: left;
				}				
				.box{
					margin-top: 10px;
					span{
						margin-right: 10px;
					}
				}
			}
		}
	}
</style>