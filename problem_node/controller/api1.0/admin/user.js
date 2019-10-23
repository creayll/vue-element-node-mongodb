var User_list=require('../../../model/user_list.js')

class User{
	async read(req,res,next){
		User_list.find({},{psd:0}).then((data)=>{
			res.send({
				code: 1,
				message: '查询成功',
				data: data
			});		
		})
	}	
	
	async find(req,res,next){
		var user=req.body.user
		User_list.find({$or: [{name: {$regex : user}}, {ip: {$regex : user}}]},{psd:0}).then((data)=>{
			res.send({
				code: 1,
				message: '查询成功',
				data: data
			});		
		})
	}		
}

module.exports=new User()
