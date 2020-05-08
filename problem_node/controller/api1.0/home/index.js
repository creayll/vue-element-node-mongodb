const Banner = require("../../../model/banner.js");
const Problem = require("../../../model/problem.js");
const commonbase = require('../../../prototype/commonbase');
const Collection = require("../../../model/collection.js");
const Copyright = require("../../../model/copyright.js");
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
	
	async copyrightread(req, res, next) { //读取版权
		Copyright.findOne().then((data)=>{
			res.send({
				code: 1,
				message: '读取版权成功',
				data:data
			})				
		})
	}
	
	
}

module.exports= new Index()
