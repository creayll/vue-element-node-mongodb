<template>
	<div class="solvedetail">
		<div class="table">
			<div class="table-cell">
				<img :src="https+item.user_id.photo"/>
				<span class="name">{{item.user_id.nick}} ({{item.user_id.ip}})</span>
			</div>
			<div class="table-cell">
				<span v-if="item.user_id._id==user._id" class="btn" :style="{background:color}">终止任务</span>
				<span v-if="item.user_id._id!=user._id&&!item.isBid" @click.stop="open(item,1)" class="btn" :style="{background:color}">投标</span>
				<span v-if="item.user_id._id!=user._id&&item.isBid" @click.stop="open(item,0)" :style="{background:color}" class="btn"><i class="el-icon-s-flag"></i>取消投标</span>
				<span v-if="item.user_id._id!=user._id" class="btn"  :style="{background: item.isCollection?'grey':color}">收藏</span>
			</div>
		</div>
		<div class="content">
			<p class="title">{{item.title}}</p>
			<div class="detail">{{item.content}}</div>
			<div class="foot">
				<div class="pull-left">{{$moment(item.creatAt).format('YYYY-MM-DD HH:mm')}}</div>
				<div class="pull-right">浏览{{item.read}}</div>
			</div>
		</div>
	</div>	
</template>

<script>
	export default {
		props:['color'],
	  	data () {
		    return {
				item:JSON.parse(sessionStorage.getItem('solvedetail')),
				user:this.$store.state.loginstore.loginstate
		    }
	    }, 	   	
	   	methods:{
   			Collectionx(item){
				var user=this.$store.state.loginstore.loginstate
				if(item.user_id._id==user._id){
					this.$message({
						message: '不能收藏自己的',
						type: 'error'
					});	
					return false
				}				   
				var query={fid:item._id}
				if(item.isCollection){
					query.type=0
				}else{
					query.type=1
				}
				axios.post(this.https+'home/problem/Collectionx',query)
					.then((res)=>{
						console.log(res.data)	
						if(res.data.status==1){
							item.isCollection=!item.isCollection
							sessionStorage.setItem('solvedetail',JSON.stringify(item))
							this.$message({
								message: res.data.message,
								type: 'success'
							});	
						}
					})
					.catch(function(error){
						console.log(error);
					}) 	
			},			   
			Bidx(item,type){
				var user=this.$store.state.loginstore.loginstate
				if(item.user_id._id==user._id){
					this.$message({
						message: '不能投标自己的',
						type: 'error'
					});	
					return false
				}
				var query={fid:item._id,price:item.price,type}
				axios.post(this.https+'home/problem/Bidx',query)
					.then((res)=>{
						console.log(res.data)	
						if(res.data.status==1){
							item.isBid=!item.isBid
							sessionStorage.setItem('solvedetail',JSON.stringify(item))
							this.$message({
								message: res.data.message,
								type: 'success'
							});	
							this.$router.go(0);
						}
					})
					.catch(function(error){
						console.log(error);
					}) 	
			},
			open(item,type){
				if(type==0){
					this.Bidx(item,type)
				}else{
					this.$prompt('', '投标', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						inputValue:item.price,
						inputPattern: /^[0-9]*$/,
						inputErrorMessage: '清输入纯数字'
					}).then(({ value }) => {
						item.price=value
						this.Bidx(item,type)
					}).catch(() => {
						this.$message({
							type: 'info',
							message: '取消输入'
						});       
					});
				}
			},  			    
	   	},
 		mounted(){
			 console.log(this.item)
			//  console.log(this.user)
 		},	
		components: {

		}
	}	
</script>

<style scoped="scoped" lang="less">
	.solvedetail{			
		padding: 0 10px;
		padding-bottom: 4px;
		border-bottom: 1px solid gainsboro;
		.content{
			.title{
				margin-top: 2px;
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
	}	
</style>