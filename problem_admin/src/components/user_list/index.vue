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
		<el-pagination background layout="prev, pager, next" :current-page="query.page" :total="allnum" :page-size="size" @current-change="handleCurrentChange"></el-pagination>
	</div>
</template>

<style scoped lang="less">
	.user_list{
		height: 100%;
	}
</style>

<script>
	export default {
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
				tableData: [],
				size:0,
				allnum:0,				
				query:{
					limit:6,
					page:1
				},	
				isfind:false //用于判断页面点击页码时请求哪个接口			
			}
		},		
		mounted() {
			this.read(1)
		},		
		methods: {
		    onSubmit() {
				if(this.ruleForm.user){	//搜索框有值时请求find接口　没值时请求read接口　并且要改变isfind值　isfind用于判断页码请求哪个接口
					this.isfind=true	
					this.find(1)
				}else{
					this.isfind=false
					this.read(1)
				}
		    },			
			handleEdit(index, rows) {

			},
			read(page){
				this.query.page=page
				axios.post(this.https + 'admin/user/read',this.query)
					.then((res) => {
						this.tableData = res.data.data
						this.allnum=res.data.allnum
						this.size=res.data.size						
					})
					.catch(function(error) {
						console.log(error);
					})
			},
			find(page){
				this.query.page=page
				var query={...this.ruleForm,...this.query}
				axios.post(this.https + 'admin/user/find',query)
					.then((res) => {
						this.tableData = res.data.data
						this.allnum=res.data.allnum
						this.size=res.data.size	
						this.isfind=true			
					})
					.catch(function(error) {
						console.log(error);
					})
			},			
			deleteRow(index, rows) {
				rows.splice(index, 1);
			},
			handleCurrentChange(page){
				if(this.isfind){
					this.find(page)	
				}else{
					this.read(page)	
				}
			}				
		}
	}
</script>