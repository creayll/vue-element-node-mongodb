const Banner = require("../../../model/banner.js");
const Problem = require("../../../model/problem.js");
const commonbase = require('../../../prototype/commonbase');
const Collection = require("../../../model/collection.js");
var Bid=require('../../../model/bid.js')
const async=require("async");

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
		
	}	
}

module.exports= new Index()
