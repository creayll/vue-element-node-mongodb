const Push = require("../../../model/push.js");
const User_list = require("../../../model/user_list.js");

class Message_push{
    async querynum(req,res,next){
        var user=req.cookies.user
        console.log(user)
//      Push.find({$or:[{grouptype:{$elemMatch:{$eq:user.type}}},{arr_Appoint_id:{$elemMatch:{$eq:user.ip}}}]}).then((data)=>{
            res.send({
                status: 1,
                message: '查询成功',
                data:data
            })               
//      })
    }
}

module.exports= new Message_push()
