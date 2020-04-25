<template>
	<div class="mycollection">
		<div class="contentbox">
			<div v-for="(item,i) in data" class="item" :key="i" @click="jump(item)">
				<div class="table">
					<div class="table-cell">
						<img :src="https+item.uid.photo"/>
						<span class="name">{{item.uid.nick}} ({{item.uid.ip}})</span>
					</div>	
					<div class="table-cell">
						<span v-if="item.state==1" @click.stop="Bidx(item,i)" :style="{background:color}" class="btn"><i class="el-icon-s-flag"></i>取消投标</span>
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
		</div>
		<el-pagination background :hide-on-single-page='true' layout="prev, pager, next" :total="allnum" :page-size="size" @current-change="handleCurrentChange"></el-pagination>
	</div>
</template>

<script>
	import solvedetail from 'base/solvedetail'	
	import {mapActions, mapState,mapGetters} from "vuex";
	export default {
	  	data () {
		    return {
				data:null,
				size:0,
				allnum:0,
		    }
	    }, 	   	
	   	methods:{
   			init(page) {
				var query={
					page:page,
					limit:4
				}
				axios.post(this.https+'home/personal/mycollection',query)
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
			jump(item){
				sessionStorage.setItem("solvedetail",JSON.stringify(item.fid))
				// const resolve = this.$router.resolve({path: '/solve/solvedetail'})
				// window.open(resolve.href,'_blank')	
				this.$router.push({'path':'/solve/solvedetail'})
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
			solvedetail
		}
	}	
</script>

<style scoped="scoped" lang="less">
	.mycollection{		
		.contentbox{
			background: rgba(0,0,0,0.03);		
			border-radius: 10px;
			overflow: hidden;				
		}		
		.item{
			background: white;		
			padding: 10px;
			margin: 10px;
			border-radius: 10px;	
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