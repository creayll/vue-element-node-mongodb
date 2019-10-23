// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
window.axios = require('axios');
Vue.config.productionTip = false

Vue.prototype.https = 'http://localhost:3000/';//测试环境

import infiniteScroll from 'vue-infinite-scroll'
Vue.use(infiniteScroll)

import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor)


//import IEcharts from 'vue-echarts-v3/src/lite.js'
import 'echarts/lib/chart/pie';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/title';

//Vue.use(IEcharts)

router.beforeEach((to,from,next) => {
	next() 
})

//导入格式化时间的插件
import moment from 'moment'
Vue.prototype.$moment = moment


import { Menu,Submenu,MenuItem,MenuItemGroup,Container,Header,Aside,Main,Footer,
	Dropdown,DropdownMenu,DropdownItem,Button,Table,TableColumn,Upload,Dialog,
	FormItem,Form,Row,Col,Input,Pagination,Option,Select,Checkbox,RadioButton,
	RadioGroup,Radio,CheckboxGroup,Message,
} from 'element-ui';
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Button)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Upload)
Vue.use(Dialog)
Vue.use(FormItem)
Vue.use(Form)
Vue.use(Row)
Vue.use(Col)
Vue.use(Input)
Vue.use(Pagination)
Vue.use(Select)
Vue.use(Option)
Vue.use(Checkbox)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(CheckboxGroup)
Vue.prototype.$message = Message

import VueSocketIO from 'vue-socket.io'
Vue.use(new VueSocketIO({
    debug: true,
    connection: 'http://localhost:3000',
}))

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
