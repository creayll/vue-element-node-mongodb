const User_list=require('../../../model/user_list.js')
const crypto = require("crypto");
const JwtUtil = require('../../../utils/jwt'); 
class Token{
	async check(req, res, next) {	    
		const token= req.get("token");        
//      var token = new JwtUtil(token).verifyToken()
		if(token){
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
		}else{
            res.send({
                status: 0,
                message: 'token丢失',
            })      		    
		}
	}  	
}
	
	
module.exports= new Token()	
