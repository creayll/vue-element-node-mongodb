<template>
	<div class="mydata">
		<el-form ref="form" :model="form" label-width="80px">
			<el-form-item label="擅长:">
				<el-checkbox-group v-model="form.Be_good_at">
					<el-checkbox label="html" name="Be_good_at"></el-checkbox>
					<el-checkbox label="css" name="Be_good_at"></el-checkbox>
					<el-checkbox label="js" name="Be_good_at"></el-checkbox>
					<el-checkbox label="php" name="Be_good_at"></el-checkbox>
				</el-checkbox-group>
			</el-form-item>
			<el-form-item label="我的昵称:">
				<el-input v-model="form.nick"></el-input>
			</el-form-item>				
			<el-form-item label="曾任职:">
				<el-input v-model="form.work"></el-input>
			</el-form-item>	
			<el-form-item label="简介:">
				<el-input type="textarea" v-model="form.des"></el-input>
			</el-form-item>				
			<el-form-item label="QQ号:">
				<el-input v-model="form.qq"></el-input>
			</el-form-item>		
			<el-form-item label="博客:">
				<el-input v-model="form.Blog"></el-input>
			</el-form-item>					
			<el-form-item label="活动时间:">
				<el-col :span="11">
					<el-time-picker placeholder="选择时间" v-model="form.Activity_time1" style="width: 100%;"></el-time-picker>
				</el-col>
				<el-col class="line" :span="2">-</el-col>
				<el-col :span="11">
					<el-time-picker placeholder="选择时间" v-model="form.Activity_time2" style="width: 100%;"></el-time-picker>
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
				form: this.$store.state.loginstore.loginstate
			}
		},
		methods: {
			onSubmit() {
				this.form._id=this.$store.state.loginstore.loginstate._id
				axios.post(this.https+'home/personal',this.form)
					.then((res)=>{
						console.log(res)	
						this.$store.dispatch("loginstore/changelogin", this.form)	
						this.$message({
							message: '修改成功',
							type: 'success'
						});													
					})
					.catch(function(error){
						console.log(error);
					}) 	
			}
		},
		mounted() {
			console.log(this.$store.state.loginstore.loginstate)
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