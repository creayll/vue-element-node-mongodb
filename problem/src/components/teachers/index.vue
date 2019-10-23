<template>
	<div class="teachers">
		<div class="container">
			<ul class="solt">
				<li>全部</li>
				<li>收徒<i class="el-icon-bottom"></i></li>
				<li>解决问题<i class="el-icon-bottom"></i></li>
			</ul>
			<div class="item" v-for="(item,i) in 8">
				<router-link to='teachers/teacherdetail'>
					<div class="top">
						<img src="../home/img/banner.jpg"/>
						<span class="name">liujie(03212)</span>
					</div>
					<div class="middle">
						<p class="goodat">
							<span>擅长:全栈</span>
							<span>收徒数: 54</span>
							<span>解决问题数: 541</span>
						</p>
						<p class="Serving">曾任职: 阿里p7,阿里p7,阿里p7阿里p7,阿里p7,阿里p7</p>
					</div>	
				</router-link>
				<div class="bottom">
					<el-radio v-model="radio" label="1">1月100元</el-radio>
					<el-radio v-model="radio" label="2">3个月250</el-radio>
					<el-radio v-model="radio" label="3">半年420</el-radio>
					<el-radio v-model="radio" label="4">包年800</el-radio>
					<el-radio v-model="radio" label="5">2年800</el-radio>
					<div class="btn" :style="{background:color}">拜师</div>
				</div>				
			</div>
			<el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>			
		</div>
	</div>
</template>

<script>
	import { mapActions, mapState, mapGetters } from "vuex";
	export default {
	  	data () {
		    return {
				 radio: '1'
		    }
	    }, 	   	
	   	methods:{
   			    
	   	},
 		mounted(){
			
 		},	
		computed: {
			// 对象中的state 和数组中的localJobTitle 都是和login中的参数一一对应。
			...mapState("themecolor", {
				color: state => state.color
			})
		}, 		
		components: {

		}
	}	
</script>

<style scoped="scoped" lang="less">
	.teachers{
		padding: 10px 0;
		background: white;
		.solt{
			border-bottom:1px solid gainsboro;
			li{
				display: inline-block;
				padding: 4px 10px;
				cursor: pointer;
			}
		}		
		.item{			
			vertical-align: middle;
			padding:10px 10px;
			border-bottom:1px solid gainsboro;
			img{
				width: 40px;
				height: 40px;
				border-radius:100%;
				vertical-align: middle;
			}
			a{
				color: #606266;
			}
			a:hover{
				color: blue;
			}
			.middle{
				margin: 5px 0 8px 0;
				.goodat{
					span{
						margin-right: 20px;
					}
				}
			}
			.bottom{
				position: relative;
			}
			.btn{
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
				right: 10px;
				padding: 0 20px;
				line-height: 30px;
				border-radius: 30px;
				color: white;
				float: right;
				vertical-align: middle;
				cursor: pointer;
			}
		}
	}
</style>