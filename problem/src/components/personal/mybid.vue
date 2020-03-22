<template>
	<div class="mybid">	
		<tab :background='color' :tab='tab'></tab>	
		<div v-for="(item,i) in data" class="item" :key="i">
			<div class="table">
				<div class="table-cell">
					<img :src="https+item.uid.photo"/>
					<span class="name">{{item.uid.nick}} ({{item.uid.ip}})</span>
				</div>	
				<div class="table-cell">
					<span @click.stop="Bidx(item,i)" :style="{background:color}" class="btn"><i class="el-icon-s-flag"></i>取消投标</span>
				</div>
			</div>
			<div class="box">		
				<p class="title">{{item.fid.title}}</p>
				<div class="detail">{{item.fid.content}}</div>
				<div class="foot">
					<div class="pull-left">{{$moment(item.fid.creatAt).format('YYYY-MM-DD HH:mm')}}</div>
					<div class="pull-right">浏览{{item.fid.read}}</div>
				</div>
			</div>
		</div>	
		<el-pagination background :hide-on-single-page='true' layout="prev, pager, next" :total="allnum" :page-size="size" @current-change="handleCurrentChange"></el-pagination>
	</div>
</template>

<script>
	import tab from 'base/tab'	
	import solvedetail from 'base/solvedetail'	
	import {mapActions, mapState,mapGetters} from "vuex";
	export default {
	  	data () {
		    return {
				state:0,
				data:null,
				size:0,
				allnum:0,
				tab:['中标','待中标','未中标']				
		    }
	    }, 	   	
	   	methods:{
			init(page){
				var query={
					page:page,
					limit:4
				}
				axios.post(this.https+'home/personal/mybid',query)
					.then((res)=>{
						console.log(res)
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
			},				
			Bidx(item,i){
				var query={fid:item.fid._id,type:0}
				axios.post(this.https+'home/problem/Bidx',query)
					.then((res)=>{
						console.log(res.data)	
						if(res.data.status==1){
							this.data.splice(i,1)
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
			solvedetail,
			tab
		}
	}	
</script>

<style scoped="scoped" lang="less">
	.mybid{		
		.item{
			margin-bottom: 15px;
			padding-bottom: 10px;
			border-bottom: 1px solid #6666;
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
						float: right;
						color: white;
						border-radius: 30px;
						cursor: pointer;
						margin-left: 5px;
					}					
				}
			}				
			.foot{
				overflow: hidden;
				font-size: 13px;
				color: gray;
			}			
		}
	}
</style>