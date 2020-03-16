const User_list = require("../../../model/user_list.js");
const Teachers = require("../../../model/teachers.js");
const async=require("async");


class Teachersclass{
    async Teacherslist(req, res, next){    
        const user= JSON.parse(req.get("user")); 
        var query = req.body
        var page = query.page||1   //第几页　　　　默认第一页
        var limit = query.limit||8  //每页多少条　　默认８条
        var skip = (page-1)*limit

        var Lifting=query.Lifting  //接收-1 1　-1降序　1升序

        var type=query.type
        var sort=null
        if(type=='Apprenticenum'){
            var sort={Apprenticenum:Lifting}
        }else if(type=='Solvenum'){ 
            var sort={Solvenum:Lifting}
        }
        
        User_list.countDocuments({_id:{$ne:user._id},delivery:true}).then((num)=>{
            var total = Math.ceil(num/limit)
            User_list.find({_id:{$ne:user._id},delivery:true}).sort(sort).limit(limit).skip(skip).then((data)=>{
                async.forEachOf(data,(list, key1, callback1)=>{
                    Teachers.findOne({uid:user._id,tid:list._id}).then((result)=>{	
                        if(result){
                            list.ismyTeachers=true
                            list.radio=result.type
                        }else{
                            list.ismyTeachers=false
                        }	
                        callback1()
                    })							
                }, err => {
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
        })       
    }

    async Apprentice(req,res,next){  //拜师
        const user= JSON.parse(req.get("user")); 
        var query = req.body　　　// 接收tid
        Teachers.find({uid:user._id,tid:query.tid}).then((data)=>{
            console.log(data)
            if(data.length>0){
                res.send({
                    status: 0,
                    message: '已拜师'
                })                    
            }else{
                var teachers=new Teachers({
                    uid:user._id,
                    tid:query.tid,
                    type:query.type
                })
                teachers.save().then((result)=>{
                    User_list.update({_id:query.tid},{$inc:{Apprenticenum:1}}).then((result2)=>{
                        res.send({
                            status: 1,
                            message: '拜师成功',
                            result:result,
                            result2:result2
                        })  
                    })                   
                })
            }
        })
    }

    // async ismyTeachers(req,res,next){  //判断是否是我的师傅
    //     const user= JSON.parse(req.get("user")); 
    //     var query = req.body　　　// 接收tid
    //     Teachers.findOne({uid:user._id,tid:query._tid}).then((data)=>{
    //         if(data){
    //             res.send({
    //                 status: 1,
    //                 message: '是我的师傅',
    //                 data:data,
    //                 ismyTeachers:true
    //             })  
    //         }else{
    //             res.send({
    //                 status: 1,
    //                 message: '不是我的师傅',
    //                 data:data,
    //                 ismyTeachers:false
    //             })  
    //         }
    //     })
    // }
}

module.exports= new Teachersclass()
