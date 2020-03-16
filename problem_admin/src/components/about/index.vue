<template>
	<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
		<el-form-item label="电话">
			<el-input v-model="ruleForm.phone"></el-input>
		</el-form-item>
		<el-form-item label="email" prop="email">
			<el-input v-model="ruleForm.email"></el-input>
		</el-form-item>		
		<el-form-item>
			<el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
			<!--<el-button @click="resetForm('ruleForm')">重置</el-button>-->
		</el-form-item>
	</el-form>
</template>
<script>
	export default {
		data() {
			return {
				ruleForm: {},
				rules: {
					email:[
	      				{ type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}
					]
				}
			};
		},
		mounted(){
		    axios.get(this.https+'admin/about/read')
			    .then((res)=>{
					console.log(res.data);  
					if(res.data.data){
			        	this.ruleForm= res.data.data
					} 
			    })
			    .catch(function(error){
			        console.log(error);
				})				
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
					    axios.post(this.https+'home/about/update',this.ruleForm)
						    .then((res)=>{
						        if(res.data.code==1){
							        this.$message({
							          message: res.data.message,
							          type: 'success'
							        });				        	
						        }		 		    	
						    })
						    .catch(function(error){
						        console.log(error);
							})	
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			//    resetForm(formName) {
			//      this.$refs[formName].resetFields();
			//    }
		}
	}
</script>