<template>
	<div class="message">
		<div class="box">
			<el-input
			type="textarea"
			rows='4'
			placeholder="请输入内容"
			v-model="text"
			maxlength="200"
			show-word-limit
			>
			</el-input>	
			<span @click.stop="Submission" :style="{background: background}" class="btn">提交</span>
		</div>	
		<div class="item" v-for="(item,i) in message" :key="i">
			<div class="top">
				<img :src="https+item.uid.photo"/>
				<span class="name">{{item.uid.nick}}({{item.uid.ip}})</span>
			</div>
			<div class="content">{{item.text}}</div>
		</div>
		<el-pagination background :hide-on-single-page='true' layout="prev, pager, next" :total="allnum" :page-size="size" @current-change="handleCurrentChange"></el-pagination>
	</div>
</template>

<script>
	export default {
	  	data () {
		    return {
				text:'',
				background:this.$store.state.themecolor.color,
				data:JSON.parse(sessionStorage.getItem('solvedetail')),
				message:[],
				size:0,
				allnum:0					
		    }
	    }, 	   	
	   	methods:{
   			init(page){
				var query={
					limit:1,
					page:page,
					fid:this.data._id
				}
				axios.post(this.https+'home/problem/readmessage',query)
					.then((res)=>{
						console.log(res.data)	
						this.message=res.data.data	
						this.size=res.data.size
						this.allnum=res.data.allnum						
					})
					.catch(function(error){
						console.log(error);
					}) 	
			},	
			Submission(){
				var query={
					fid:this.data._id,
					text:this.text
				}
				axios.post(this.https+'home/problem/message',query)
					.then((res)=>{
						console.log(res.data)	
						if(res.data.status==1){
							var item={
								text:this.text,
								uid:this.$store.state.loginstore.loginstate
							}
							this.message.push(item)
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
			handleCurrentChange(page){
				this.init(page)	
			},  			    
	   	},
 		mounted(){
			this.init(1)	
 		},	
		components: {

		}
	}	
</script>

<style scoped="scoped" lang="less">
	.message{
		.box{
			overflow: hidden;
			margin-top: 10px;
			border-bottom:1px solid gainsboro;
			padding-bottom: 20px;
			.btn{
				width: 80px;
				text-align: center;
				border-radius:4px;
				float: right; 
				line-height: 30px;
				color: white;
				margin-top: 5px;
			}
		}
		.item{
		    padding-bottom: 5px;
		    margin: 10px 0;
		    width: 100%;
		    border-bottom: 1px solid gainsboro;		
		    .content{
		    	line-height: 22px;
		    	margin-left: 40px;
		    }	
			.top{
				vertical-align: middle;
				position: relative;
				img{
					vertical-align: middle;
					width: 40px;
					height: 40px;
					border-radius: 100%;					
				}
				span{
					vertical-align: middle;
				}
				// i{
				// 	position: absolute;
				// 	top: 50%;
				// 	transform: translateY(-50%);
				// 	right: 10px;
				// 	cursor: pointer;
				// 	color: rgba(0,0,0,0.5);
				// }
				// i:hover{
				// 	color: black;
				// }
			}
		}
	}
</style>