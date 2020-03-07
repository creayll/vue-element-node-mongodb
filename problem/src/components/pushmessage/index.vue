<template>
	<div class="pushmessage">
		<div class="container">
			<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" :row-class-name="tableRowClassName" @selection-change="handleSelectionChange" @cell-click='godetail'>
				<el-table-column type="selection" width="55">
				</el-table-column>
				<el-table-column label="日期" width="150">
					<template slot-scope="scope">{{$moment(scope.creatAt).format('YYYY-MM-DD HH:mm')}}</template>
				</el-table-column>
				<el-table-column prop="title" label="标题" width="150">
				</el-table-column>
				<el-table-column prop="content" label="内容" show-overflow-tooltip>
				</el-table-column>
			</el-table>
			<div style="margin-top: 20px">
				<el-button @click="deleteMany()">删除勾选</el-button>
			</div>
			<el-pagination background layout="prev, pager, next" :total="allnum" :page-size="size" @current-change="handleCurrentChange"></el-pagination>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				tableData: null,
				multipleSelection: [],
				size:0,
				allnum:0,
				arr:[]
			}
		},
		mounted () {
			this.findMessage(1)				
		},
		watch:{
			multipleSelection: function(val){
				this.arr=[]
				val.forEach((item,index)=>{
					this.arr.push(item._id)
				})		
			}
		},		
		methods: {
			findMessage(page){
				var query = {
					limit:10,
					page:page
				}
				axios.post(this.https+'home/push/findMessage',query)
					.then((res)=>{
						console.log(res.data);   
						this.tableData=res.data.data
						this.size=res.data.size
						this.allnum=res.data.allnum
					})
					.catch(function(error){
						console.log(error);
					}) 	
			},
			deleteMany(){
				axios.post(this.https+'home/push/deleteMany',this.arr)
					.then((res)=>{
						if(res.data.status==1){							
							this.$message({
								message: '删除成功',
								type: 'success'
							});
							this.tableData = this.tableData.filter((item)=>{
								return this.arr.indexOf(item._id)
							})
						}
					})
					.catch(function(error){
						console.log(error);
					}) 	
			},
			allMarkread(){
				this.$refs.multipleTable.toggleAllSelection();
			},
			handleSelectionChange(val) {
				this.multipleSelection=val
			},
			handleCurrentChange(val){
				console.log(val)
				this.findMessage(val)	
			},
			tableRowClassName({row, rowIndex}) {
				if (row.isread ) {
					return 'yesread';
				}
			},			
			godetail(row){
				console.log(row)
				sessionStorage.setItem("messagedetail",JSON.stringify(row))
				this.$router.push({name:'messagedetail'})
			}
		}
	}
</script>

<style scoped lang="less">	
	/deep/ .el-table .yesread {
		color: #6666;
	}
	.pushmessage{
		padding: 10px;
		
	}
</style>