var Problem=require('../../../model/problem.js')
const User_list = require("../../../model/user_list.js");
var async=require("async");



class Problem_list{
	async read(req,res,next){
        var query = req.body
        var page = query.page||1   //第几页　　　　默认第一页
        var limit = query.limit||8  //每页多少条　　默认８条
        var skip = (page-1)*limit
		Problem.count().then((num)=>{
			console.log(num)
			var total = Math.ceil(num/limit)
			Problem.find().limit(limit).skip(skip).populate({
				path: 'user_id',
				select:'name ip'
			}).then((data)=>{
				async.forEachOf(data,(list, key2, callback1)=>{
					User_list.find({_id:{$in:list.Invitation}}).then((result)=>{	
						list.Invitation=result
						callback1()
					})							
				}, err => {
					res.send({
						status: 1,
						message: '查询成功',
						data:data,
						total:total,
						allnum:num,
						size:limit
					})    				
				})						
			})	
		})
	}

	async find(req,res,next){
		var user=req.body.user
		User_list.findOne({$or: [{name: user}, {ip: user}]},{psd:0}).then((data)=>{
			console.log(data)
			var query = req.body
			var limit = query.limit||8  //每页多少条　　默认８条
			if(data){				
				var page = query.page||1   //第几页　　　　默认第一页
				var skip = (page-1)*limit		
				Problem.count({user_id:data._id}).then((num)=>{
					var total = Math.ceil(num/limit)
					Problem.find({user_id:data._id}).limit(limit).skip(skip).populate({
						path: 'user_id',
						select:'name ip'
					}).then((result1)=>{	
						async.forEachOf(result1,(list, key2, callback1)=>{
							User_list.find({_id:{$in:list.Invitation}}).then((result2)=>{	
								list.Invitation=result2
								callback1()
							})							
						}, err => {
							res.send({
								status: 1,
								message: '查询成功',
								data:result1,
								total:total,
								allnum:num,
								size:limit
							})    						
						})	
					})					
				})	
			}else{
				res.send({
					status: 1,
					message: '查询成功',
					data:data,
					total:0,
					allnum:0,
					size:limit
				})    					
			}			
		})
	}		
	
	async isforce(req,res,next){ //强制下架和解封下架
		var isforce=!req.body.isforce
		var _id=req.body._id
		Problem.update({_id:_id},{isforce:isforce}).then((data)=>{
			res.send({
				status: 1,
				message: '操作成功',
				data:data
			})  			
		})
	}

	async delete(req,res,next){	//删除 
		var query=req.body
		Problem.deleteOne(query).then((data)=>{
			res.send({
				status: 1,
				message: '删除成功',
				data:data
			})  			
		})		
	}

	async add(req,res,next){
//		var problem_list=new Problem({
//			title:'11111',
//			content:'1111',
//			price:21,
//			read:212,
//			state:1,	//0下架  1上架   2已被投标
//			isplacement:1,	// 为1时置顶   			
//		})
//		problem_list.save((err,data)=>{
//			res.send({
//				status: 1,
//				message: 'problem_listread',	
//				data:data
//			})
//		})
	}	
}

module.exports= new Problem_list()
