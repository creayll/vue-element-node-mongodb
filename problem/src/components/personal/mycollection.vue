<template>
	<div class="mycollection">
		<div v-for="i in 5" class="box" :key="i">
			<!-- <solvedetail :color='color'/> -->
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
		.box{
			margin-bottom: 15px;
		}
	}
</style>