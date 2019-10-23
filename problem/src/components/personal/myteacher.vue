<template>
	<div class="myteacher">
		<div class="item">
			<personaltitle title='当前师傅'/>
			<myteacherlist/>			
		</div>
		<div class="item">
			<personaltitle title='过往师傅'/>
			<myteacherlist  v-for='i in 5' :key='i'/>
		</div>		
	</div>
</template>

<script>
	import personaltitle from 'components/personal/telp/personaltitle'	
	import myteacherlist from 'components/personal/telp/myteacherlist'	
	export default {
	  	data () {
		    return {

		    }
	    }, 	   	
	   	methods:{
   			    
	   	},
 		mounted(){
			
 		},	
		components: {
			myteacherlist,
			personaltitle
		}
	}	
</script>

<style scoped="scoped" lang="less">
	
</style>