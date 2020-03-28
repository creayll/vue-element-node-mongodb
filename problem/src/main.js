// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import i18n from './i18n'
import store from './store'
window.axios = require('axios');
Vue.prototype.https = 'http://localhost:3000/';//测试环境
import VueSocketIO from 'vue-socket.io'
Vue.use(new VueSocketIO({
    debug: true,
    connection: 'http://localhost:3000',
}))

//导入格式化时间的插件
import moment from 'moment'
Vue.prototype.$moment = moment

import {Checkbox,CheckboxGroup,TimePicker,InputNumber,Input,Radio,RadioGroup,Switch,Form,
    FormItem,Pagination,ColorPicker,Row, Button, Select, Option, DatePicker, Dropdown, 
    DropdownMenu, DropdownItem,Menu, MenuItem, Submenu, Carousel, CarouselItem, Image,
    Col,Table,TableColumn,Badge,MessageBox,Message,Tabs,TabPane} from 'element-ui';
Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 };
Vue.use(Row)
Vue.use(Button)
Vue.use(Select)
Vue.use(Option)
Vue.use(DatePicker)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(CarouselItem)
Vue.use(Carousel)
Vue.use(Image)
Vue.use(Col)
Vue.use(ColorPicker)
Vue.use(Pagination)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Switch)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(TimePicker)
Vue.use(CheckboxGroup)
Vue.use(Checkbox)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Badge)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.prototype.$msgbox=MessageBox
Vue.prototype.$message=Message
Vue.prototype.$prompt = MessageBox.prompt


Vue.config.productionTip = false
Vue.prototype.GLOBAL = {
	themebackground:'#409EFF'
}


axios.interceptors.request.use(
  config => {
    config.headers['token'] = localStorage.getItem('token')||'';
    var user=store.state.loginstore.loginstate
    if(user){
      var headeruser={
        _id:user._id,
        type:user.type,
        ip:user.ip
      }
    }
    config.headers['user'] = JSON.stringify(headeruser);
    return config
  },
  error => Promise.error(error)
)


axios.interceptors.response.use(
  response => {
    if(response.data.status==-1){
      router.push({path:'/login',query:{frompath:router.currentRoute.fullPath}}) 
      return false
    }
    return response;
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  }
);

router.beforeEach(( to, form, next)=>{
  if(window.localStorage.user&&window.localStorage.user!=='null'){
    if(to.path === '/login'){
      //登录状态下 访问login.vue页面 会跳到index.vue     
      next({path: '/home'});
    }else{
      next();
    }
  }else{
    // 如果没有session ,访问任何页面。都会进入到 登录页
    if (to.path === '/login'||to.path === '/login/register') { // 如果是登录页面的话，直接next() -->解决注销后的循环执行bug
      next();
    } else { // 否则 跳转到登录页面
      next({ path: '/login' });
    }
  }
}) //在跳转之前执行


router.afterEach((to,from,next) => {
  window.scrollTo(0,0);
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  store,
  router,
  components: { App },
  template: '<App/>'
})
