const config = require('../config');
const api=config.api;
const home =require('./home/home.js');
const login =require('./home/login.js');
const register =require('./home/register.js');
const push =require('./admin/push.js');

const token = require('../controller/'+api+'/home/token');
module.exports = (app)=>{
	app.use('/', home);
	app.use('/home/login', login);
	app.use('/home/register', register);  
	app.use('/home/exit', token.exit);    //退出
	app.use('/home/push',token.check, push);
}
