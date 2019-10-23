<template>
	<div class="box">
		<div class="tab">
			<el-col :span="12" v-for='(item,i) in tab' :key='i'>
				<router-link :to="item.path" :style="{background:$route.path==item.path?color:''}">{{item.title}}</router-link>				
			</el-col>		
		</div>
		<div class="content">
			<router-view />
		</div>	
	</div>
</template>

<script>
	import { mapState } from "vuex";
	export default {
		data() {
			return {
				tab:[{title:'登录',path:'/login'},{title:'注册',path:'/login/register'}],
				index:0
			};
		},
		methods: {
			
		},
		computed: {
			// 对象中的state 和数组中的localJobTitle 都是和login中的参数一一对应。
			...mapState("themecolor", {
				color: state => state.color
			})
		}, 		
	}
</script>

<style scoped="scoped" lang="less">
	.box{
		width: 400px;
		margin: 8% auto;
		border: 1px solid gainsboro;		
		.tab{
			text-align: center;
			overflow: hidden;
			a{				
				display: block;
				line-height: 40px;
				background: gray;
				color: white;
			}
		}
		.content{
			padding: 20px;
		}
	}
</style>