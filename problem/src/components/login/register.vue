<template>
	<div class="login">
		<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="84px" class="demo-ruleForm">
			<el-form-item label="用户昵称" prop="name">
				<el-input type="password" v-model="ruleForm.name" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="用户密码" prop="pass">
				<el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="确认密码" prop="checkPass">
				<el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item style="text-align: center;">
				<el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
				<el-button @click="resetForm('ruleForm')">重置</el-button>
			</el-form-item>
		</el-form>		
	</div>
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
				} else {
					if(this.ruleForm.checkPass !== '') {
						this.$refs.ruleForm.validateField('checkPass');
					}
					callback();
				}
			};
			var validatePass2 = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请再次输入密码'));
				} else if(value !== this.ruleForm.pass) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			return {
				ruleForm: {
					name:'',
					pass: '',
					checkPass: '',
				},
				rules: {
					name: [{
						validator: validatename,
						trigger: 'blur'
					}],					
					pass: [{
						validator: validatePass,
						trigger: 'blur'
					}],
					checkPass: [{
						validator: validatePass2,
						trigger: 'blur'
					}]
				}
			};
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						this.$router.push({path:'/home'})
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
	
</style>