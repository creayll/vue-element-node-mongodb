<template>
	<el-row :gutter="20" class="banner"> 
		<el-col :span="6" v-for='(item,i) in bannerlist' :key='i'>
			<div class="item">
				<img :src='https+item.img'/>
				<div class="box">
					<div class="operation">
						<p class="editbox">
							<i class="el-icon-edit"></i>
							<input class='editinput' multiple="multiple" type="file" @change="updata($event,item)"/>
						</p>											
						<a :href="https+item.img" target="_blank"><i class="el-icon-zoom-in"></i></a>
						<i class="el-icon-delete" @click="deleteimg(item)"></i>
					</div>
				</div>
			</div>
		</el-col>
		<el-col :span="6">
			<div class="uploadbox">
				<i class="el-icon-plus avatar-uploader-icon"></i>
				<input type="file" multiple="multiple" class="upload" value="" @change="updata($event)"/>
			</div>
		</el-col>
	</el-row>
</template>

<script>
	export default {
		data() {
			return {
				bannerlist:[]
			};
		},
		mounted(){
		    axios.get(this.https+'admin/home/banner')
			    .then((res)=>{
			        this.bannerlist=res.data.data
			    })
			    .catch(function(error){
			        console.log(error);
				})			
		},
		methods: {
			deleteimg(item){
				console.log(id)
			},
			updata(event,item){				
				this.file = event.target.files; //获取input的图片file值
			    let param = new FormData(); // 创建form对象				
				if(item){
					var id=item._id
				    for (var i =0;i<this.file.length;i++) {			    	
				    	param.append('imgFile', this.file[i]);//对应后台接收图片名
				    	param.append('_id', id);
				    }					
				}else{
				    for (var i =0;i<this.file.length;i++) {			    	
				    	param.append('imgFile', this.file[i]);//对应后台接收图片名
				    }						
				}
			    axios.post(this.https+'admin/home/bannersave',param)
				    .then((res)=>{
				    	if(id){
					        this.$message({
					          message: '恭喜您，更新成功',
					          type: 'success'
					        });					    		
				    		item.img=res.data.img
				    	}else{
					        this.$message({
					          message: '恭喜您，添加成功',
					          type: 'success'
					        });					    		
				    		this.bannerlist=[...this.bannerlist,...res.data.data]
				    	}				        
				    })
				    .catch(function(error){
				        console.log(error);
					})
			}
			
		}
	}
</script>

<style scoped lang="less">
	@height:140px;
	.banner {
		overflow: hidden;
		.item {			
			border-radius: 4px;
			overflow: hidden;
			position: relative;
			height: @height;
			margin-bottom: 10px;			
			img {
				width: 100%;
				height: 100%;			
			}		
			.box{
				display: none;
				position: absolute;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
				background: rgba(0,0,0,0.5);
				i{
					color: white;
					cursor: pointer;
					padding: 0 3px;		
				}
				.operation{
					position: absolute;
					left: 50%;
					top: 50%;
					transform: translate(-50%,-50%);
					.editbox{
						display: inline-block;
						position: relative;						
						.editinput{
							position: absolute;
							font-size: 0;
							left: 0;
							top: 0;
							height: 16px;
							width: 16px;
							opacity: 0;
							filter:alpha(opacity=0);
							z-index: 1;
						}
					}
				}
			}		
		}
		.uploadbox{
			position: relative;
			border-radius: 4px;
			border: 1px dashed #8c939d;
			cursor: pointer;
			height: @height;
			i{
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%,-50%);		
				font-size: 30px;		
				color: #8c939d;
			}
			input{
				width: 100%;
				height: 100%;
				opacity: 0;
				filter:alpha(opacity=0);
				z-index: 1;
			}
		}
		.item:hover .box{
			display: block;
		}			
	}	
</style>