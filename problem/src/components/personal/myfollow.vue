<template>
	<div class="myfollow">
		<div v-for='(item,i) in data' :key="i">
			<myteacherlist :item='item' :type='1' :index='i'/>
		</div>		
		<el-pagination background :hide-on-single-page='true' layout="prev, pager, next" :total="allnum" :page-size="size" @current-change="handleCurrentChange"></el-pagination>
	</div>
</template>

<script>
	import personaltitle from 'components/personal/telp/personaltitle'	
	import myteacherlist from 'components/personal/telp/myteacherlist'	
	export default {
	  	data () {
		    return {
				data:null,
				size:0,
				allnum:0
		    }
	    }, 	   	
	   	methods:{
   			init(page) {
				var query={
					page:page,
					limit:4
				}
				axios.post(this.https+'home/personal/readfollow',query)
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
		components: {
			myteacherlist,
			personaltitle
		}
	}	
</script>

<style scoped="scoped" lang="less">
	
</style>