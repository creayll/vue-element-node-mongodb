<template>
	<div class="myfollow">
		<div v-for='i in 5'>
			<myteacherlist/>
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