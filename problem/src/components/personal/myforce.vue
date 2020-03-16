<template>
	<div class="myforce">
		<tab :background='color'></tab>		
		<div v-for="(item,i) in data" class="box" :key="i">
			<div class="top">
				<div class="left">{{item.title}}</div>
				<div class="right">
					<span v-if="item.state==1" class="btn" :style="{background:color}" @click="Upperlower(item,i,0)">上架</span>
					<span v-if="item.state==0||item.state==2" class="btn" :style="{background:color}" @click="Upperlower(item,i,1)">下架</span>
					<span class="btn" :style="{background:color}" @click="deleteitem(item,i)">删除</span>					
				</div>
			</div>
			<div class="detail">{{item.content}}</div>
			<div class="foot">
				<div class="pull-left">{{$moment(data.creatAt).format('YYYY-MM-DD HH:mm')}}</div>
				<div class="pull-right">浏览{{item.read}}</div>
			</div>			
		</div>	
		<el-pagination background :hide-on-single-page='true' layout="prev, pager, next" :total="allnum" :page-size="size" @current-change="handleCurrentChange"></el-pagination>
	</div>
</template>

<script>
	import tab from 'base/tab'	
	import {mapActions, mapState,mapGetters} from "vuex";
	export default {
	  	data () {
		    return {
				activeName: 'first',
				data:null,
				size:0,
				allnum:0,
				state:0  //0上架  １下架   2已被投标　３被解决
		    }
	    }, 	   	
	   	methods:{
			Upperlower(item,i,state){
				var query={
					_id:item._id,
					state:state
				}
				axios.post(this.https+'home/personal/Upperlower',query)
					.then((res)=>{
						console.log(res.data)	
						this.data.splice(i, 1)
						this.$message({
							message: '操作成功',
							type: 'success'
						});
					})
					.catch(function(error){
						console.log(error);
					}) 					
			},
			deleteitem(item,i){
				var query={
					_id:item._id
				}
				axios.post(this.https+'home/personal/deleteitem',query)
					.then((res)=>{
						console.log(res.data)	
						this.data.splice(i, 1)
						this.$message({
							message: '删除成功',
							type: 'success'
						});
					})
					.catch(function(error){
						console.log(error);
					}) 
			},
   			init(page) {
				var query={
					page:page,
					limit:4,
					state:this.state
				}
				axios.post(this.https+'home/personal/myforce',query)
					.then((res)=>{
						console.log(res.data)	
						var data=res.data
						this.data=data.data
						this.allnum=data.allnum
						this.size=data.size
					})
					.catch(function(error){
						console.log(error);
					}) 					   
			}, 
			handleCurrentChange(page){
				this.init(page)	
			},	
   			handleClick(index){
				console.log(index)
				this.state=index
				this.init(1)	
			}					   
	   	},
 		mounted(){
			this.init(1)
 		},	
		computed: {
		  // 对象中的state 和数组中的localJobTitle 都是和login中的参数一一对应。
		  	...mapState("themecolor",{
		   		color: state => state.color
			})
		}, 		
		components: {
			tab
		}
	}	
</script>

<style scoped="scoped" lang="less">
	.myforce{
		.box{
			padding: 15px;
			border-bottom:1px solid #6666; 
			.top{
				overflow: hidden;
				line-height: 30px;	
				.left{
					float: left;
					max-width: 70%;
				}
				.right{
					float: right;
					.btn{						
						display: inline-block;	
						padding: 0 20px;
						color: white;
						border-radius: 30px;
						cursor: pointer;
					}						
				}
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
	}
</style>