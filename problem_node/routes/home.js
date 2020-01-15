const home =require('./home/home.js');
const login =require('./home/login.js');
const register =require('./home/register.js');
const config = require('../config');
const api=config.api;
//const token = require('../controller/'+api+'/token');
module.exports = (app)=>{
	app.use('/', home);
	app.use('/home/login', login);
	app.use('/home/register', register);  
	
}
