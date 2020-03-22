<template>
	<div class="solvelist">
		<ul class="content">
			<li @click="jump(item)" :style="{borderColor:background}" v-for="(item,i) in data" :key="i">
				<!-- <router-link to="/solve/solvedetail"> -->
					<span class="top" :style="{color: background}" v-if="item.istimeplacement">[置顶]</span>
					<span class="title">{{item.title}}</span>
					<span class="price">奖励金{{item.price}}元</span>
					<span class="read">阅读人数{{item.read}}人</span>
				<!-- </router-link>	 -->
				<p class="btnbox">
					<span v-if='!item.isBid' @click.stop="open(item,1)" :style="{background: background}" class="btn"><i class="el-icon-s-flag"></i>投标</span>
					<span v-if="item.isBid" @click.stop="open(item,0)" :style="{background: background}" class="btn"><i class="el-icon-s-flag"></i>取消投标</span>
					<span @click.stop='Collectionx(item)' class="btn" :style="{background: item.isCollection?'grey':background}"><i class="el-icon-star-on"></i>收藏</span>
				</p>				
			</li>		
		</ul>		
	</div>
</template>

<script>
	export default {
		props:['background','data'],
	  	data () {
		    return {
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
			jump(item){
				sessionStorage.setItem("solvedetail",JSON.stringify(item))
				// const resolve = this.$router.resolve({path: '/solve/solvedetail'})
				// window.open(resolve.href,'_blank')	
				this.$router.push({'path':'/solve/solvedetail'})
			}				 
	   	},
 		mounted(){
			console.log(this.data)
 		},	
		components: {

		}
	}	
</script>

<style scoped="scoped" lang="less">
	.solvelist{			
		a{
			color: grey;
		}
		li{			
			cursor: pointer;
		}
		.content{
			li{
				line-height: 26px;				
				padding: 8px 10px;
				border-bottom: 1px solid;
			}
			span{
				display: inline-block;	
				vertical-align: middle;
			}
			.title{
				max-width: 300px;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;						
			}
			.btnbox{
				float: right;
				.btn{
					color: white;
					padding: 0 12px;
			    	line-height: 26px;		
			    	display: inline-block;		
			    	border-radius: 26px;
			    	font-size: 12px;
			    	margin-left: 20px;
				}				
			}
		}
	}
</style>