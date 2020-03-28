<template>
	<div class="personal">
		<div class="herd" :style="{background:color}">
			<div class="photo">
				<img :src="file"/>
				<input type="file" class="file" @change="updata($event)"/>
			</div>
			<div class="boxs">
				<p class="name">{{$store.state.loginstore.loginstate.nick}}({{$store.state.loginstore.loginstate.ip}})</p>
				<p class="box">
					<span>收徒数:{{$store.state.loginstore.loginstate.Apprenticenum}}个</span>
					<span>解决问题:{{$store.state.loginstore.loginstate.Solvenum}}个</span>
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
				tab:[{path:'/personal',name:'我的资料'},{path:'/personal/myforce',name:'我的发布'},{path:'/personal/mybid',name:'我的投标'},
					{path:'/personal/myteacher',name:'我的师傅'},{path:'/personal/myapprentice',name:'我的徒弟'},
					{path:'/personal/mycollection',name:'我的收藏'},{path:'/personal/myfollow',name:'我的关注'},
					{path:'/personal/myconsumption',name:'消费记录'},{path:'/personal/mypushstorage',name:'我的推存'},
				],
				tabindex:0,
				file:this.https+this.$store.state.loginstore.loginstate.photo
		    }
	    }, 	   	
	   	methods:{
			updata(event){
				this.file = event.target.files; //获取input的图片file值
			    let param = new FormData(); // 创建form对象				
				param.append('imgFile', this.file[0]);//对应后台接收图片名
			    axios.post(this.https+'home/personal/updata',param)
				    .then((res)=>{
						var user=this.$store.state.loginstore.loginstate
						user.photo=res.data.img
						console.log(res.data.img)
						this.$store.dispatch("loginstore/changelogin", user)	
						var src=this.https+res.data.img
						this.file=src
						this.$message({
							message: '恭喜您，更新成功',
							type: 'success'
						});					        
				    })
				    .catch(function(error){
				        console.log(error);
					})
			}
	   	},
 		mounted(){
			 console.log(this.$store.state.loginstore.loginstate)
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
				padding-left: 210px;	
			}			
		}
		.herd{
			padding: 20px 0;
			color: white;
			text-align:center;	
			vertical-align: middle;		
			.photo{
				position: relative;
				display: inline-block;
				.file{
					position: absolute;
					top:0;
					left: 0;
					width: 100%;
					height: 100%;
					border-radius:100%; 
					opacity: 0;
				}
			}
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