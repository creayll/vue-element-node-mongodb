<template>
	<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm personal_push">		
		<el-form-item label="标题" prop="title">
			<el-input  v-model="ruleForm.title" placeholder="html"></el-input>
		</el-form-item>			
		<el-form-item label="内容" prop="content">
			<el-input  type="textarea" v-model="ruleForm.content" placeholder="请输入内容"></el-input>
		</el-form-item>	
		<el-form-item label="添加接收人">
			<el-input type="primary" v-model="ip" placeholder="接收人IP (如：212312)" style='width:200px'></el-input>
			<el-button @click.prevent="removeDomain()">添加</el-button>
		</el-form-item>		
		<el-form-item label="接收人" prop="arr_Appoint_id">
			<el-checkbox-group v-model="ruleForm.arr_Appoint_id">
				<el-checkbox checked v-for='(item,i) in list' :key='i' :label="item.ip">
                    {{item.name}}({{item.ip}})		    
				</el-checkbox>
			</el-checkbox-group>
		</el-form-item>			
		<el-form-item>
			<el-button type="primary" @click="submitForm('ruleForm')">推送</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
	export default {
		data() {
			return {
			    ip:'127654',
			    list:[],
				ruleForm: {
					title: '',
					content: '',					
					arr_Appoint_id:[],					
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
					arr_Appoint_id: [{
						type: 'array',
						required: true,
						message: '请至少选择一个活动性质',
						trigger: 'change'
					}],					
				}
			};
		},
        sockets: {
            connect: function () {
                console.log('用户连接connect')
            },
            message_client: function (data) {
                console.log('触发message_client')
            },
            customEmit: function (data) {
                console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
            }
        },		
		methods: {
			removeDomain(){
			    var ishas = this.list.filter((item)=>{
			        return item.ip==this.ip
			    })
			    if(ishas.length>0){
                    this.$message({
                      message: '您已经添加过这个IP啦',
                      type: 'error'
                    });     			        
			        return false
			    }
                axios.post(this.https+'admin/push/findone',{ip:this.ip})
                    .then((res)=>{
                        console.log(res.data);
                        var data = res.data.data
                        this.list.push({ip:data.ip,name:data.name})
                    })
                    .catch(function(error){
                        console.log(error);
                    })  			    
			},
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
                        axios.post(this.https+'admin/push/save',this.ruleForm)
                            .then((res)=>{
                                this.$socket.emit("admin_personer_message",this.ruleForm); //触发start
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
			}
		}
	}
</script>