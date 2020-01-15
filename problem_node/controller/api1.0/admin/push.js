const Push = require("../../../model/push.js");
//const User_list = require("../../../model/user_list.js");
//const commonbase = require('../../../prototype/commonbase');

class Message_push{
	async save(req, res, next){
	    console.log(121212)
	    console.log(req.cookies)
		var uid=req.cookies.user._id
		var query=req.body
		query.uid=uid
		var push=new Push(query)
		push.save().then((data)=>{
			console.log(data)
			res.send({
				status: 1,
				message: '储存成功',
				data:data
			})				
		})
	}
	
	async read(req,res,next){
		Push.find().populate({
				path: 'uid',
				select:'name'
			}).then((data)=>{
				res.send({
					status: 1,
					message: '查询成功',
					data:data
				})				
		})
	}	
}

module.exports= new Message_push()
