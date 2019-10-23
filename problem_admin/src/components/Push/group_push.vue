<template>
	<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm small_class">		
		<el-form-item label="标题" prop="title">
			<el-input  v-model="ruleForm.title" placeholder="html"></el-input>
		</el-form-item>			
		<el-form-item label="内容" prop="content">
			<el-input  type="textarea" v-model="ruleForm.content" placeholder="请输入内容"></el-input>
		</el-form-item>		
		<el-form-item label="接收群" prop="grouptype"> 
			<el-checkbox-group v-model="ruleForm.grouptype" style="display: inline-block;margin-left: 30px;">
				<el-checkbox v-for='(item,i) in checkbox' :key='i' :label="item.type" name="type">{{item.type}}</el-checkbox>
			</el-checkbox-group>
		</el-form-item>		
		<el-form-item>
			<el-button type="primary" @click="submitForm('ruleForm')">立即发送</el-button>
			<el-button @click="resetForm('ruleForm')">重置</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
	export default {
		data() {
			return {
				checkbox:[{'type':'vip','value':1},{'type':'普通','value':0}],
				ruleForm: {
					title: '',
					content: '',
					grouptype: [],														
				},
				rules: {
					title: [{
						required: true,
						message: '请选择活动区域',
						trigger: 'change'
					}],		
					content: [{
						required: true,
						message: '请选择活动区域',
						trigger: 'change'
					}],						
					grouptype: [{
						type: 'array',
						required: true,
						message: '请至少选择一个活动性质',
						trigger: 'change'
					}],					
				}
			};
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
					    axios.post(this.https+'admin/push/save',this.ruleForm)
						    .then((res)=>{
						    	this.$socket.emit("message",this.ruleForm); //触发start
						        console.log(res.data);   
						    })
						    .catch(function(error){
						        console.log(error);
							})													
//						alert('submit!');
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