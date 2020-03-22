<template>
	<div class="bid">
		<div class="table" v-for="(item,i) in bid" :key="i">
			<div class="table-cell">
				<img :src="https+item.uid.photo"/>
				<div class="box">
					<p class="name">{{item.uid.nick}} ({{item.uid.ip}})</p>
					<p class="price">报价:{{item.price}} 元</p>
				</div>
			</div>
			<!-- <div class="table-cell">
				<div v-if="data.user_id._id==user._id" class="btn" :style="{background:color}">同意</div>
			</div>			 -->
		</div>		
		<el-pagination background :hide-on-single-page='true' layout="prev, pager, next" :total="allnum" :page-size="size" @current-change="handleCurrentChange"></el-pagination>
	</div>
</template>

<script>
	import {mapActions, mapState,mapGetters} from "vuex";
	export default {
	  	data () {
		    return {
				data:JSON.parse(sessionStorage.getItem('solvedetail')),
				user:this.$store.state.loginstore.loginstate,
				bid:null,
				size:0,
				allnum:0					
		    }
	    }, 	   	
	   	methods:{
   			init(page){
				var query={
					limit:8,
					page:page,
					fid:this.data._id
				}
				axios.post(this.https+'home/problem/readbid',query)
					.then((res)=>{
						console.log(res.data)	
						this.bid=res.data.data	
						this.size=res.data.size
						this.allnum=res.data.allnum						
					})
					.catch(function(error){
						console.log(error);
					}) 	
			},	
			handleCurrentChange(page){
				this.init(page)	
			},				
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

		}
	}	
</script>

<style scoped="scoped" lang="less">
	.bid{
		margin-top: 5px;
		.table{
			display:table;
			padding-bottom: 5px;
			margin: 10px 0;
			width:100%;
			border-bottom:1px solid gainsboro;
			.table-cell{
				display: table-cell;
				vertical-align: middle;
				img{
					width: 70px;
					height: 70px;
					vertical-align: middle;
				}
				.box{
					display: inline-block;
					vertical-align: middle;
					line-height: 24px;
					padding: 0 2px;
				}
				.btn{
					float: right;
					line-height: 30px;
					border-radius: 30px;
					padding: 0 20px;
					color: white;
					cursor: pointer;
				}
			}
		}
	}
</style>