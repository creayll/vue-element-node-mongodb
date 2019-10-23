<template>
	<div class="classification">
		<table border="" cellspacing="" cellpadding="">
			<thead>
				<tr>
					<th width="120">大类</th>
					<th>小类</th>
					<!--<th width="120"><el-button size="mini" type="danger" @click="isdelete=!isdelete">{{isdelete?'取消删除':'激活删除'}}</el-button></th>-->
				</tr>				
			</thead>
			<tbody>
				<tr v-for="(item,i) in table">
					<td><div><router-link :to='{name:"large_class",query:{_id:item._id,large:item.large}}'>{{item.large}}</router-link><i class='el-icon-close' v-show='isdelete'></i></div></td>
					<td><div v-for="(list,j) in item.small"><router-link :to='{name:"small_class",query:{_id:list._id,name:list.name,large:item.large}}'>{{list.name}}</router-link><i class='el-icon-close' v-show='isdelete'></i></div></td>
				</tr>				
			</tbody>
		</table>		
	</div>
</template>

<script>
	export default {
		methods: {
			handleEdit(){
				
			},
			onSubmit(){
				this.table.push({type:this.label})
			}
		},
		data() {
			return {
				isdelete:false,
				table:[]
			}
		},
		mounted(){
		    axios.get(this.https+'admin/navigation/read')
			    .then((res)=>{
			    	this.table=res.data.data
			    })
			    .catch(function(error){
			        console.log(error);
				})				
		},		
	}
</script>

<style scoped lang="less">
	.classification{
		table{
			width: 100%;
			border: 1px solid #EBEEF5;
			border-collapse: collapse;
			text-align: center;
			table-layout: fixed;
			th,td{
				padding: 12px 0;
			}
			div{
				position: relative;		
				margin: 0 10px;		
				display: inline-block;
				a{
					padding: 5px 10px;			
					color: black;
				}	
				i{
					position: absolute;
					right: -5px;
					top: -5px;
					font-size: 12px;
					color: #F56C6C;
					cursor: pointer;
				}									
			}
		}
	}
</style>