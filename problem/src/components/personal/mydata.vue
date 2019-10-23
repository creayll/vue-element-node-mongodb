<template>
	<div class="mydata">
		<el-form ref="form" :model="form" label-width="80px">
			<el-form-item label="擅长:">
				<el-checkbox-group v-model="form.type">
					<el-checkbox label="html" name="type"></el-checkbox>
					<el-checkbox label="css" name="type"></el-checkbox>
					<el-checkbox label="js" name="type"></el-checkbox>
					<el-checkbox label="php" name="type"></el-checkbox>
				</el-checkbox-group>
			</el-form-item>
			<el-form-item label="曾任职:">
				<el-input v-model="form.work"></el-input>
			</el-form-item>	
			<el-form-item label="QQ号:">
				<el-input v-model="form.contact"></el-input>
			</el-form-item>		
			<el-form-item label="博客:">
				<el-input v-model="form.Blog"></el-input>
			</el-form-item>					
			<el-form-item label="活动时间:">
				<el-col :span="11">
					<el-time-picker placeholder="选择时间" v-model="form.date1" style="width: 100%;"></el-time-picker>
				</el-col>
				<el-col class="line" :span="2">-</el-col>
				<el-col :span="11">
					<el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
				</el-col>
			</el-form-item>		

			<el-form-item label="拜师礼:">
				<el-form :model="form" :inline="true">
					<el-form-item label="一个月:">
						<el-input-number v-model="form.oneprice" :min='1'></el-input-number> 元	
					</el-form-item>		
					<el-form-item label="3个月:">
						<el-input-number v-model="form.threeprice" :min='1'></el-input-number> 元	
					</el-form-item>		
					<el-form-item label="半年:">
						<el-input-number v-model="form.halfyearprice" :min='1'></el-input-number> 元	
					</el-form-item>		
					<el-form-item label="一年:">
						<el-input-number v-model="form.yearprice" :min='1'></el-input-number> 元
					</el-form-item>						
				</el-form>
			</el-form-item>			
			
			<el-form-item label="允许拜师:">
				<el-switch v-model="form.delivery"></el-switch>
			</el-form-item>		
			<div class="buttonbox">
				<el-button type="primary" @click="onSubmit">保存</el-button>
			</div>
		</el-form>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					type: ['html','css'],
					work: '阿里',
					contact:'2227171174',
					Blog:'www.baidu.com',
					region: '',
					date1: '',
					date2: '',
					oneprice:12,
					threeprice:30,
					halfyearprice:60,
					yearprice:100,
					delivery: false,					
				}

			}
		},
		methods: {
			onSubmit() {
				console.log('submit!');
			}
		},
		mounted() {

		},
		components: {

		}
	}
</script>

<style scoped="scoped" lang="less">
	.mydata {
		overflow: hidden;
		.addbox{
			.left{
				padding-right: 100px;
				.el-input{
					margin-bottom: 5px;
				}
			}
			.right{
				float: right;
			}
		}
		.line{
			text-align: center;
		}
		.buttonbox{
			text-align: center;
		}
	}
</style>