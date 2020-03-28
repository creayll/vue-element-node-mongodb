<template>
	<div class="myconsumption">
		<div class="item" v-for='i in 2' :key="i">			
			<p class="title">本月 <span class="pull-right">收入:32 支出:21&nbsp;&nbsp;&nbsp;合计:43</span></p>			
			<div v-for='i in 2' :key='i'>
				<myconsumptionlist/>
			</div>
		</div>	
	</div>
</template>

<script>
	import personaltitle from 'components/personal/telp/personaltitle'	
	import myconsumptionlist from 'components/personal/telp/myconsumptionlist'	
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
			personaltitle,
			myconsumptionlist
		}
	}	
</script>

<style scoped="scoped" lang="less">
	.myconsumption{
		.item{
			margin-bottom:15px;
		}
	}
</style>