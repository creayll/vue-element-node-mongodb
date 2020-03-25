<template>
	<div class="myapprentice">
		<tab :background='color' :tab='tab'></tab>		

		<div v-for='(item,i) in data' :key="i">
			<myteacherlist :item='item' :type='1' :index='i'/>
		</div>	
		<el-pagination background :hide-on-single-page='true' layout="prev, pager, next" :total="allnum" :page-size="size" @current-change="handleCurrentChange"></el-pagination>
	</div>
</template>

<script>
	import myteacherlist from 'components/personal/telp/myteacherlist'	
	import tab from 'base/tab'	
	import {mapActions, mapState,mapGetters} from "vuex";

	export default {
	  	data () {
		    return {
				tab:['我的徒弟','待同意','拒绝'],
				data:null,
				allnum:0,
				size:0,
				state:0 //0同意，１待同意　２拒绝
		    }
	    }, 	   	
	   	methods:{
   			init(page) {
				var query={
					page:page,
					limit:4,
					state:this.state
				}
				axios.post(this.https+'home/personal/myapprentice',query)
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
			},
			deletelist(index){
				this.data.splice(index,1)
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
			myteacherlist,
			tab
		}
	}	
</script>

<style scoped="scoped" lang="less">
	
</style>