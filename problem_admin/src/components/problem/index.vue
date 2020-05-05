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
			<el-table-column fixed label="发布人" width="150" prop="user_id.name">
				<template slot-scope="scope">{{scope.row.user_id.name}} ({{scope.row.user_id.ip}})</template>
			</el-table-column>
			<el-table-column prop="title" label="标题" width="200"></el-table-column>
			<el-table-column prop="price" label="价钱" width="120"> </el-table-column>
			<el-table-column label="状态" width="120">
				<template slot-scope="scope">
					<span v-if="scope.row.state==0">下架</span>
					<span v-else-if="scope.row.state==1">上架</span>
					<span v-else-if="scope.row.state==2">已被投标</span>
					<span v-else-if="scope.row.state==3">被解决</span>
				</template>	
			</el-table-column>
			<el-table-column label="创建时间" width="150">
				<template slot-scope="scope">{{$moment(scope.row.creatAt).format('YYYY-MM-DD HH:mm')}}</template>	
			</el-table-column>
			<el-table-column prop="timeplacement" label="置顶结束时间" width="150">
				<template slot-scope="scope">					
					{{scope.row.istimeplacement?$moment(scope.row.timeplacement).format('YYYY-MM-DD HH:mm'):"没有置顶"}}
				</template>	
			</el-table-column>
			<el-table-column label="邀请人">
				<template slot-scope="scope">
					<span v-for="(item,i) in scope.row.Invitation" :key="i">
						{{item.name}} ({{item.ip}})
					</span>
				</template>				
			</el-table-column>				
			<el-table-column label="中标人" width="150">
				<template slot-scope="scope">
					<span v-if="scope.row.Winning">{{scope.row.Winning.name}} ({{scope.row.Winning.ip}})</span>
				</template>				
			</el-table-column>			
			<el-table-column fixed="right" label="操作" width="200">
				<template slot-scope="scope">
					<el-button size="mini" type="danger" @click="deleteRow(scope.$index, tableData)">删除</el-button>
					<span v-if="!scope.row.isforce">
						<el-button size="mini" @click="isforce(scope.$index, tableData)">强制下架</el-button>
					</span>
					<span v-else>
						<el-button size="mini" @click="isforce(scope.$index, tableData)">解除强制下架</el-button>
					</span>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination background layout="prev, pager, next" :current-page="query.page" :total="allnum" :page-size="size" @current-change="handleCurrentChange"></el-pagination>
	</div>
</template>

<style scoped lang="less">
	.problem_list{
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
		mounted(){
			this.readMessage(1)
		},
		methods: {
		    onSubmit() {　//搜索
				if(this.ruleForm.user){	//搜索框有值时请求find接口　没值时请求read接口　并且要改变isfind值　isfind用于判断页码请求哪个接口
					this.isfind=true	
					this.findMessage(1)
				}else{
					this.isfind=false
					this.readMessage(1)
				}
		    },				
			isforce(index, rows) {
				console.log(index)

				console.log(rows)
				var query={
					_id:rows[index]._id,
					isforce:rows[index].isforce
				}
				axios.post(this.https+'admin/problem/isforce',query)
					.then((res)=>{
						console.log(res.data);      			    	
						rows[index].isforce=!rows[index].isforce
						this.$message({
							message: '恭喜您，操作成功啦',
							type: 'success'
						});								
					})
					.catch(function(error){
						console.log(error);
					})		
			},
			deleteRow(index, rows) {
				var query={
					_id:rows[index]._id
				}
				axios.post(this.https+'admin/problem/delete',query)
					.then((res)=>{
						rows.splice(index, 1);  
						this.$message({
							message: '恭喜您，删除成功啦',
							type: 'success'
						});											    	
					})
					.catch(function(error){
						console.log(error);
					})									
			},
			readMessage(page){
				this.query.page=page
				axios.post(this.https+'admin/problem/read',this.query)
					.then((res)=>{
						console.log(res.data);      			    	
						this.tableData=res.data.data
						this.allnum=res.data.allnum
						this.size=res.data.size
					})
					.catch(function(error){
						console.log(error);
					})					
			},
			findMessage(page){
				this.query.page=page
				var query={...this.ruleForm,...this.query}
				axios.post(this.https + 'admin/problem/find',query)
					.then((res) => {
						this.isfind=true
						this.tableData = res.data.data
						this.allnum=res.data.allnum
						this.size=res.data.size						
					})
					.catch(function(error) {
						console.log(error);
					})
			},
			handleCurrentChange(page){
				if(this.isfind){
					this.findMessage(page)	
				}else{
					this.readMessage(page)	
				}
			}		
		}
	}
</script>