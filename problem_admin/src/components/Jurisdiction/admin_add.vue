<template>
	<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm admin_add">
		<el-form-item label="姓名" prop="name">
			<el-input v-model="ruleForm.name"></el-input>
		</el-form-item>
		<el-form-item label="电话" prop="name">
			<el-input v-model="ruleForm.phone"></el-input>
		</el-form-item>		
		<el-form-item label="密码" prop="pass">
			<el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
		</el-form-item>
		<el-form-item label="确认密码" prop="checkPass">
			<el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
		</el-form-item>
		<el-form-item label="角色" prop="role_arr">
			<el-checkbox-group v-model="ruleForm.role_arr">
				<el-checkbox :label="item.name" name="role" v-for='(item,i) in auth_list' :key='i'>{{item.name}}</el-checkbox>
			</el-checkbox-group>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
			<el-button @click="resetForm('ruleForm')">重置</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
	export default {
		data() {
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
				auth_list:[],
				ruleForm: {
					name: '',
					phone:'',
					pass: '',
					checkPass: '',
					role_arr: [],
				},
				rules: {
					name: [{
							required: true,
							message: '请输入活动名称',
							trigger: 'blur'
						}
					],
					pass: [{
						validator: validatePass,
						trigger: 'blur'
					}],
					checkPass: [{
						validator: validatePass2,
						trigger: 'blur'
					}],
			        role_arr: [
			            { type: 'array', required: true, message: '请至少选择一个角色', trigger: 'change' }
			        ]				
				}
			};
		},
		mounted(){	
		    axios.get(this.https+'admin/Jurisdiction/roleread')
			    .then((res)=>{
			    	this.auth_list=res.data.data
			        console.log(res.data);   
			    })
			    .catch(function(error){
			        console.log(error);
				})				
			
			
			var _id=this.$route.query._id
			if(_id){
				var query={_id}
			    axios.post(this.https+'admin/Jurisdiction/read_one_admin',query)
				    .then((res)=>{
				    	var data=res.data.data
				    	this.ruleForm.name=data.user_id.name
				    	this.ruleForm.phone=data.user_id.phone
				    	this.ruleForm.pass=data.user_id.psd
				    	this.ruleForm.checkPass=data.user_id.psd
				    	this.ruleForm.role_arr=data.role_arr			    	
				        console.log(res.data);   
				    })
				    .catch(function(error){
				        console.log(error);
					})									
			}					
		},		
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						var _id=this.$route.query._id
						if(_id){
							this.ruleForm._id=_id
						}
					    axios.post(this.https+'admin/Jurisdiction/addadmin',this.ruleForm)
						    .then((res)=>{
						    	console.log(res.data);   
						    	if(_id){
							        this.$message({
							          message: '恭喜您，更新成功',
							          type: 'success'
							        });							    		
						    	}else{
							        this.$message({
							          message: '恭喜您，添加成功',
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