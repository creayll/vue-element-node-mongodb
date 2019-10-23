<template>
	<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="84px" class="demo-ruleForm login">
		<el-form-item label="用户昵称" prop="name">
			<el-input v-model="ruleForm.name" autocomplete="off"></el-input>
		</el-form-item>
		<el-form-item label="用户密码" prop="psd">
			<el-input type="password" v-model="ruleForm.psd" autocomplete="off"></el-input>
		</el-form-item>
		<el-form-item style="text-align: center;">
			<el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
			<el-button @click="resetForm('ruleForm')">重置</el-button>
		</el-form-item>
	</el-form>		
</template>

<script>
	export default {
		data() {
			var validatename = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请输入昵称'));
				}
				callback();
			};			
			var validatePass = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请输入密码'));
				}
				callback();
			};
			return {
				ruleForm: {
					name:'admin',
					psd: 'admin'
				},
				rules: {
					name: [{
						validator: validatename,
						trigger: 'blur'
					}],					
					psd: [{
						validator: validatePass,
						trigger: 'blur'
					}]
				}
			};
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
					    axios.post(this.https+'admin/login',this.ruleForm)
						    .then((res)=>{
						        if(res.data.status==1){						        	
						        	this.$router.push({path:'/home'})
						        	
						        };		        
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

<style scoped="scoped" lang="less">
	.login{
		width: 500px;
		margin: 10% auto;
	}
</style>