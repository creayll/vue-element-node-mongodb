<template>
	<div class="message">
		<el-table :data="data" style="width: 100%" max-height="100%">
			<el-table-column type="index" label="ID" width="50"></el-table-column>
			<el-table-column label="姓名" prop='uid.name' width="110"></el-table-column>
			<el-table-column label="被推送人" width="110">
				<template v-if="scope.row.grouptype.length>0" slot-scope="scope">
					<span v-for="(item,i) in scope.row.grouptype">{{item}}</span>
				</template>	
				<template v-if="scope.row.arr_Appoint_id.length>0" slot-scope="scope">
					<span v-for="(item,i) in scope.row.arr_Appoint_id">{{item}}</span>
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
		components: {

		}
	}
</script>

<style scoped="scoped" lang="less">

</style>