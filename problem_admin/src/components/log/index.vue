<template>
	<div class="log">
		<el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-form-inline">
			<el-form-item prop="user">
				<el-input v-model="ruleForm.user" placeholder="请输入姓名或IP"></el-input>
			</el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="onSubmit">查询</el-button>
		  </el-form-item>
		</el-form>			
		<el-table :data="tableData" style="width: 100%" max-height="100%">
			<el-table-column fixed type="index" label="ID" width="40"></el-table-column>
			<el-table-column fixed label="姓名" width="150" prop="name"></el-table-column>
			<el-table-column fixed label="角色" width="150" prop="name"></el-table-column>
			<el-table-column prop="title" label="操作"></el-table-column>
			<el-table-column label="操作时间" width="150" prop="creatAt">
				<!--<template slot-scope="scope">{{$moment(scope.creatAt).format('YYYY-MM-DD HH:mm')}}</template>-->	
			</el-table-column>
		</el-table>
		<el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
	</div>
</template>

<script>
	export default {
		methods: {
		    onSubmit() {
//				axios.post(this.https + 'admin/user/find',this.ruleForm)
//					.then((res) => {
//						this.tableData = res.data.data
//					})
//					.catch(function(error) {
//						console.log(error);
//					})
		   }			
		},
		mounted(){
//		    axios.get(this.https+'admin/problem/read')
//			    .then((res)=>{
//			        console.log(res.data);      			    	
//			    	this.tableData=res.data.data
//			    })
//			    .catch(function(error){
//			        console.log(error);
//				})				
		},
		data() {
			return {
				ruleForm:{
					user:'',
				},				
				rules: {
					user: [{
						required: true,
						message: '请输入姓名或IP',
						trigger: 'blur'
					}]						
				},					
				tableData: []
			}
		}
	}
</script>

<style scoped="scoped" lang="less">
	.log{
		
	}
</style>