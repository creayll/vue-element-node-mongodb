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
					<span @click='Collectionx(item)' class="btn" :style="{background: item.isCollection?'grey':background}"><i class="el-icon-star-on"></i>收藏</span>
					<span @click='Bidx(item)' class="btn" :style="{background: item.isBid?'grey':background}"><i class="el-icon-s-flag"></i>投标</span>
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

		    }
	    }, 	   	
	   	methods:{
   			Collectionx(item){
				var query={fid:item._id}
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
			Bidx(item){
				var query={fid:item._id}
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
			jump(item){
				sessionStorage.setItem("solvedetail",JSON.stringify(item))
				const resolve = this.$router.resolve({path: '/solve/solvedetail'})
				window.open(resolve.href,'_blank')				
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
			.top{

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