const Banner = require("../../../model/banner.js");
//const commonbase = require('../../../prototype/commonbase');

class Login{
	constructor(){
		
	}
	async login(req, res, next){
		res.send({
			status: 1,
			message: '登录成功'
		})
		
	}
}

module.exports= new Login()
