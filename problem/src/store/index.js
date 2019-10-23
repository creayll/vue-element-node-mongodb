

import vue from 'vue'
import vuex from 'vuex'
import themecolor from './themecolor'
import loginstore from './loginstore'
import pushstore from './pushstore'
vue.use(vuex);
export default new vuex.Store({
	modules: {
		themecolor: themecolor,	//主题背景
		loginstore: loginstore,	//登录状态
		pushstore:  pushstore,	//推送消息小圆点显示
	}
});