<template>
	<div class="teacherdetail">
		<div class="container">
			<div class="top">
				<img src="../home/img/banner.jpg"/>
				<div class="introduce">
					<p class="name">刘杰</p>
					<div class="detail">
						和风格风格风格风格广告费高给份苟富贵过分过分过分给份苟富贵给份过分过分过分 苟富贵分隔符
						和风格风格风格风格广告费高给份苟富贵过分过分过分给份苟富贵给份过分过分过分
						和风格风格风格风格广告费高给份苟富贵过分过分过分给份苟富贵给份过分过分过分
						和风格风格风格风格广告费高给份苟富贵过分过分过分给份苟富贵给份过分过分过分
						和风格风格风格风格
					</div>
				</div>			
				<div class="right">
					<p class="problem">解决问题:21</p>
					<p class="problem">收徒:21</p>
				</div>
			</div>
			<div class="bottom">
				<div class="item">
					<p class="title">擅长</p>
					<p class="lable">html,css</p>
				</div>		
				<div class="item">
					<p class="title">曾任职</p>
					<p class="lable">阿里</p>
				</div>						
				<div class="item">
					<p class="title">拜师礼</p>
					<p class="lable">包月100元&nbsp;&nbsp;&nbsp;3个月250&nbsp;&nbsp;&nbsp;半年420&nbsp;&nbsp;&nbsp;包年800</p>
				</div>
				<div class="item">
					<p class="title">空闲时间</p>
					<p class="lable">08:00 - 09:00</p>
				</div>		
				<div class="item">
					<p class="title">联系方式 <span>(拜师后可见)</span></p>
					<p class="lable">2227171174</p>
				</div>			
				<div class="btn" :style="{background: color}">拜师</div>
				
				<div class="messgese">
					<p class="title">给他发消息</p>
					<img src="./img/messgese.png">
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapActions, mapState, mapGetters } from "vuex";
	export default {
	  	data () {
		    return {

		    }
	    }, 	   	
	   	methods:{
   			    
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
	.teacherdetail{
		background: white;
		.bottom{					
			padding: 10px;	
			padding-top: 20px;	
			position: relative;
			.item{
				margin-bottom: 20px;
				.title{
					font-size: 16px;
					color: black;					
				}
				.lable{
					margin-top: 5px;
				}
				span{
					font-size: 12px;
				}
			}
			.messgese{
				position: absolute;
				right: 10px;
				top: 50%;
				transform: translateY(-50%);
				padding: 10px;
				cursor: pointer;
				border: 1px solid gainsboro;
				text-align: center;
				border-radius: 10px;
				font-size: 12px;
				img{
					width: 50px;
					margin-top: 5px;
				}
			}
			.messgese:hover{
				background: ghostwhite;
			}
			.btn{
				line-height: 35px;
				width: 100px;
				margin: 0 auto;
				color: white;
				text-align: center;
				border-radius: 10px;
				cursor: pointer;
			}			
		}
		.top{			
			position: relative;		
			border-bottom: 1px solid gainsboro;	
			overflow: hidden;
			padding: 10px;	
			padding-top: 20px;					
			img{
				height: 100px;
				width: 100px;
				float: left;
			}
			.introduce{				
				padding-left: 110px;
				padding-right: 140px;	
				.name{
					font-size: 16px;
				}	
				.detail{
					line-height: 20px;
					margin-top: 10px;
				}	
			}
			.right{
				position: absolute;
				right: 10px;
				top: 40px;
				/*transform: translateY(-50%);*/
				padding: 10px 20px;
				border: 1px solid gainsboro;
			}
		}
	}
</style>