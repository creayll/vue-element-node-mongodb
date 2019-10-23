import Vue from 'vue'
import Router from 'vue-router'

import login from 'components/login'				//登录

import echarts from 'components/home'					//首页
import banner from 'components/home/banner'					//首页
import copyright from 'components/home/copyright'

import problem_list from 'components/problem'		//问题列表

import message from 'components/push'		//消息推送
import group_push from 'components/push/group_push'		//消息推送
import personal_push from 'components/push/personal_push'


import classification from 'components/classification'		//分类
import large_class from 'components/classification/large_class'
import small_class from 'components/classification/small_class'



import user_list from 'components/user_list'						//用户


import phone from 'components/about'						//关于
import introduction from 'components/about/introduction' 



import admin_list from 'components/Jurisdiction'						//权限
import admin_add from 'components/Jurisdiction/admin_add' 
import role_read from 'components/Jurisdiction/role_read' 
import role_add from 'components/Jurisdiction/role_add' 

import log from 'components/log'						//日志

Vue.use(Router)

export default new Router({
  routes: [
		{
      path: '/',
      redirect:'/login',     
      component: login
   	},   
		{
      path: '/login',
      name: 'login',
      component: login,
      meta:{
      	islogin:true
      }
   	},    	
    {
      path: '/home',
      name: 'echarts',
      component: echarts
    },{
      path: '/home/banner',
      name: 'banner',
      component: banner
    },{
      path: '/home/copyright',
      name: 'copyright',
      component: copyright
    },{
      path: '/problem_list',
      name: 'problem_list',
      component: problem_list
    },{
      path: '/push',
      name: 'message',
      component: message
    },{
      path: '/push/group_push',
      name: 'group_push',
      component: group_push
    },{
      path: '/push/personal_push',
      name: 'personal_push',
      component: personal_push
    },{
      path: '/user_list',
      name: 'user_list',
      component: user_list
    },{
      path: '/classification',
      name: 'classification',
      component: classification
    },{
      path: '/classification/large_class',
      name: 'large_class',
      component: large_class
    },{
      path: '/classification/small_class',
      name: 'small_class',
      component: small_class
    },{
      path: '/about',
      name: 'about',
      component: phone
    },{
      path: '/about/introduction',
      name: 'introduction',
      component: introduction
    },{
      path: '/Jurisdiction',
      name: 'Jurisdiction',
      component: admin_list
    },{
      path: '/Jurisdiction/admin_add',
      name: 'admin_add',
      component: admin_add
    },{
      path: '/Jurisdiction/role_read',
      name: 'role_read',
      component: role_read
    },{
      path: '/Jurisdiction/role_add',
      name: 'role_add',
      component: role_add
    },{
      path: '/log',
      name: 'log',
      component: log
    }   
  ]
})
