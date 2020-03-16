<template>
	<div class="message">
		<el-table :data="tableData" style="width: 100%" max-height="100%">
			<el-table-column type="index" label="ID" width="50"></el-table-column>
			<el-table-column label="发布人" prop='uid.name' width="120"></el-table-column>
			<el-table-column label="被推送人或群组" width="150">
				<template slot-scope="scope">
				    <div v-if="scope.row.grouptype.length>0">
				        <span v-for="(item,i) in scope.row.grouptype" :key="i">{{item | grouptype}}&nbsp;</span>
				    </div>
					<div v-else>
					    <span v-for="(item,i) in scope.row.arr_Appoint_id" :key="i">{{item}}</span>
					</div>
				</template>					
			</el-table-column>
			<el-table-column prop="title" label="标题" width="200"> </el-table-column>
			<el-table-column prop="content" label="内容"> </el-table-column>
			<el-table-column label="推送时间" width="150">
				<template slot-scope="scope">{{$moment(scope.creatAt).format('YYYY-MM-DD HH:mm')}}</template>	
			</el-table-column>
		</el-table>
		<el-pagination background :hide-on-single-page='true' layout="prev, pager, next" :total="allnum" :page-size="size" @current-change="handleCurrentChange"></el-pagination>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				tableData: null,
				size:0,
				allnum:0
			}
		},
		methods: {
            read(page){
				var query = {
					limit:10,
					page:page
				}				
				axios.post(this.https + 'admin/push/read',query)
					.then((res) => {
							console.log(res.data);   
							this.tableData=res.data.data
							this.size=res.data.size
							this.allnum=res.data.allnum
					})
					.catch(function(error) {
						console.log(error);
					})
			},
			handleCurrentChange(val){
				console.log(val)
				this.read(val)	
			}			
		},
		mounted() {
			this.read(1)
		},
		filters:{  // 推送群组类型   1==vip, 0==普通   -1==则为推送指定用户    
		    grouptype(val){
		        if(val == 0){
		            return '普通'
		        }else if(val == 1){
		            return 'vip'
		        }
		    }
		},
		components: {

		}
	}
</script>

<style scoped="scoped" lang="less">

</style>