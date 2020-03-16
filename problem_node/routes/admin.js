const login =require('./admin/login.js');
const register =require('./admin/register.js');
const home =require('./admin/home.js');
const problem =require('./admin/problem_list.js');
const about =require('./admin/about.js');
const navigation =require('./admin/navigation.js');
const Jurisdiction =require('./admin/Jurisdiction.js');
const push =require('./admin/push.js');
const user =require('./admin/user.js');
const config = require('../config');
const api=config.api;
const token = require('../controller/'+api+'/admin/token');


module.exports = (app)=>{
	app.use('/admin/register', register);	
	app.use('/admin/login', login);	
	app.use('/admin/exit', token.exit);	//退出
	app.use('/admin/home', home);
	app.use('/admin/problem',token.check, problem);
	app.use('/admin/push',token.check, push);
	app.use('/admin/navigation',token.check, navigation);	
	app.use('/admin/user',token.check, user);
	app.use('/admin/about',token.check, about); //关于我们
	app.use('/admin/Jurisdiction',token.check, Jurisdiction);
}