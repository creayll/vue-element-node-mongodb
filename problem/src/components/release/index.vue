<template>
	<div class="release">
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm container">
			<el-form-item label="标题" prop="name">
				<el-input v-model="ruleForm.name"></el-input>
			</el-form-item>
			<el-form-item label="问题" prop="desc">
				<el-input type="textarea" v-model="ruleForm.desc"></el-input>
			</el-form-item>
			<el-form-item label="奖励" prop="num">
				<el-input-number v-model="ruleForm.num" :precision="2" :step="5" @change="handleChange" :min="5" :max="10000" label="描述文字"></el-input-number>
			</el-form-item>	
			<el-form-item label="大类" prop="region1">
				<el-select v-model="ruleForm.region1" placeholder="请选择大类">
					<el-option label="前端" value="shanghai"></el-option>
					<el-option label="后台" value="beijing"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="小类" prop="region2">
				<el-select v-model="ruleForm.region2" placeholder="请选择小类">
					<el-option label="html" value="shanghai"></el-option>
					<el-option label="css" value="beijing"></el-option>
				</el-select>
			</el-form-item>		
			<el-form-item label="邀请" prop="num">
			  <el-select v-model="ruleForm.value1" multiple placeholder="请选择">
			    <el-option
			      v-for="(item,i) in options"
			      :key="i"
			      :label="item.label"
			      :value="item.value">
			    </el-option>
			  </el-select>		
			</el-form-item>			
			<el-form-item label="置顶" prop="resource">
				<el-radio-group v-model="ruleForm.resource">
					<el-radio label="否"></el-radio>
					<el-radio label="是"></el-radio>
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
		        options: [{
		          value: '选项1',
		          label: '黄金糕'
		        }, {
		          value: '选项2',
		          label: '双皮奶'
		        }, {
		          value: '选项3',
		          label: '蚵仔煎'
		        }, {
		          value: '选项4',
		          label: '龙须面'
		        }, {
		          value: '选项5',
		          label: '北京烤鸭'
		        }, {
		          value: '选项3',
		          label: '蚵仔煎'
		        }, {
		          value: '选项4',
		          label: '龙须面'
		        }, {
		          value: '选项5',
		          label: '北京烤鸭'
		        }],       
				ruleForm: {
					name: '',
					desc: '',
					num: 5,
					value1: [],
					region1: '',
					region2: '',
					resource: '否'
				},
				rules: {
					name: [{
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
					desc: [{
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
					num: [{
						required: true,
						trigger: 'change'
					}],
					region1: [{
						required: true,
						message: '请选择大类',
						trigger: 'change'
					}],
					region2: [{
						required: true,
						message: '请选择小类',
						trigger: 'change'
					}]
				}
			};
		},
		mounted() {

		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						alert('submit!');
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