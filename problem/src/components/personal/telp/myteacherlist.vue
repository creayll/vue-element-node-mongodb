<template>
	<!-- <router-link to='/teachers/teacherdetail' class="myteacherlist"> -->
	<div class="myteacherlist" v-if="data" @click="jump(item)">
		<img class="photo" :src="https+data.photo"/>
		<div class="right">
			<p>昵称:{{data.nick}}</p>
			<p>擅长:<span v-for="(list,i) in data.Be_good_at" :key="i">{{list}}</span></p>
			<p>曾任职:{{data.work}}</p>
			<p>联系方式:<span v-if="data.state==0">{{data.qq}}</span><span v-else-if="data.state!=0">建立关系前不能看见哦</span></p>
			<p>空闲时间:{{$moment(data.Activity_time1).format('YYYY-MM-DD HH:mm')}}-{{$moment(data.Activity_time2).format('YYYY-MM-DD HH:mm')}}</p>
			<p v-if="type==0">结束时间:{{$moment(data.Effective).format('YYYY-MM-DD HH:mm')}}</p>
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
			},
			jump(item){
				if(this.type==0){
					sessionStorage.setItem("teacherdetail",JSON.stringify(item.tid))
				}else{
					sessionStorage.setItem("teacherdetail",JSON.stringify(item.uid))
				}
				
				// const resolve = this.$router.resolve({path: 'teachers/teacherdetail'})
				// window.open(resolve.href,'_blank')				
				this.$router.push({'path':'/teachers/teacherdetail'})
			}				
	   	},
 		mounted(){
			// this.data=this.item
			console.log(this.type)
			if(this.type==0){
				this.data=this.item.tid
			}else{
				this.data=this.item.uid
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
		margin: 10px;
		color: #2c3e50;	
		// border: 1px solid gainsboro;
		background: white;
		border-right:10px; 
		display: block;
		border-radius: 2px;
		overflow: hidden;
		position: relative;
		padding: 10px;
		.photo{
			width: 60px;
			height: 60px;
			vertical-align: middle;
			border-radius: 100%;
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