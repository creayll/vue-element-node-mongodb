<template>
	<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm role_add">
		<el-form-item label="角色" prop="name">
			<el-input v-model="ruleForm.name"></el-input>
		</el-form-item>
		<el-form-item label="权限" prop="auth_arr">
			<el-checkbox-group v-model="ruleForm.auth_arr">
				<el-checkbox v-for='(item,i) in auth_list' :label="item.authname" :key='i' name="type">{{item.authname}}</el-checkbox>
			</el-checkbox-group>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
			<el-button @click="resetForm('ruleForm')">重置</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
	export default {
		data() {
			return {
				ruleForm: {
					name: '',
					auth_arr: [],					
				},
				auth_list:[],
				rules: {
					name: [{
							required: true,
							message: '请输入活动名称',
							trigger: 'blur'
						}
					],
					auth_arr: [{
						type: 'array',
						required: true,
						message: '请至少选择一个权限',
						trigger: 'change'
					}],
				}
			};
		},
		mounted(){
			var row=this.$route.query.row
			if(row){
				this.ruleForm=row
			}
			
		    axios.get(this.https+'admin/Jurisdiction/authread')
			    .then((res)=>{
			    	this.auth_list=res.data.data
			        console.log(res.data);   
			    })
			    .catch(function(error){
			        console.log(error);
				})					
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
					    axios.post(this.https+'admin/Jurisdiction/addrole',this.ruleForm)
						    .then((res)=>{
						        console.log(res.data);   
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