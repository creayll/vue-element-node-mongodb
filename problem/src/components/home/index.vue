<template>
	<div class="home">
		<div class="block">
			<el-carousel trigger="click" width="100%">
				<el-carousel-item v-for="(item,i) in imglist" :key="i">
					<img :src="https+item.img" width="100%" height="100%">
				</el-carousel-item>
			</el-carousel>
		</div>

		<eltitle title="推存牛人" to='/teachers' :background='color'/>
		<el-row type="flex" class="row-bg something container" justify="space-between">
			<el-col v-for="(item,i) in data1" :key="i" :span="4">
				<div class="box">
					<img :src="https+item.photo"/>
					<div class="right">
						<p>{{item.nick}} ({{item.ip}})</p>
						<p>收徒数 {{item.Apprenticenum}} 人</p>
						<p>解决问题 {{item.Solvenum}} 个</p>
						<p>空闲时间:{{$moment(item.Activity_time1).format('YYYY-MM-DD')}}-{{$moment(item.Activity_time2).format('YYYY-MM-DD')}}</p>
						<p>
							<span v-if="!item.isFollow" @click="follow(item,1)" class="btn" :style="{background: color}">关注</span>
							<span v-if="item.isFollow" @click="follow(item,0)" class="btn" style="background: gray">以关注</span>

							<span v-if="!item.ismyTeachers" class="btn pull-right" :style="{background: color}">未拜师</span>
							<span v-if="item.ismyTeachers" class="btn pull-right" style="background: gray">已拜师</span>

						</p>
					</div>
				</div>
			</el-col>
		</el-row>

		<eltitle title="待解决问题" to='/solve' :background='color' />
		<div class="container">
			<solvelist v-if="data2" :background='color' :data='data2'/>
		</div>		
	</div>
</template>

<script>
	import { mapActions, mapState } from "vuex";
	import eltitle from 'base/title'
	import solvelist from 'base/solvelist'
	export default {
		data() {
			return {
				imglist:null,
				data1:null,
				data2:null
			}
		},
		mounted() {
			var query1={
				page:1,
				limit:4,
				type:'Apprenticenum',
				Lifting:-1
			}
			var p1=new Promise((j,s)=>{
				axios.post(this.https+'home/teachers/Teacherslist',query1)
					.then((res)=>{
						j(res.data.data)											
					})
					.catch(function(error){
						s(error)
					}) 	
			})	
			var query2={
				page:1,
				limit:5			
			}
			var p2=new Promise((j,s)=>{
				axios.post(this.https+'home/problem',query2)
					.then((res)=>{
						j(res.data.data)											
					})
					.catch(function(error){
						s(error)
					}) 	
			})	

			var p3=new Promise((j,s)=>{
				axios.get(this.https+'home/index/bannerread')
					.then((res)=>{
						j(res.data.data)											
					})
					.catch(function(error){
						s(error)
					}) 	
			})				

			Promise.all([p1,p2,p3]).then(([data1,data2,data3])=>{
				this.data1=data1
				this.data2=data2
				this.imglist=data3
				console.log(data1)
			})
		},
		methods: {
			follow(item,type){
				var query={
					fid:item._id,
					type
				}
				axios.post(this.https+'home/personal/addfollow',query)
					.then((res)=>{
						if(res.data.status==1){
							item.isFollow=!item.isFollow
							this.$message({
								message: res.data.message,
								type: 'success'
							});	
						}	
					})
					.catch(function(error){
						console.log(error);
					}) 					
			}
		},
		computed: {
			// 对象中的state 和数组中的localJobTitle 都是和login中的参数一一对应。
			...mapState("themecolor", {
				color: state => state.color
			})
		},
		components: {
			eltitle,
			solvelist
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
	.home {
		background: white;
		padding-bottom: 20px;
		.something {
			font-size: 13px;
			img {
				height: 140px;
				width: 140px;
				border-radius:100%; 
			}
			.el-col {
				padding: 0 10px;
				.box {
					margin-top: 10px;
					line-height: 20px;
					/*border:1px solid gray;*/
					.el-image {
						display: block;
					}
					.right {
						margin-top: 4px;
						.btn {
							margin-top: 1px;
							display: inline-block;
							padding: 0 15px;
							line-height: 26px;
							/*background: #409EFF;*/
							color: white;
							border-radius: 26px;
							cursor: pointer;
							font-size: 12px;
						}
					}
				}
			}
		}
	}
</style>