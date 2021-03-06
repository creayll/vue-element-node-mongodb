const User_list = require("../../../model/user_list.js");
const Teachers = require("../../../model/teachers.js");
const Follow = require("../../../model/follow.js");

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
        var query={
            delivery:true,  //是否允许拜师
            _id:{$ne:user._id},
            $or:[{oneprice:{$exists:true}},{threeprice:{$exists:true}},{halfyearprice:{$exists:true}},{yearprice:{$exists:true}}]
        }
        User_list.countDocuments(query).then((num)=>{
            var total = Math.ceil(num/limit)
            User_list.find(query).sort(sort).limit(limit).skip(skip).then((data)=>{
                async.forEachOf(data,(list, key1, callback1)=>{                   
                        var p1=new Promise((j,s)=>{
                            Teachers.findOne({uid:user._id,tid:list._id}).then((result)=>{	
                                return j(result)
                            })
                        })
                        var p2=new Promise((j,s)=>{
                            Follow.findOne({uid:user._id,fid:list._id}).then((result)=>{
                                return j(result)
                            })
                        })
                        Promise.all([p1,p2]).then(([result1,result2])=>{
                            if(result1){
                                list.ismyTeachers=true
                                list.radio=result1.type
                            }else{
                                list.ismyTeachers=false
                            }	
                            if(result2){
                                list.isFollow=true
                            }else{
                                list.isFollow=false
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
