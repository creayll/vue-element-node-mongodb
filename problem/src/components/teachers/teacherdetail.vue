<template>
	<div class="teacherdetail">
		<div class="container">
			<div class="top">
				<img src="../home/img/banner.jpg"/>
				<div class="introduce">
					<p class="name">{{data.nick}}({{data.ip}})</p>
					<div class="detail">{{data.des}}</div>
				</div>			
				<div class="right">					
					<p class="problem">收徒:{{data.Apprenticenum}}</p>
					<p class="problem">解决问题:{{data.Solvenum}}</p>
				</div>
			</div>
			<div class="bottom">
				<div class="item" v-if="data.Be_good_at.length>0">
					<p class="title">擅长</p>
					<p class="lable"><span v-for="(item,i) in data.Be_good_at" :key="i">{{item}}</span></p>
				</div>		
				<div class="item" v-if="data.work">
					<p class="title">曾任职</p>
					<p class="lable">{{data.work}}</p>
				</div>						
				<div class="item">
					<p class="title">拜师礼</p>
					<p class="lable">	
						<span v-if="data.oneprice">包月{{data.oneprice}}元</span>
						<span v-if="data.threeprice">3个月{{data.threeprice}}元</span>
						<span v-if="data.halfyearprice">半年{{data.halfyearprice}}元</span>
						<span v-if="data.yearprice">包年{{data.yearprice}}元</span>
					</p>
				</div>
				<div class="item">
					<p class="title">空闲时间</p>
					<p class="lable">{{$moment(data.Activity＿time1).format('YYYY-MM-DD HH:mm')}} - {{$moment(data.Activity＿time2).format('YYYY-MM-DD HH:mm')}}</p>
				</div>		
				<div class="item">
					<p class="title">联系方式 <span>(拜师后可见)</span></p>
					<p class="lable" v-if="data.ismyTeachers">{{data.qq}}</p>
				</div>			
				<!-- <div class="btn" :style="{background:data.ismyTeachers?'grey':color}" @click="Apprentice(data)">拜师</div> -->
				
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
				data:JSON.parse(sessionStorage.getItem("teacherdetail")),
				// ismyTeachers:false
		    }
	    }, 	   	
	   	methods:{
			Apprentice(data){
				if(!data.ismyTeachers){
					var query={tid:data._id}
					axios.post(this.https+'home/teachers/Apprentice',query)
						.then((res)=>{
							console.log(res.data)	
							if(res.data.status==1){
								this.data.ismyTeachers=true
								sessionStorage.setItem("teacherdetail",JSON.stringify(data))
								this.$message({
									message: '拜师成功',
									type: 'success'
								});	
							}else{
								this.$message({
									message: '拜师失败',
									type: 'error'
								});								
							}						
						})
						.catch(function(error){
							console.log(error);
						}) 	
				}				
			},  			    
	   	},
 		mounted(){
			// var query = {tid:this.data._id}
			// axios.post(this.https+'home/teachers/ismyTeachers',query)
			// 	.then((res)=>{
			// 		console.log(res.data)	
			// 		this.ismyTeachers=res.data.ismyTeachers			
			// 	})
			// 	.catch(function(error){
			// 		console.log(error);
			// 	}) 				
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
					span{
						margin-right: 10px;
					}
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