<template>
	<div class="admin_list">
		<el-table :data="tableData" style="width: 100%" max-height="100%" @cell-click='clickcell'>
			<el-table-column type="index" label="ID" width="80"></el-table-column>
			<el-table-column prop="user_id.ip" label="IP"></el-table-column>
			<el-table-column prop="user_id.name" label="姓名"> </el-table-column>
			<el-table-column prop="user_id.phone" label="电话"> </el-table-column>
			<el-table-column label="职位" width="200">
		      	<template slot-scope="scope">
		        	<span v-for='(item,i) in scope.row.role_arr'>{{item}}</span>
		      	</template>				
			</el-table-column>
			<el-table-column prop="address" label="权限" width="400">
		      	<template slot-scope="scope">
		        	<span v-for='(item,i) in scope.row.auth_arr'>{{item}}</span>
		      	</template>						
			</el-table-column>
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
	.admin_list{
		height: 100%;
		table{
			span{
				margin-right: 10px;

			}
		}
	}
</style>

<script>
	export default {
		data() {
			return {
				tableData: []
			}
		},		
		mounted(){
		    axios.get(this.https+'admin/Jurisdiction/adminread')
			    .then((res)=>{
			    	this.tableData=res.data.data
			        console.log(this.tableData);   
			    })
			    .catch(function(error){
			        console.log(error);
				})					
		},
		methods: {
			clickcell(row){
			    this.$router.push({name:'admin_add',query:{_id:row._id}})
			},		
			handleEdit(index, rows) {

			},
			deleteRow(index, rows) {
				rows.splice(index, 1);
			},
		},
	}
</script>