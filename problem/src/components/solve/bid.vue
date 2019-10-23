<template>
	<div class="bid">
		<div class="table" v-for="i in 5">
			<div class="table-cell">
				<img src="../home/img/banner.jpg"/>
				<div class="box">
					<p class="name">刘杰 (123123)</p>
					<p class="price">报价:1212.00 元</p>
				</div>
			</div>
			<div class="table-cell">
				<div class="btn" :style="{background:color}">同意</div>
			</div>			
		</div>		
		<el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>			
	</div>
</template>

<script>
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

		}
	}	
</script>

<style scoped="scoped" lang="less">
	.bid{
		margin-top: 5px;
		.table{
			display:table;
			padding-bottom: 5px;
			margin: 10px 0;
			width:100%;
			border-bottom:1px solid gainsboro;
			.table-cell{
				display: table-cell;
				vertical-align: middle;
				img{
					width: 70px;
					height: 70px;
					vertical-align: middle;
				}
				.box{
					display: inline-block;
					vertical-align: middle;
					line-height: 24px;
					padding: 0 2px;
				}
				.btn{
					float: right;
					line-height: 30px;
					border-radius: 30px;
					padding: 0 20px;
					color: white;
					cursor: pointer;
				}
			}
		}
	}
</style>