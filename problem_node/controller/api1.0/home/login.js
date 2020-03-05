const User_list = require("../../../model/user_list.js");
const crypto = require("crypto");
// 引入jwt token工具
const JwtUtil = require('../../../utils/jwt');
class Login{
    async login(req, res, next){    
        let query=req.body
        let name = req.body.name;
        let psd = req.body.pass;
        let md5psd = crypto.createHash("md5").update(psd).digest("hex");    
        let token=crypto.createHash("md5").update(new Date().toString()+60*60*60*10).digest("hex");       
        User_list.findOne({name:name,psd:md5psd},{psd:0}).then((data,err)=>{  //{psd:0}过滤psd字段
            if(data){   
                console.log(data)
//              var token = new JwtUtil(data).generateToken()
                console.log(token)
                User_list.updateOne({name:name,psd:md5psd},{token:token},(err,result)=>{
                    if(err){console.log(err)}                    
                    res.send({
                        status: 1,
                        message: '登录成功',
                        user:data,
                        token:token
                    })                      
                })                              
            }else{
                res.send({
                    status: 0,
                    message: '账号或密码错误',
                })              
            }
        })      
    }
}

module.exports= new Login()
