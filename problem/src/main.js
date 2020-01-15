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


import {Checkbox,CheckboxGroup,TimePicker,InputNumber,Input,Radio,RadioGroup,Switch,Form,FormItem,Pagination,ColorPicker,Row, Button, Select, Option, DatePicker, Dropdown, DropdownMenu, DropdownItem, Menu, MenuItem, Submenu, Carousel, CarouselItem, Image,Col,Table,TableColumn} from 'element-ui';
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
Vue.config.productionTip = false

Vue.prototype.GLOBAL = {
	themebackground:'#409EFF'
}

router.afterEach((to,from,next) => {
	console.log("to:"+to)
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
