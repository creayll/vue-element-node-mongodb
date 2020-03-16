<template>
	<div class="release">
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm container">
			<el-form-item label="标题" prop="title">
				<el-input v-model="ruleForm.title"></el-input>
			</el-form-item>
			<el-form-item label="问题" prop="content">
				<el-input type="textarea" v-model="ruleForm.content"></el-input>
			</el-form-item>
			<el-form-item label="奖励" prop="price">
				<el-input-number v-model="ruleForm.price" :precision="2" :step="5" @change="handleChange" :min="5" :max="10000" label="描述文字"></el-input-number>
			</el-form-item>	
			<el-form-item label="大类" prop="large_id">
				<el-select v-model="ruleForm.large_id" placeholder="请选择大类" @change="largechange">
					<el-option v-for="(item,i) in large" :key="i" :label="item.large" :value="item._id"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="小类" prop="small_id">
				<el-select v-model="ruleForm.small_id" placeholder="请选择小类">
					<el-option v-for="(item,i) in small" :key="i" :label="item.name"  :value="item._id"></el-option>
				</el-select>
			</el-form-item>		
			<el-form-item label="邀请">
				<el-select
					v-model="ruleForm.Invitation"
					multiple
					filterable
					remote
					reserve-keyword
					placeholder="请输入关键词"
					:remote-method="remoteMethod"
					:loading="loading">
						<el-option
						v-for="item in options"
						:key="item._id"
						:label="item.name"
						:value="item._id">
						</el-option>
				</el-select>	
			</el-form-item>					
			<el-form-item label="置顶" prop="istimeplacement">
				<el-radio-group v-model="ruleForm.istimeplacement">
					<el-radio :label=false>否</el-radio>
					<el-radio :label=true>是</el-radio>
				</el-radio-group>
			</el-form-item>
			<div class="buttonbox">
				<el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
				<el-button @click="resetForm('ruleForm')">重置</el-button>
			</div>
		</el-form>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				large:null,//大类
				small:null,//小类
				loading: false,
		        options: null,       
				ruleForm: {
					title: '',
					content: '',
					price: 5,
					Invitation: [],
					large_id: '',
					small_id: '',
					istimeplacement: false
				},
				rules: {
					title: [{
							required: true,
							message: '请输入标题',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 5,
							message: '长度在 3 到 5 个字符',
							trigger: 'blur'
						}
					],
					content: [{
							required: true,
							message: '请输入标题',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 5,
							message: '长度在 3 到 5 个字符',
							trigger: 'blur'
					}],
					large_id: [{
						required: true,
						message: '请选择大类',
						trigger: 'change'
					}],
					small_id: [{
						required: true,
						message: '请选择小类',
						trigger: 'change'
					}]
				}
			};
		},
		mounted() {
			axios.get(this.https+'home/release/Releaselist')
				.then((res)=>{
					console.log(res.data);   
					this.large=res.data.data
				})
				.catch(function(error){
					console.log(error);
				}) 			
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						axios.post(this.https+'home/release/issue',this.ruleForm)
							.then((res)=>{
								console.log(res.data);   
							})
							.catch(function(error){
								console.log(error);
							}) 	
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
		    handleChange(value) {
		        console.log(value);
			},
			largechange(id){
				this.large.forEach(element => {
					if(element._id===id){
						this.small=element.small
						this.ruleForm.small_id=''
					}
				});
			},
			remoteMethod(ip){
				if (ip !== '') {
				this.loading = true;
				axios.post(this.https+'home/release/likeuserlist',{uip:ip})
					.then((res)=>{
						this.loading = false;
						console.log(res.data);   
						this.options=res.data.data
					})
					.catch(function(error){
						console.log(error);
					}) 	
				} else {
				this.options = [];
				}
			}
		},
		components: {
	
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
	.release {
		padding: 20px 0;
		background: white;
		.buttonbox{
			text-align: center;
		}
	}
</style>

<!--<template>
	<div id="">
			<div>发布问题</div>
			<router-link to="/release">go 子路由1</router-link>
			<router-link to="/release/add2">go 子路由2</router-link>
			<router-view/>
			<foot/>
	</div>	
</template>

<script>
import foot from 'base/footer'	
export default {
	components:{
		foot
	}  
}
</script>

<style>
</style>-->