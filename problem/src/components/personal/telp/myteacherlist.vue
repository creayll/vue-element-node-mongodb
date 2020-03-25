<template>
	<!-- <router-link to='/teachers/teacherdetail' class="myteacherlist"> -->
	<div class="myteacherlist" v-if="data">
		<img class="photo" :src="https+data.user.photo"/>
		<div class="right">
			<p>擅长:<span v-for="(list,i) in data.user.Be_good_at" :key="i">{{list}}</span></p>
			<p>曾任职:{{data.user.work}}</p>
			<p>联系方式:<span v-if="data.state==0">{{data.user.qq}}</span><span v-else-if="data.state!=0">建立关系前不能看见哦</span></p>
			<p>空闲时间:{{data.user.Activity_time1}}-{{data.user.Activity_time2}}</p>
			<p>结束时间:<span v-if="type==0&&data.Effective">{{$moment(data.Effective).format('YYYY-MM-DD HH:mm')}}</span></p>
		</div>
		<div class="btnbox" v-if="data.state==1">
			<span class="btn" :style="{background:color}" @click.stop="btnclick(0)">同意</span>
			<span class="btn" :style="{background:color}" @click.stop="btnclick(2)">拒绝</span>
		</div>	
	</div>
	<!-- </router-link>		 -->
</template>

<script>
	import {mapActions, mapState,mapGetters} from "vuex";
	export default {
		props:['item','type','index'],
	  	data () {
		    return {
				data:null
		    }
	    }, 	   	
	   	methods:{
			btnclick(state){
				var query={
					_id:this.item._id,
					type:this.type,
					state:state
				}
				axios.post(this.https+'home/personal/Apprentice',query)
					.then((res)=>{
						if(res.data.status==1){
							this.$parent.deletelist(this.index)
							this.$message({
								message: res.data.message,
								type: 'success'
							});	
						}												
					})
					.catch(function(error){
						console.log(error);
					}) 					
			}
	   	},
 		mounted(){
			this.data=this.item
			if(this.type==0){
				this.data.user=this.item.tid
			}else{
				this.data.user=this.item.uid
			}
			console.log(this.data)
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
	.myteacherlist{
		color: #2c3e50;	
		border: 1px solid gainsboro;
		margin-bottom: 10px;
		display: block;
		border-radius: 2px;
		overflow: hidden;
		position: relative;
		.photo{
			width: 100px;
			height: 100px;
			vertical-align: middle;
		}
		.right{
			display: inline-block;
			padding-left: 5px;
			vertical-align: middle;			
			p{
				margin-bottom: 2px;
				span{
					margin-right: 5px;
				}
			}
		}
		.btnbox{
			position: absolute;
			top: 50%;
			right: 10px;
			transform: translateY(-50%);
			.btn{
				display: inline-block;
				padding: 0 20px;
				line-height: 30px;
				border-radius: 30px;
				color: white;
				cursor: pointer;
			}
		}		
	}
</style>