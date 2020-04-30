var User_list=require('../../../model/user_list.js')

class User{
	async read(req,res,next){
		var query = req.body
		var limit = query.limit||8  //每页多少条　　默认８条
		var page = query.page||1   //第几页　　　　默认第一页
		var skip = (page-1)*limit		
		User_list.count().then((num)=>{
			var total = Math.ceil(num/limit)
			User_list.find({},{psd:0}).limit(limit).skip(skip).then((data)=>{
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
	}	
	
	async find(req,res,next){
		var query = req.body
		var limit = query.limit||8  //每页多少条　　默认８条
		var page = query.page||1   //第几页　　　　默认第一页
		var skip = (page-1)*limit	
		var user=query.user
		User_list.count({$or: [{name: user}, {ip: user}]}).then((num)=>{
			var total = Math.ceil(num/limit)
			User_list.find({$or: [{name: user}, {ip: user}]},{psd:0}).limit(limit).skip(skip).then((data)=>{
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
	}		
}

module.exports=new User()
