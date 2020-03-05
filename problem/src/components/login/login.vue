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
			})
		},		
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
                        axios.post(this.https+'home/login',this.ruleForm)
                            .then((res)=>{
                                console.log(res.data)
                                if(res.data.status==1){
								axios.get(this.https+'home/push/querynum')
									.then((res)=>{
										// this.$socket.emit("message",this.ruleForm); //触发start
										var messagenum=res.data.data.length
										this.$store.dispatch("pushstore/changeinit", messagenum)	
										localStorage.setItem("messagenum",messagenum)
										console.log(res.data);   
									})
									.catch(function(error){
										console.log(error);
									}) 									
									localStorage.setItem("token",res.data.token)
									localStorage.setItem("user",JSON.stringify(res.data.user))									
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
	
</style>