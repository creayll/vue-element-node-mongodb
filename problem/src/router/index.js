import Vue from 'vue'
import Router from 'vue-router'
import loginindex from 'components/login'		//登录首页
import login from 'components/login/login'		//登录
import register from 'components/login/register'		//注册


import pushmessage from 'components/pushmessage'		//消息

import home from 'components/home'			//首页

import solve from 'components/solve'		//解决问题  
import solvedetail from 'components/solve/solvedetail'		//解决问题详情
import bid from 'components/solve/bid' //解决问题详情   子导航投标
import message from 'components/solve/message' //解决问题详情   子导航留言


import release from 'components/release' //发布问题

import teachers from 'components/teachers' //我要拜师
import teacherdetail from 'components/teachers/teacherdetail' //我要拜师 详情

import cooperation from 'components/cooperation' //商务合作
import cooperate from 'components/cooperation/cooperate' //商务合作
import contact from 'components/cooperation/contact' //商务合作
import about from 'components/cooperation/about' //商务合作


import personal from 'components/personal' //个人中心
import mydata from 'components/personal/mydata' //我的资料
import myteacher from 'components/personal/myteacher' //我的师傅
import myapprentice from 'components/personal/myapprentice' //我的徒弟
import mybid from 'components/personal/mybid' //我的投标
import mycollection from 'components/personal/mycollection' //我的收藏
import myfollow from 'components/personal/myfollow' //我的关注
import myconsumption from 'components/personal/myconsumption' //我的消费
import mypushstorage from 'components/personal/mypushstorage' //我的推存


import NotFound from 'components/NotFound' //NotFound

Vue.use(Router)

export default new Router({
  routes: [
	{
      path: '/',
      redirect:'/login',     
      component: loginindex
   	},     
	{
      path: '/login',
      component: loginindex,
      children: [      
        {
            path:'/',
            component:login,      
        },{
            path:'register',
            component:register         
        }        
      ]          
    },  	
    {
      path: '/home',
      name: 'home',
      component: home
    },  	
    {
      path: '/pushmessage',
      name: 'pushmessage',
      component: pushmessage
    },{
      path: '/solve',
      name: 'solve',
      component: solve
    },{
      path: '/solve/solvedetail',
      component: solvedetail,
      children: [      
        {
            path:'/',
            component:bid
        },    
        {
            path:'message',
            component:message
        }              
      ]      
    },{
      path: '/release',
      name: 'release',
      component: release
    },{
      path: '/teachers',
      name: 'teachers',
      component: teachers
    },{
      path: '/teachers/teacherdetail',
      name: 'teacherdetail',
      component: teacherdetail
    },{
      path: '/cooperation',
      component: cooperation,
      children: [      
        {
            path:'/',
            component:cooperate
        },    
        {
            path:'contact',
            component:contact
        },    
        {
            path:'about',
            component:about
        }              
      ]        
    },{	   	    	
      path: '/personal',
      component: personal,    
      children: [      
        {
            path:'/',
            component:mydata,
			    	meta:{
							islogin:true,//需要验证
						},                
        },    
        {
            path:'myteacher',
            component:myteacher,
			    	meta:{
							islogin:true,//需要验证
						},                
        },    
        {
            path:'myapprentice',
            component:myapprentice,
			    	meta:{
							islogin:true,//需要验证
						},                
        },    
        {
            path:'mybid',
            component:mybid,
			    	meta:{
							islogin:true,//需要验证
						},                
        },    
        {
            path:'mycollection',
            component:mycollection,
			    	meta:{
							islogin:true,//需要验证
						},                
        },    
        {
            path:'myfollow',
            component:myfollow,
			    	meta:{
							islogin:true,//需要验证
						},                
        },    
        {
            path:'myconsumption',
            component:myconsumption,
			    	meta:{
							islogin:true,//需要验证
						},                
        },    
        {
            path:'mypushstorage',
            component:mypushstorage,
			    	meta:{
							islogin:true,//需要验证
						},                
        }              
      ]        
    },{
    	path:'*',
    	component:NotFound
    }//全不匹配的情况下，返回404，路由按顺序从上到下，依次匹配。最后一个*能匹配全部，
  ]
})
