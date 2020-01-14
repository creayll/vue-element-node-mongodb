<template>
	<div class="header" :style="{background: color}">
		<div class="nav">
			<router-link class="item" v-for='(item,i) in nav' :to='item.path' :key='i'>{{item.name}}</router-link>
		</div>
		<div class="nav-right">
			<router-link to="/pushmessage" style="float: left;color: white;font-size: 13px;margin-right: 20px;vertical-align: middle;position: relative;">
			  	<i style="font-size: 22px;vertical-align: middle;" class="el-icon-message"></i>
			  	<span class="dian" v-show='isshow'></span>					
			</router-link>
			<el-dropdown trigger="click" style="float: left;">
				<span class="el-dropdown-link">
			   		<img class="logo" src="../assets/logo.png"/> 刘杰<i class="el-icon-arrow-down el-icon--right"></i>
			  	</span>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item icon="el-icon-user-solid">
						<router-link to="/personal">个人中心</router-link>
					</el-dropdown-item>
					<el-dropdown-item icon="el-icon-video-pause">
						<router-link to="/login">登录</router-link>
					</el-dropdown-item>	
					<el-dropdown-item icon="el-icon-video-play">
						<router-link to="/login/register">注册</router-link>
					</el-dropdown-item>					
					<el-dropdown-item icon="el-icon-s-release">
						<router-link to="/login">退出</router-link>
					</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>				
			<div style="float: left;color: white;font-size: 13px;margin-left: 20px;">
				<span class="witch" @click="elswitch">{{langvalue}}</span>
			  	<span class="demonstration">{{$t('Themes')}}</span>
			  	<el-color-picker v-model="color" style="vertical-align: middle;" @active-change='activechange'></el-color-picker>
			</div>				
		</div>		
		
		<!--<el-menu router :default-active="$route.path" class="el-menu-demo" mode="horizontal" @select="handleSelect" :style="{background: color}" text-color="#fff" active-text-color="#ffd04b">
			<el-menu-item v-for='(item,i) in nav' :index="item.path" :key='i'>{{item.name}}</el-menu-item>

		</el-menu>-->
	</div>
</template>

<script>
	import {mapActions, mapState,mapGetters} from "vuex";
	export default {
		data() {
			return {
				lang:'',
				langvalue:''
			};
		},
	    sockets: {
	        connect: function () {
				console.log('连接connect')
				 this.$socket.emit('message', '用户来啦');      //监听connect事件
	        },
	        message_client: function (data) {
	        	if(data){
	        	    console.log(data)
	        		this.$store.dispatch("pushstore/changeshow", true)
	        	}
	        },
	        customEmit: function (data) {
	            console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
	        }
	    },			
        mounted(){
             //用户每次刷新页面都判断 是否缓存过 语言，缓存过的话 选择其中显示的应该是缓存的语言
             if(localStorage.getItem('locale') == 'en'){
             	this.lang = this.$i18n.locale = 'en';
             	this.langvalue='英'
             }else{
             	this.lang = this.$i18n.locale = 'cn';
             	this.langvalue='中'
             }
        },		
		computed: {
		  // 对象中的state 和数组中的localJobTitle 都是和login中的参数一一对应。
		  	...mapState("themecolor",{
		   		color: state => state.color
			}),
		  	...mapState("pushstore",{
		   		isshow: state => state.isshow
			}),			
			nav(){
				return [{
					path:'/home',
					name:this.$t('home')
				},{
					path:'/solve',
					name:this.$t('solve'),					
				},{
					path:'/release',
					name:this.$t('release')
				},{
					path:'/teachers',
					name:this.$t('teachers'),					
				},{
					path:'/cooperation',
					name:this.$t('cooperation'),					
				}]
			}
		},
		methods: {
			handleSelect(key, keyPath) {
				console.log(key, keyPath);
			},
			activechange(val){
				this.$store.dispatch("themecolor/changethemecolor", val)
				localStorage.setItem('themecolor', val)
				console.log(this.color)
			},
			elswitch(){				
                if(this.lang == 'cn') {
                	var lang='en'
                     this.langvalue='英'
                } else if(this.lang == 'en') {
                	var lang='cn'
                    this.langvalue='中'
                }	
                localStorage.setItem('locale', lang)
                this.$i18n.locale =this.lang = lang    
			}
		}
	}
</script>

<style scoped="scoped" lang="less">
	.header {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 111;	
		line-height: 60px;		
		.nav{
			.item{
				width: 110px;
				text-align: center;
				color: white;
				display: inline-block;
			}
			.router-link-active{
				background: white;
				color: rgb(255, 208, 75);
				border-bottom: 2px solid rgb(255, 208, 75)!important;
			}
			.item:hover{
				background: white;
				color: rgb(255, 208, 75);
			}
		}
		.nav-right {
			height: 60px;
			line-height: 60px;
			float: right;
			margin-right: 10px;
			position: absolute;
			top: 50%;
			right: 10px;
			transform: translateY(-50%);
			.dian{
				border-radius: 100%;
				height: 5px;
				width: 5px;
				background: red;
				position: absolute;
				right: 4px;
				top: 22px;
				animation:show 1s infinite;	
			}
			@keyframes show{
				0% {top: 22px}
				10% {top:24px}
				100% {top:22}
			}			
			.el-dropdown{
				cursor: pointer;
			}
			.el-dropdown-link {
				vertical-align: middle;
				color: white;
				.logo {
					width: 30px;
					vertical-align: middle;
					border-radius: 100%;
				}
			}
			.witch{
				border: 1px solid white;
				padding: 2px 3px;
				vertical-align: middle;
				margin-right: 2px;
				cursor: pointer;
			}
			.demonstration{
				vertical-align: middle;
				margin-right: 2px;
			}
		}
	}
</style>