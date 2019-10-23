<template>
	<div class="mybid">
		<div v-for="i in 5" class="box">
			<solvedetail :color='color'/>
		</div>		
	</div>
</template>

<script>
	import solvedetail from 'base/solvedetail'	
	import {mapActions, mapState,mapGetters} from "vuex";
	export default {
	  	data () {
		    return {

		    }
	    }, 	   	
	   	methods:{
   			    
	   	},
 		mounted(){
			
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
	.mybid{
		.box{
			margin-bottom: 15px;
		}
	}
</style>