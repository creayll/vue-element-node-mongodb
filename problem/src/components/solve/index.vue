<template>
	<div class="solve">
		<table class="screen container">
			<tr v-for="(item,i) in screen" :key='i'>
				<th :class="{'active':trindex==-i&&tdindex==222}" @click="trindex=-i;tdindex=222" :style="{background:trindex==-i&&tdindex==222?color:''}">{{item.name}}</th>
				<td>
					<ul class="rightbox">						
						<li v-for="(list,j) in item.list" :class="{'active':tdindex==j&&trindex==i}" @click="tdindex=j;trindex=i" :style="{background:tdindex==j&&trindex==i?color:''}">{{list.title}}</li>						
					</ul>						
				</td>
			</tr>				
		</table>	
		
		<eltitle title="待解决问题" :background='color' :more='true'/>	
		
		<div class="content">			
			<div class="container">
				<ul class="solt">
					<li>全部</li>
					<li>时间<i class="el-icon-bottom"></i></li>
					<li>奖励金<i class="el-icon-bottom"></i></li>
				</ul>
				<solvelist :background='color' />			
				<el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>			
			</div>
		</div>
	</div>
</template>

<script>
	import {mapActions, mapState,mapGetters} from "vuex";
	import solvelist from 'base/solvelist'
	import eltitle from 'base/title'
	export default {
	  	data () {
		    return {
		    	trindex:222,
		    	tdindex:222,
				screen:[{
					'name':'前端',
					'list':[{id:'1',title:'html'},{id:'2',title:'css'},{id:'3',title:'js'},{id:'3',title:'canvas'}]
				},{
					'name':'后台',
					'list':[{id:'4',title:'php'},{id:'5',title:'node'},{id:'6',title:'java'}]
				},{
					'name':'后台',
					'list':[{id:'4',title:'php'},{id:'5',title:'node'},{id:'6',title:'java'}]
				}]
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
			eltitle,
			solvelist
		}
	}	
</script>

<style scoped="scoped" lang="less">
	.solve{
		padding-top: 20px;
		background: white;		
		padding-bottom: 20px;
		.content{
			margin-top:8px;	
			.solt{
				li{
					display: inline-block;
					padding: 4px 10px;
					cursor: pointer;
				}
			}
		}
		.screen{
			border: 1px solid gainsboro;
			line-height: 30px;
			border-collapse:collapse;			
			td,th{
				border: 1px solid gainsboro;
			}
			th{
				text-align: center;
				font-weight:500;
				width: 90px;
				background: #f5f5f5;
				cursor: pointer;
			}
			.active{
                color: white;   
			}			
			.rightbox{
				display: inline-block;
				li{
					min-width: 70px;
					display: inline-block;	
					cursor: pointer;				
					text-align: center;
				}
			}
		}
	}
</style>

