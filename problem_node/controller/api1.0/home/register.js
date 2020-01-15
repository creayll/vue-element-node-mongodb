const User_list = require("../../../model/user_list.js");
const crypto = require("crypto");
//const commonbase = require('../../../prototype/commonbase');

class Register{
	async register(req, res, next){
		var query=req.body
	  	let name = req.body.name;
	  	let psd = req.body.pass;
	  	let md5 = crypto.createHash("md5");	
	  	let md5psd = md5.update(psd).digest("hex");
	  	User_list.findOne({name:name}).then((data)=>{
	  		if(data){
				res.send({
					status: 0,
					message: '此账号已被注册',
				})		  			
	  		}else{
			  	User_list.countDocuments().then((num)=>{	
			  		var num= num.toString()	  		
				  	if(num.length<8){		  				  		
						var num =num.padStart(8,'0')
				  	}else{
				  		num++
				  	}
					var user_list=new User_list({
						name:name,
						psd:md5psd,
						ip:num
					})
					user_list.save().then((data)=>{
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
