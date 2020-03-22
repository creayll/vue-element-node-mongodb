<template>
	<div class="home">
		<div class="block">
			<el-carousel trigger="click" width="100%">
				<el-carousel-item v-for="item in imglist" :key="item">
					<img :src="item" width="100%" height="100%">
				</el-carousel-item>
			</el-carousel>
		</div>

		<eltitle title="推存牛人" to='/teachers' :background='color'/>
		<el-row type="flex" class="row-bg something container" justify="space-between">
			<el-col v-for="(item,i) in data1" :key="i" :span="4">
				<div class="box">
					<el-image :src="https+item.photo">
						<div slot="error" class="image-slot">
							<i class="el-icon-picture-outline"></i>
						</div>
						<div slot="placeholder" class="image-slot">
							加载中<span class="dot">...</span>
						</div>
					</el-image>
					<div class="right">
						<p>{{item.nick}} ({{item.ip}})</p>
						<p>收徒数 {{item.Apprenticenum}} 人</p>
						<p>解决问题 {{item.Solvenum}} 个</p>
						<p>空闲时间:{{item.Activity_time1}}-{{item.Activity_time2}}</p>
						<p>
							<span class="btn" :style="{background: color}">关注</span>
							<span class="btn pull-right" :style="{background: color}">拜师</span>
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
				imglist: [require('./img/banner.jpg'), require('./img/banner2.jpg'), require('./img/banner3.jpg')],
				src: [require('./img/photo.jpg'),
					require('./img/photo.jpg'),
					require('./img/photo.jpg'),
					require('./img/photo.jpg')
				],
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
			
			Promise.all([p1,p2]).then(([data1,data2])=>{
				this.data1=data1
				this.data2=data2
				console.log(data1)
			})
		},
		methods: {

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
				height: 250px;
			}
			.el-col {
				padding: 0 10px;
				.box {
					margin-top: 5px;
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