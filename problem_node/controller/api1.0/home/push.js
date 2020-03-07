const Push = require("../../../model/push.js");
const User_list = require("../../../model/user_list.js");

class Message_push{
    //查询一共有多少条数据
    async querynum(req,res,next){
        const user= JSON.parse(req.get("user")); 
        Push.count({$or:[{grouptype:{$elemMatch:{$eq:user.type}},isread:{$ne:true}},{arr_Appoint_id:{$elemMatch:{$eq:user.ip}},isread:{$ne:true}}]}).then((data)=>{
            res.send({
                status: 1,
                message: '查询成功',
                data:data
            })               
        })
    }
    //查询所有消息
    async findMessage(req,res,next){
        const user= JSON.parse(req.get("user")); 
        var query = req.body
        var page = query.page||1   //第几页　　　　默认第一页
        var limit = query.limit||8  //每页多少条　　默认８条
        var skip = (page-1)*limit
        Push.count({$or:[{grouptype:{$elemMatch:{$eq:user.type}}},{arr_Appoint_id:{$elemMatch:{$eq:user.ip}}}]}).then((res)=>{
            return res
        }).then((num)=>{
            var total = Math.ceil(num/limit)
            Push.find({$or:[{grouptype:{$elemMatch:{$eq:user.type}}},{arr_Appoint_id:{$elemMatch:{$eq:user.ip}}}]}).limit(limit).skip(skip).then((data)=>{           
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
    //已读
    async readMessagedetail(req,res,next){
        var query = req.body
        Push.updateOne(query,{isread:true}).then((result)=>{
            console.log(result)
            res.send({
                status:1,
                message: '已读完成',
                result:result
            })
        })
    }

    //删除多条数据
    async deleteMany(req,res,next){
        var arr_id = req.body
        Push.deleteMany({_id:{$in:arr_id}}).then((result)=>{
            res.send({
                status:1,
                message: '删除成功',
                result:result
            })           
        })
    }  
    
    
}

module.exports= new Message_push()
