const User_list=require('../../../model/user_list.js')
const crypto = require("crypto");
const JwtUtil = require('../../../utils/jwt'); 
class Token{
	async check(req, res, next) {	    
		const token= req.get("Authorization");        
//      var token = new JwtUtil(token).verifyToken()
        console.log("token:5")
        console.log("token:"+token)
		if(token){
            User_list.findOne({token}).then((data)=>{   
//              console.log(data)
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
	
    async exit(req, res, next){         //退出
        res.clearCookie('token');
        res.clearCookie('user');
        res.send({
            status: 1,
            message: '清除Cookie成功',
        })          
    }   	
}
	
	
module.exports= new Token()	
