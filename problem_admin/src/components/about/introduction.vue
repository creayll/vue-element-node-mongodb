<template>
	<div class="introduction">
		<div class="edit_container">
			<quill-editor v-model="content" ref="myQuillEditor" :options="editorOption" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)" @change="onEditorChange($event)">
			</quill-editor>
		</div>
		<div class="buttonbox">
			<el-button type="primary" @click="saveHtml('ruleForm')">保存</el-button>
		</div>

	</div>
</template>

<script>
	export default {
		name: 'App',
		data() {
			return {
				content: `<p>hello world</p>`,
				editorOption: {}
			}
		},
		computed: {
			editor() {
				return this.$refs.myQuillEditor.quill;
			},
		},
		mounted(){
		    axios.get(this.https+'admin/about/read')
			    .then((res)=>{
			        console.log(res.data);   
			        this.content= res.data.data.introduction
			    })
			    .catch(function(error){
			        console.log(error);
				})				
		},		
		methods: {
			onEditorReady(editor) { // 准备编辑器
			},
			onEditorBlur() {}, // 失去焦点事件
			onEditorFocus() {}, // 获得焦点事件
			onEditorChange() {}, // 内容改变事件
			saveHtml: function(event) {
			    axios.post(this.https+'admin/about/update',{introduction:this.content})
				    .then((res)=>{
				        if(res.data.code==1){
					        this.$message({
					          message: '恭喜您，更新成功',
					          type: 'success'
					        });				        	
				        }		 				       	      			    	
				    })
				    .catch(function(error){
				        console.log(error);
					})	
			}
		}
	}
</script>

<style scoped lang="less">
	.introduction {
		height: 100%;
		.edit_container {
			height: 500px;
			.quill-editor {
				height: 400px;
			}
		}
		.buttonbox {
			text-align: center;
		}
	}
</style>