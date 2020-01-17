const Push = require("../../../model/push.js");
const User_list = require("../../../model/user_list.js");
//const commonbase = require('../../../prototype/commonbase');

class Message_push{
	async save(req, res, next){    //推送群组
		var user=req.cookies.user
		var query=req.body
		query.uid=user._id
		var push=new Push(query)		
		push.save().then((data)=>{	    
			// 推送群组类型   1==vip, 0==普通
            res.send({
                status: 1,
                message: '储存成功',
                data:data
            })                      
		})
	}

    async save_personal(req, res, next){ //推送个人
        var user=req.cookies.user
        var query=req.body
        query.uid=user._id
        var push=new Push(query)
        push.save().then((data)=>{
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
	
    async findone(req,res,next){
        var query=req.body
        User_list.findOne(query,{psd:0}).then((data)=>{
            res.send({
                status: 1,
                message: '查询成功',
                data:data
            })         
        })
    }
    
    async querynum(req,res,next){
        var user=req.cookies.user
        console.log(user)
        Push.find({grouptype:{$elemMatch:{$eq:user.type}}}).then((data)=>{
            res.send({
                status: 1,
                message: '查询成功',
                data:data
            })               
        })
    }
}

module.exports= new Message_push()
