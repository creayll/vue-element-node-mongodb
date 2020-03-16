const User_list = require("../../../model/user_list.js");
const Problem = require("../../../model/problem.js");
var Navigation=require('../../../model/navigation.js')
const Collection = require("../../../model/collection.js");
var Bid=require('../../../model/bid.js')
const async=require("async");


class Problemclass{
    async Problemlist(req, res, next){    
        const user= JSON.parse(req.get("user")); 
        var query = req.body
        var page = query.page||1   //第几页　　　　默认第一页
        var limit = query.limit||8  //每页多少条　　默认８条
        var skip = (page-1)*limit

        var tabtype=query.tabtype
        var where=null
        if(tabtype=='large'){
            var where={
                large_id:query.id
            }
        }else if(tabtype=='small'){
            var where={
                small_id:query.id
            }
        }

        var Lifting=query.Lifting  //接收-1 1　-1降序　1升序
        var type=query.type
        var sort=null
        if(type=='time'){
            var sort={creatAt:Lifting}
        }else if(type=='price'){ 
            var sort={price:Lifting}
        }  
             
        Problem.countDocuments(where).then((num)=>{
            var total = Math.ceil(num/limit)
            Problem.find(where).sort(sort).limit(limit).skip(skip).then((data)=>{
                async.forEachOf(data,(list, key1, callback1)=>{
                    var p1=new Promise((j,s)=>{
                        Collection.findOne({uid:user._id,fid:list._id}).then((result)=>{
                            return j(result)
                        })
                    })
                    var p2=new Promise((j,s)=>{
                        Bid.findOne({uid:user._id,fid:list._id}).then((result)=>{
                            return j(result)
                        })
                    })
                    Promise.all([p1,p2]).then(([result1,result2])=>{
                        if(result1){
                            list.isCollection=true
                        }else{
                            list.isCollection=false
                        }  
                        if(result2){
                            list.isBid=true
                        }else{
                            list.isBid=false
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

	async Navigationread(req,res,next){
		Navigation.find().then((data)=>{
			if(data){
				res.send({
					code: 1,
					message: '查询成功',
					data: data
				});					
			}else{
				res.send({
					code: 0,
					message: '未查询到数据',
					data: data
				});					
			}
		})
    }	

    async Collectionx(req,res,next){ //收藏
        const user= JSON.parse(req.get("user")); 
        var query = req.body
        var where={
            uid:user._id,
            fid:query.fid
        }
        Collection.findOne(where).then((data)=>{
            if(data){
                Collection.deleteOne(where).then((result)=>{
                    res.send({
                        status: 1,
                        message: '取消收藏成功',
                        data: result
                    });	                    
                })
            }else{
                var collection=new Collection(where)
                collection.save().then((result)=>{
                    res.send({
                        status: 1,
                        message: '收藏成功',
                        data: result
                    });	  
                })                               
            }
        })
    }

    async Bidx(req,res,next){ //投标
        const user= JSON.parse(req.get("user")); 
        var query = req.body
        var where={
            uid:user._id,
            fid:query.fid
        }
        Bid.findOne(where).then((data)=>{
            if(data){
                Collection.deleteOne(where).then((result)=>{
                    res.send({
                        status: 1,
                        message: '取消投标成功',
                        data: result
                    });	                    
                })
            }else{
                var bid=new Bid(where)
                bid.save().then((result)=>{
                    res.send({
                        status: 1,
                        message: '投标成功',
                        data: result
                    });	  
                })                               
            }
        })
    }
}

module.exports= new Problemclass()
