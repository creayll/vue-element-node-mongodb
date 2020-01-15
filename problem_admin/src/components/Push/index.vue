<template>
	<div class="message">
		<el-table :data="data" style="width: 100%" max-height="100%">
			<el-table-column type="index" label="ID" width="50"></el-table-column>
			<el-table-column label="姓名" prop='uid.name' width="110"></el-table-column>
			<el-table-column label="被推送人" width="110">
				<template slot-scope="scope">
				    <div v-if="scope.row.grouptype.length>0">
				        <span v-for="(item,i) in scope.row.grouptype">{{item | grouptype}}&nbsp;</span>
				    </div>
					<div v-else>
					    <span v-for="(item,i) in scope.row.arr_Appoint_id">{{item}}</span>
					</div>
				</template>					
			</el-table-column>
			<el-table-column prop="title" label="标题" width="200"> </el-table-column>
			<el-table-column prop="content" label="内容"> </el-table-column>
			<el-table-column label="推送时间" width="150">
				<template slot-scope="scope">{{$moment(scope.creatAt).format('YYYY-MM-DD HH:mm')}}</template>	
			</el-table-column>
		</el-table>
		<el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				data: []
			}
		},
		methods: {
            
		},
		mounted() {
			axios.get(this.https + 'admin/push/read')
				.then((res) => {
					this.data = res.data.data
				})
				.catch(function(error) {
					console.log(error);
				})
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