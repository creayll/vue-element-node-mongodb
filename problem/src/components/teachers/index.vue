<template>
	<div class="teachers">
		<div class="container">
			<ul class="solt">
				<li @click="sort('all',0)">默认</li>
				<li @click="sort('Apprenticenum',Apprenticenumisup)">收徒<i :class="[Apprenticenumisup==1 ? 'down' : 'up']" class="el-icon-bottom"></i></li>
				<li @click="sort('Solvenum',Solvenumisup)">解决问题<i :class="[Solvenumisup==1 ? 'down' : 'up']" class="el-icon-bottom"></i></li>
			</ul>
			<div class="item" v-for="(item,i) in data" :key='i'>
				<div @click="jump(item)">
				<!-- <router-link to='teachers/teacherdetail'> -->
					<div class="top">
						<img :src="https+item.photo"/>
						<span class="name">{{item.nick}}({{item.ip}})</span>
					</div>
					<div class="middle">
						<p class="goodat">
							<span>擅长:<label v-for="(list,i) in item.Be_good_at" :key="i">{{list}}</label></span>
							<span>收徒数: {{item.Apprenticenum}}</span>
							<span>解决问题数: {{item.Solvenum}}</span>
						</p>
						<p class="Serving">曾任职: {{item.work}}</p>
					</div>	
				</div>
				<!-- </router-link> -->
				<div class="bottom">
					<el-radio-group  v-model="item.radio" :inline="true">
						<el-radio v-if="item.oneprice" label="oneprice">1月{{item.oneprice}}元</el-radio>
						<el-radio v-if="item.threeprice" label="threeprice">3个月{{item.threeprice}}</el-radio>
						<el-radio v-if="item.halfyearprice" label="halfyearprice">半年{{item.halfyearprice}}</el-radio>
						<el-radio v-if="item.yearprice" label="yearprice">包年{{item.yearprice}}</el-radio>
					</el-radio-group>
					<div v-if="!(!item.oneprice&&!item.threeprice&&!item.halfyearprice&&!item.yearprice)" class="btn" :style="{background:item.ismyTeachers?'grey':color}" @click="Apprentice(item)">拜师</div>
				</div>				
			</div>
			<el-pagination background :hide-on-single-page='true' layout="prev, pager, next" :total="allnum" :page-size="size" @current-change="handleCurrentChange"></el-pagination>
		</div>
	</div>
</template>

<script>
	import { mapActions, mapState, mapGetters } from "vuex";
	export default {
	  	data () {
		    return {
				radio: 'oneprice',
				data:null,
				size:0,
				allnum:0,	
				Apprenticenumisup:1,
				Solvenumisup:1,
				query:{
					page:1,
					limit:2,
					type:'all',
					Lifting:0
				}		 
		    }
	    }, 	   	
	   	methods:{		   
   			init(query){
				axios.post(this.https+'home/teachers/Teacherslist',query)
					.then((res)=>{
						console.log(res.data)	
						this.data=res.data.data											
					})
					.catch(function(error){
						console.log(error);
					}) 	
			},
			Apprentice(item){
				if(!item.radio){
					this.$message({
						message: '请先选择拜师时长',
						type: 'error'
					});						
					return false;
				}
				if(!item.ismyTeachers){
					var query={
						tid:item._id,
						type:item.radio
					}
					axios.post(this.https+'home/teachers/Apprentice',query)
						.then((res)=>{
							console.log(res.data)	
							if(res.data.status==1){
								item.ismyTeachers=true
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
			sort(type,Lifting){		// 排序
				this.query.page=1
				//有３重情况　　最后一种不用判断　　但是不能用三元表达式	
				if(Lifting==1){
					Lifting=-1
				}else if(Lifting==-1){
					Lifting=1
				}

				if(type=='Apprenticenum'){
					this.Apprenticenumisup=Lifting==1?1:-1
				}else if(type=='Solvenum'){
					this.Solvenumisup=Lifting==1?1:-1
				}

				this.query.type=type
				this.query.Lifting=Lifting
				this.init(this.query)
			},
			handleCurrentChange(page){
				this.query.page=page
				this.init(this.query)	
			},
			jump(item){
				sessionStorage.setItem("teacherdetail",JSON.stringify(item))
				const resolve = this.$router.resolve({path: 'teachers/teacherdetail'})
				window.open(resolve.href,'_blank')				
			}			
	   	},
 		mounted(){
			this.init(this.query)
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
	.teachers{
		padding: 10px 0;
		background: white;
		.solt{
			border-bottom:1px solid gainsboro;
			li{
				display: inline-block;
				padding: 4px 10px;
				cursor: pointer;
				i{
					transition:all .5s;
				}
				.up{
					transform: rotateX(180deg)
				}
				.down{
					transform: rotateX(0deg)
				}
			}
		}		
		.item{			
			vertical-align: middle;
			padding:10px 10px;
			border-bottom:1px solid gainsboro;
			img{
				width: 40px;
				height: 40px;
				border-radius:100%;
				vertical-align: middle;
			}
			a{
				color: #606266;
			}
			a:hover{
				color: blue;
			}
			.middle{
				margin: 5px 0 8px 0;
				.goodat{
					span{
						margin-right: 20px;
						label{
							margin-right: 4px;
						}
					}
				}
			}
			.bottom{
				position: relative;
			}
			.btn{
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
				right: 10px;
				padding: 0 20px;
				line-height: 30px;
				border-radius: 30px;
				color: white;
				float: right;
				vertical-align: middle;
				cursor: pointer;
			}
		}
	}
</style>