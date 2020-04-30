const config = require('../config');
const api=config.api;
const home =require('./home/home.js');
const login =require('./home/login.js');
const register =require('./home/register.js');
const push =require('./home/push.js');
const about =require('./home/about.js');
const release =require('./home/release.js');
const personal =require('./home/personal.js');
const teachers =require('./home/teachers.js');
const problem =require('./home/problem.js');


module.exports = (app)=>{
	app.use('/home/index', home);
	app.use('/home/login', login);	//登录
	app.use('/home/register', register);  //注册
	app.use('/home/push', push);　//消息推送信息
	app.use('/home/problem', problem); //解决问题
	app.use('/home/release', release); //发布问题
	app.use('/home/teachers', teachers); //拜师
	app.use('/home/about', about); //
	app.use('/home/personal', personal); //个人中心
	

}
