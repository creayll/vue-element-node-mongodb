const User_list_admin = require("../../../model/user_list_admin.js");
const crypto = require("crypto");
//const commonbase = require('../../../prototype/commonbase');

class Register{
	async register(req, res, next){
		var query=req.body
	  	let name = req.body.name;
	  	let psd = req.body.psd;
	  	let md5 = crypto.createHash("md5");	
	  	let md5psd = md5.update(psd).digest("hex");
	  	User_list_admin.findOne({name:name}).then((data)=>{
	  		if(data){
				res.send({
					status: 0,
					message: '此账号已被注册',
				})		  			
	  		}else{
			  	User_list_admin.countDocuments().then((num)=>{	
			  		var num= num.toString()	  		
				  	if(num.length<8){		  				  		
						var num =num.padStart(8,'0')
				  	}else{
				  		num++
				  	}
					var user_list_admin=new User_list_admin({
						name:name,
						psd:md5psd,
						is_admin:true,
						ip:num
					})
					user_list_admin.save().then((data)=>{
						res.send({
							status: 1,
							message: '注册成功',
							data:data
						})			
					})		  			
			  	})	  			
	  		}
	  	})	  	
	}
}

module.exports= new Register()
