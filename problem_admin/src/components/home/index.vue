<template>
	<div class="echarts_box">
	  	<!-- <div class="box register">
	    	<IEcharts :option="register" :loading="loading" @ready="onReady" @click="onClick"/>
	  	</div>		 -->
	  	<div class="box access">
	    	<IEcharts :option="access" :loading="loading" @ready="onReady" @click="onClick"/>
	  	</div>	  	
	  	<!-- <div class="box distribution">
	    	<IEcharts :option="distribution" :loading="loading" @ready="onReady" @click="onClick"/>
	  	</div> -->
  </div>
</template>
 
<script type="text/babel">
var areaStyle={color:'white'}
var itemStyle={color: '#409EFF',borderWidth: 12,borderColor: 'rgba(255,102,127,0.6)'}	
import IEcharts from 'vue-echarts-v3/src/full.js';
  export default {
    data: () => ({
		loading: true,    		
      	register: {
	      	title: {
	          	text: '访问量统计',
	          	left:'center'
	      	},
		    tooltip : {
		        trigger: 'item',
		        formatter: "{a} <br/>{b} : {c} ({d}%)"
		    },
			toolbox: {		
			　　 show: true,	
				right:20,
			　　  feature: {		
			　　　　 	saveAsImage: {		
				　　　　 	show:true,		
				　　　　 	excludeComponents :['toolbox'],		
				　　　　 	pixelRatio: 10		
			　　　  	}			
			　　}			
			},	    
		    xAxis: {
		        type: 'category',
		        boundaryGap: false,
		        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
		    },
		    yAxis: {
		        type: 'value',
		    },
		    series: [{
		        data: [820, 932, 901, 934, 1290, 1330, 1320],
		        type: 'line',
		        areaStyle: areaStyle,
	            itemStyle: itemStyle	
		    }]
		},   
      	access: {
	      	title: {
	          	text: '用户注册统计',
	          	left:'center'
	      	},
		    tooltip : {
		        formatter: "{b} <br/> {c} "
		    },
			toolbox: {		
			　　show: true,	
			    right:20,
			　　feature: {		
			　　　　 	saveAsImage: {		
				　　　　 	show:true,		
				　　　　 	excludeComponents :['toolbox'],		
				　　　　 	pixelRatio: 10		
			　　　  	}			
			　　}			
			},	    
		    xAxis: {
		        type: 'category',
		        boundaryGap: false,
		        data: []
		    },
		    yAxis: {
				// max:5
		    },
		    series: [{
		        data: [],
		        type: 'line',
		        areaStyle: areaStyle,
	            itemStyle: itemStyle		        
		    }]
      	},      
      	distribution: {
	      	title: {
	          	text: '用户人员分布统计',
	          	left:'center'
	      	},
		    tooltip : {
		        trigger: 'item',
		        formatter: "{a} <br/>{b} : {c} ({d}%)"
		    },
			toolbox: {		
			　　  show: true,	
				   right:20,
			　　  feature: {		
			　　　　 saveAsImage: {		
				　　　　 show:true,		
				　　　　 excludeComponents :['toolbox'],		
				　　　　 pixelRatio: 10		
			　　　  }			
			　　}			
			},	    
	      	series: [{
	          	name: 'Sales',
	          	type: 'pie',
	          	data:[{value:325, name: '荆州'},
	                {value:510, name: '兖州'},
	                {value:634, name: '益州'},
	                {value:735, name: '西凉'}]
	      	}]
      	}
    }),
	mounted() {	
		axios.get(this.https+'admin/home/userStatistics',this.ruleForm)
			.then((res)=>{
				console.log(res.data)	
				var data=res.data.data
				this.loading = !this.loading;  
				this.access.xAxis.data=data.time
				this.access.series[0].data=data.num
			})
			.catch(function(error){
				console.log(error);
			})		
	},    
    methods: {
      	onReady(instance, ECharts) {
        	console.log(instance, ECharts);
      	},
      	onClick(event, instance, ECharts) {
        	console.log(arguments);
      	}
    },
    components: {
      	IEcharts
    }  
  };
</script>
 
<style scoped lang="less">
	.echarts_box{
		.box{
		    width: 100%;
		    height: 500px;  
		    margin-top: 50px;			
		}
	}
</style>