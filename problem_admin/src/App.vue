<template>
	<div id="app">
		<div v-if="$route.meta.islogin">
			<router-view/>
		</div>		
		<el-container style="height: 100%;" v-else>
			<el-header style="text-align: center; font-size: 12px;position: relative;">
				<p style="font-size: 20px;letter-spacing: 1px;">后台管理系统</p>
				<div style="position: absolute;right:20px ;top: 0;">
					<el-dropdown>
						<i class="el-icon-setting" style="margin-right: 15px"></i>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item><div @click='exit'>退出</div></el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
					<span>王小虎</span>
				</div>
			</el-header>
			<el-container>
				<el-aside width="200px">
					<el-menu :default-openeds="['/'+this.$route.path.split('/')[1]]" :unique-opened=true>
						<el-submenu index="/home">
							<template slot="title"><i class="el-icon-message"></i>首页</template>
							<el-menu-item-group>
								<el-menu-item index="1-1"><router-link to='/home'>统计</router-link></el-menu-item>
								<el-menu-item index="1-2"><router-link to='/home/banner'>banner</router-link></el-menu-item>
								<el-menu-item index="1-3"><router-link to='/home/copyright'>版权</router-link></el-menu-item>
							</el-menu-item-group>
						</el-submenu>
						
						<el-submenu index="/problem_list">
							<template slot="title"><i class="el-icon-menu"></i>问题</template>
							<el-menu-item-group>
								<el-menu-item index="2-1"><router-link to='/problem_list'>问题列表</router-link></el-menu-item>
							</el-menu-item-group>
						</el-submenu>
						<el-submenu index="/push">
							<template slot="title"><i class="el-icon-menu"></i>推送</template>
							<el-menu-item-group>
								<el-menu-item index="7-1"><router-link to='/push'>推送列表</router-link></el-menu-item>
								<el-menu-item index="7-2"><router-link to='/push/group_push'>群组推送</router-link></el-menu-item>
								<el-menu-item index="7-3"><router-link to='/push/personal_push'>个人推送</router-link></el-menu-item>
							</el-menu-item-group>
						</el-submenu>						
						<el-submenu index="/classification">
							<template slot="title"><i class="el-icon-menu"></i>分类</template>
							<el-menu-item-group>
								<el-menu-item index="3-1"><router-link to='/classification'>分类列表</router-link></el-menu-item>
								<el-menu-item index="3-2"><router-link to='/classification/large_class'>添加大类</router-link></el-menu-item>
								<el-menu-item index="3-3"><router-link to='/classification/small_class'>添加小类</router-link></el-menu-item>
							</el-menu-item-group>
						</el-submenu>						
						<el-submenu index="/user_list">
							<template slot="title"><i class="el-icon-setting"></i>用户</template>
							<el-menu-item-group>
								<el-menu-item index="4-1"><router-link to='/user_list'>用户列表</router-link></el-menu-item>
							</el-menu-item-group>
						</el-submenu>
						<el-submenu index="/about">
							<template slot="title"><i class="el-icon-setting"></i>关于</template>
							<el-menu-item-group>
								<el-menu-item index="5-1"><router-link to='/about'>联系电话</router-link></el-menu-item>
								<el-menu-item index="5-2"><router-link to='/about/introduction'>关于我们</router-link></el-menu-item>
							</el-menu-item-group>
						</el-submenu>
						<el-submenu index="/Jurisdiction">
							<template slot="title"><i class="el-icon-setting"></i>权限</template>
							<el-menu-item-group>
								<el-menu-item index="6-1"><router-link to='/Jurisdiction'>管理员</router-link></el-menu-item>
								<el-menu-item index="6-2"><router-link to='/Jurisdiction/admin_add'>添加管理</router-link></el-menu-item>
								<el-menu-item index="6-2"><router-link to='/Jurisdiction/role_read'>角色列表</router-link></el-menu-item>
								<el-menu-item index="6-2"><router-link to='/Jurisdiction/role_add'>添加角色</router-link></el-menu-item>
							</el-menu-item-group>
						</el-submenu>	
						<!-- <el-submenu index="/log">
							<template slot="title"><i class="el-icon-setting"></i>日志</template>
							<el-menu-item-group>
								<el-menu-item index="8-1"><router-link to='/log'>日志列表</router-link></el-menu-item>
							</el-menu-item-group>
						</el-submenu>							 -->
					</el-menu>
				</el-aside>
				<el-main>
					<router-view/>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script>
	export default {
		name: 'App',
		data() {
			return {
				
			}
		},	
 		mounted(){

 		},	
 		methods:{
			exit(){
			    axios.get(this.https+'admin/exit')
				    .then((res)=>{
				    	if(res.data.status==1){
				    		this.$router.push({path:'/login'})
				    	}	        
				    })
				    .catch(function(error){
				        console.log(error);
					})					
			} 			
 		}
	};
</script>

<style lang="less">
	@blue:#409EFF;
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		height: 100%;
	}
	.el-pagination{
	    text-align: center;
	    margin-top: 10px;		
	}
	.el-submenu__title{
		color: white;
	}
	.el-submenu__title i{
		color: white;
	}
	.el-menu-item{
		color: white;
	}
	.el-menu-item a{
		color: white;
	}
	.el-header {
		background-color: @blue;
		color: white;
		line-height: 60px;
	}
	.el-aside{
		background-color: @blue;
	}
	.el-menu{
		background-color: @blue;
		border-bottom: 1px solid @blue;
	}
	.el-dropdown{
		color: white;
	}
	
	.el-aside {
		color: #333;
	}
	.el-menu-item a{
		display: block;
	}
	.el-menu-item .router-link-exact-active{
		color: springgreen;
	}
	.is-opened .el-submenu__title{
		background: darkblue;
	}
</style>