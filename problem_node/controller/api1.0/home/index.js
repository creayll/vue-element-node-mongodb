const Banner = require("../../../model/banner.js");
const commonbase = require('../../../prototype/commonbase');

class Index extends commonbase{
	constructor(){
		super()
		this.banner = this.banner.bind(this)	//改变this指向才能调用check
	}
	
	async banner(req, res, next){	//banner
		res.send({
			status: 1,
			message: 'banner'
		})
		
	}
	
	async recommend(req, res, next){	//推存牛人
		res.send({
			status: 1,
			message: '推存牛人'
		})
		
	}	
}

module.exports= new Index()
