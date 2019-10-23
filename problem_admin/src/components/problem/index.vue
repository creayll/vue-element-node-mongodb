<template>
	<div class="problem_list">
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
			<el-table-column fixed label="姓名" width="150" prop="user_id">
				<template slot-scope="scope">11{{scope.name}}</template>
			</el-table-column>
			<el-table-column prop="title" label="标题" width="200"></el-table-column>
			<el-table-column prop="price" label="价钱" width="120"> </el-table-column>
			<el-table-column prop="state" label="状态" width="120"> </el-table-column>
			<el-table-column label="创建时间" width="150">
				<template slot-scope="scope">{{$moment(scope.creatAt).format('YYYY-MM-DD HH:mm')}}</template>	
			</el-table-column>
			<el-table-column prop="timeplacement" label="置顶时间" width="150"> </el-table-column>
			<el-table-column fixed="right" label="操作" width="150">
				<template slot-scope="scope">
					<el-button size="mini" @click="handleEdit(scope.$index, tableData)">编辑</el-button>
					<el-button size="mini" type="danger" @click="deleteRow(scope.$index, tableData)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
	</div>
</template>

<style scoped lang="less">
	.problem_list{
		height: 100%;
	}
</style>

<script>
	export default {
		methods: {
		    onSubmit() {
				axios.post(this.https + 'admin/user/find',this.ruleForm)
					.then((res) => {
						this.tableData = res.data.data
					})
					.catch(function(error) {
						console.log(error);
					})
		    },				
			handleEdit(index, rows) {

			},
			deleteRow(index, rows) {
				rows.splice(index, 1);
			},
		},
		mounted(){
		    axios.get(this.https+'admin/problem/read')
			    .then((res)=>{
			        console.log(res.data);      			    	
			    	this.tableData=res.data.data
			    })
			    .catch(function(error){
			        console.log(error);
				})				
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