const Banner = require("../../../model/banner.js");
const Problem = require("../../../model/problem.js");
const commonbase = require('../../../prototype/commonbase');
const Collection = require("../../../model/collection.js");
var Bid=require('../../../model/bid.js')
const async=require("async");

class Index extends commonbase{
	
	async bannerread(req, res, next){	//banner
		Banner.find().limit(3).then((data)=>{
			res.send({
				status: 1,
				message: 'banner',
				data:data
			})
		})
	}
	
	async recommend(req, res, next){	//推存牛人
		
	}
	
	
}

module.exports= new Index()
