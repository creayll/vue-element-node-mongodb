<template>
	<div class="myconsumptionlist">
		<p class="title">付款给默默</p>
		<p class="type">拜师或解决问题</p>
		<p class="time">08-02 12:21</p>
		<p class="price">31.21元</p>
	</div>
</template>

<script>
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

		}
	}	
</script>

<style scoped="scoped" lang="less">
	.myconsumptionlist{				
		position: relative;
		margin-bottom: 10px;
		border-bottom: 1px solid gainsboro;
		padding-bottom: 5px;				
		.time{
			color: grey;
		}
		.price{
			position: absolute;
		    top: 50%;			
			transform: translateY(-50%);
			right: 10px;
		}
	}
</style>