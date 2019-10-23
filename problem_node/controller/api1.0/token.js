const User_list = require("../../model/user_list_admin.js");

class Token{
	async check(req, res, next) {
		var token=req.cookies.token
		console.log(token)
		User_list.findOne({token}).then((data)=>{		
			if(data){
				next();
			}else{
				res.send({
					status: 0,
					message: 'token失效',
				})				
			}		
		})
	}
	async exit(req, res, next){			//退出
		res.clearCookie('token');
		res.send({
			status: 1,
			message: '清除Cookie成功',
		})			
	}	
}
	
	
module.exports= new Token()	
