<template>
	<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm large_class">
		<el-form-item label="大类" prop="large">
			<el-input v-model="ruleForm.large" placeholder="前端"></el-input>
		</el-form-item>	
		<el-form-item>
			<el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
			<el-button v-show='!this.$route.query._id' @click="resetForm('ruleForm')">重置</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
	export default {
		data() {
			return {
				ruleForm: {
					large: this.$route.query.large||'',
					_id:this.$route.query._id||null,
				},
				rules: {				
					large: [{
							required: true,
							message: '请输入活动名称',
							trigger: 'blur'
						}
					]
				}
			};
		},
		mounted(){
			
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
					    axios.post(this.https+'admin/navigation/large',this.ruleForm)
						    .then((res)=>{
						        if(res.data.code==1){
							        this.$message({
							          message: '恭喜您，操纵成功',
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
			resetForm(formName) {
				this.$refs[formName].resetFields();
			}
		}
	}
</script>