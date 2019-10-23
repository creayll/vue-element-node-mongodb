<template>
	<div class="user_list">
		<el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-form-inline">
			<el-form-item prop="user">
				<el-input v-model="ruleForm.user" placeholder="请输入姓名或IP"></el-input>
			</el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="onSubmit">查询</el-button>
		  </el-form-item>
		</el-form>		
		<el-table :data="tableData" style="width: 100%" max-height="100%">
			<el-table-column fixed type="index" label="ID" width="50"></el-table-column>
			<el-table-column fixed label="姓名" width="150">
				<template slot-scope="scope">{{scope.row.name}}({{scope.row.ip}})</template>
			</el-table-column>
			<el-table-column prop="nick" label="昵称" width="120"></el-table-column>
			<el-table-column prop="type" label="等级" width="120"></el-table-column>
			<el-table-column prop="address" label="地址" width="160"></el-table-column>
			<el-table-column prop="phone" label="电话" width="160"> </el-table-column>
			<el-table-column prop="email" label="email" width="160"> </el-table-column>
			<el-table-column prop="qq" label="QQ" width="130"> </el-table-column>
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
	.user_list{
		height: 100%;
	}
</style>

<script>
	export default {
		mounted() {
			axios.get(this.https + 'admin/user/read')
				.then((res) => {
					this.tableData = res.data.data
				})
				.catch(function(error) {
					console.log(error);
				})
		},		
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