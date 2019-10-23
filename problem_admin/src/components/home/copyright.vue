<template>
	<div class="foot">
		<el-form :inline="true" :model="formInline" class="demo-form-inline">
		  <el-form-item label="版权">
		    <el-input v-model="formInline.copyright" placeholder="版权"></el-input>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" :plain="true" @click="onSubmit">修改</el-button>
		  </el-form-item>
		</el-form>		
	</div>
</template>
<script>
  export default {
    data() {
      return {
        formInline: {
          copyright: '',
        }
      }
    },
    mounted(){
	    axios.post(this.https+'admin/home/copyrightread',this.formInline)
		    .then((res)=>{
		        console.log(res.data);
		        if(res.data.code==1){
					this.formInline.copyright=res.data.data.copyright		        	
		        }		        
		    })
		    .catch(function(error){
		        console.log(error);
			})	    	
    },
    methods: {
      onSubmit() {
		    axios.post(this.https+'admin/home/copyrightupdata',this.formInline)
			    .then((res)=>{
			        console.log(res.data);
			        if(res.data.code==1){
				        this.$message({
				          message: '恭喜您，更新成功',
				          type: 'success'
				        });				        	
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
	.foot{
		height: 100%;
		width: 100%;
		position: relative;
		.demo-form-inline{
			position: absolute;
			left: 50%;
			top: 30%;
			transform: translateX(-50%);
		}			
	}
</style>