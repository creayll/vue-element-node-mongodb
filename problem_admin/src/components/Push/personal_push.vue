<template>
	<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm personal_push">		
		<el-form-item label="标题" prop="title">
			<el-input  v-model="ruleForm.title" placeholder="html"></el-input>
		</el-form-item>			
		<el-form-item label="内容" prop="content">
			<el-input  type="textarea" v-model="ruleForm.content" placeholder="请输入内容"></el-input>
		</el-form-item>	
		<el-form-item label="添加接收人">
			<el-input type="primary" v-model="ruleForm.personal" placeholder="接收人IP (如：212312)" style='width:200px'></el-input>
			<el-button @click.prevent="removeDomain()">添加</el-button>
		</el-form-item>		
		<el-form-item label="接收人" prop="type">
			<el-checkbox-group v-model="ruleForm.type">
				<el-checkbox :label="item.name+'('+item.IP+')'" name="type" v-for='(item,i) in ruleForm.typelist' :key='i'></el-checkbox>
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
					title: '',
					content: '',
					personal:'',
					type:['李四(1212)','李山(6554)','王四(8787)'],		
					typelist: [{IP:1212,name:'李四'},{IP:6554,name:'李山'},{IP:8787,name:'王四'}],		
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
					type: [{
						type: 'array',
						required: true,
						message: '请至少选择一个活动性质',
						trigger: 'change'
					}],					
				}
			};
		},
		methods: {
			removeDomain(){
				this.ruleForm.typelist.push({IP:this.ruleForm.personal,name:this.ruleForm.personal})
				this.ruleForm.type.push(this.ruleForm.personal+'('+this.ruleForm.personal+')')
			},
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						alert('submit!');
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