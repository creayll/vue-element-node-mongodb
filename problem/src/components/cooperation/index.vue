<template>
	<div class="cooperation">
		<div class="container">
			<div class="pull-left">
				<div v-for='(item,i) in tab' class="item" :key="i" :class='{active:tabindex==i}' :style="{background:tabindex==i?color:''}"  
				 @click='eltab(i,item.path)'>{{item.name}}</div> 		
			</div>
			<div class="content">
				<!-- <router-view :a="data"/> -->
				<div v-if="tabindex==0&&data"><cooperate :data='data'></cooperate></div>
				<div v-if="tabindex==1&&data"><contact :data='data'></contact></div>
				<div v-if="tabindex==2&&data"><about :data='data'></about></div>

			</div>			
		</div>
	</div>
</template>

<script>
	import {mapActions, mapState,mapGetters} from "vuex";
	import about from './about'
	import contact from './contact'
	import cooperate from './cooperate'
	export default {
	  	data () {
		    return {
				tab:[{path:'/cooperation',name:'商务合作'},{path:'/cooperation/contact',name:'联系我们'},{path:'/cooperation/about',name:'关于我们'}],
				tabindex:0,
				data:null
		    }
	    }, 	   	
	   	methods:{
   			eltab(i,path){
   				this.tabindex=i
   				// this.$router.push({path:path})
   			}
	   	},	
 		mounted(){
		    axios.get(this.https+'home/about/read')
			    .then((res)=>{
			        console.log(res.data);   
					if(res.data.data){
						this.data= res.data.data
					} 					
			    })
			    .catch(function(error){
			        console.log(error);
				})				
 		},	
		computed: {
			// 对象中的state 和数组中的localJobTitle 都是和login中的参数一一对应。
			...mapState("themecolor", {
				color: state => state.color
			})
		}, 		
		components: {
			about,
			contact,
			cooperate
		}
	}	
</script>

<style scoped="scoped" lang="less">
	.cooperation{
		padding: 10px;
		background: white;
		.pull-left{
			width: 200px;
			.item{
				line-height: 50px;
				text-align: center;
			}
			.active{
				color: white;
			}
		}
		.content{
			padding: 10px;
			padding-left: 210px;			
		}
	}
</style>