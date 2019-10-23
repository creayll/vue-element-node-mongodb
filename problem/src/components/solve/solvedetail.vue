<template>
	<div class="solvedetail">
		<div class="container">
			<solvedetail :color='color'/>
			<div class="box">
				<div class="tab">
					<div v-for='(item,i) in tab' class="item"  :class='{active:$route.path==item.path}':style="{background:$route.path==item.path?color:''}"  
					 @click='eltab(item.path)'>{{item.name}}</div> 
				</div>
				<router-view />
			</div>
		</div>		
	</div>
</template>

<script>
	import solvedetail from 'base/solvedetail'
	import {mapActions, mapState,mapGetters} from "vuex";
	export default {
		data(){
			return{
				tab:[{path:'/solve/solvedetail',name:'投标'},{path:'/solve/solvedetail/message',name:'留言'}],
			}
		},
	   	methods:{
   			eltab(path){
   				this.$router.push({path:path})
   			}
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

<style scoped lang="less">
	.solvedetail{
		background: white;
		padding: 20px 0;
		.box{
			padding:10px;
			.tab{
				.item{
					color: black;
					width: 120px;
					text-align: center;
					line-height: 40px;
					display: inline-block;
					background: gainsboro;
				}
				.active{
					color: white;
				}
			}
		}
	}
</style>