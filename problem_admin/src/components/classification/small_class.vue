<template>
	<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm small_class">
		<el-form-item label="大类" prop="large">
			<el-select v-model="ruleForm.large" placeholder="请选择活动区域" :disabled='!this.$route.query._id?false:true'>
				<el-option :label="item.large" :value="item.large" v-for='(item,i) in alllarge' :key='i'></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="小类" prop="small">
			<el-input v-model="ruleForm.small" placeholder="html"></el-input>
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
					large: this.$route.query.large||'前端',
					small: this.$route.query.name||'',
					_id:this.$route.query._id||null,
				},
				alllarge:[],
				rules: {
					large: [{
						required: true,
						message: '请选择活动区域',
						trigger: 'change'
					}],					
					small: [{
							required: true,
							message: '请输入活动名称',
							trigger: 'blur'
						}
					]
				}
			};
		},
		mounted(){
		    axios.get(this.https+'admin/navigation/read')
			    .then((res)=>{
			    	this.alllarge=res.data.data
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
					    axios.post(this.https+'admin/navigation/small',this.ruleForm)
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