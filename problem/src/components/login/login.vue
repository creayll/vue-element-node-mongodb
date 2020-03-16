<template>
	<div class="login">
		<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="84px" class="demo-ruleForm">
			<el-form-item label="用户昵称" prop="name">
				<el-input type="text" v-model="ruleForm.name" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="用户密码" prop="pass">
				<el-input type="text" v-model="ruleForm.pass" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item style="text-align: center;">
				<el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
				<el-button @click="resetForm('ruleForm')">重置</el-button>
			</el-form-item>
		</el-form>		
	</div>
</template>

<script>
	import {mapActions, mapState,mapGetters} from "vuex";

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
					name:'123',
					pass: '123'
				},
				rules: {
					name: [{
						validator: validatename,
						trigger: 'blur'
					}],					
					pass: [{
						validator: validatePass,
						trigger: 'blur'
					}]
				}
			};
		},
		computed: {
		  // 对象中的state 和数组中的localJobTitle 都是和login中的参数一一对应。
		  	...mapState("pushstore",{
		   		messgenum: state => state.messgenum
			}),
		  	...mapState("loginstore",{
		   		messgenum: state => state.loginstate
			})			
		},		
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
                        axios.post(this.https+'home/login',this.ruleForm)
                            .then((res)=>{                               
                                if(res.data.status==1){
									localStorage.setItem("token",res.data.token)
									this.$store.dispatch("loginstore/changelogin", res.data.user)	
									console.log(this.$store.state.loginstore)									
									axios.get(this.https+'home/push/querynum')
										.then((res)=>{
											console.log("querynum:"+res.data)
											var messagenum=res.data.data
											this.$store.dispatch("pushstore/changeinit", messagenum)												
											if(this.$route.query.frompath){
												console.log(222)
												this.$router.push({path:this.$route.query.frompath})  	
											}else{
												console.log(11111)
												this.$router.push({path:'/home'})  	
											}									
										})
										.catch(function(error){
											console.log(error);
										}) 									                                  
                                }else{
									this.$message({
										message: '登录失败',
										type: 'error'
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

<style scoped="scoped" lang="less">
	
</style>