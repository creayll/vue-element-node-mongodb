const User_list = require("../../../model/user_list.js");
const Problem = require("../../../model/problem.js");
var Navigation=require('../../../model/navigation.js')
const Collection = require("../../../model/collection.js");
var Bid=require('../../../model/bid.js')
const Message = require("../../../model/message.js");
const async=require("async");


class Problemclass{
    async Problemlist(req, res, next){    
        const user= JSON.parse(req.get("user")); 
        var query = req.body
        var page = query.page||1   //第几页　　　　默认第一页
        var limit = query.limit||8  //每页多少条　　默认８条
        var skip = (page-1)*limit

        var tabtype=query.tabtype
        var id = query.id
        var where={$or:[{state:1},{state:2}],isforce:false}   //state 0下架  １上架   2已被投标　３被解决  isforce是否被后台强制下架
        if (id) {
            if(tabtype=='large'){
                // where={
                //     large_id:query.id
                // }
                where.large_id = id
            }else if(tabtype=='small'){
                // where={
                //     small_id:query.id
                // }
                where.small_id = id
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
            Problem.find(where).populate({
				path: 'user_id',
				select:'ip name nick photo'                
            }).sort(sort).limit(limit).skip(skip).then((data)=>{
                console.log(data)
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
                            list.Bidprice=result2.price
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
        var type = query.type
        if(type==0){
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
    }

    async Bidx(req,res,next){ //投标
        const user= JSON.parse(req.get("user")); 
        var query = req.body
        var where={
            uid:user._id,
            fid:query.fid
        }
        var type = query.type
        if(type==0){ //取消投标
            console.log(query)
            Bid.deleteOne(where).then((result)=>{ 
                res.send({
                    status: 1,
                    message: '取消投标成功',
                    data: result
                });	                    
            })   
        }else{　//投标
            where.price=query.price
            var bid=new Bid(where)
            bid.save().then((result)=>{
                res.send({
                    status: 1,
                    message: '投标成功',
                    data: result
                });	  
            })               
        }
    }

	async end(req,res,next){　　//终止上架
        var query = req.body
		Problem.updateOne({_id:query._id},{state:1}).then((data)=>{
			if(data){
				res.send({
					status: 1,
					message: '终止上架成功',
					data: data
				});					
			}else{
				res.send({
					status: 0,
					message: '终止上架成功失败',
					data: data
				});					
			}
		})
    }
    
    async readbid(req,res,next){ //读取投标人
        var query = req.body
        var page = query.page||1   //第几页　　　　默认第一页
        var limit = query.limit||8  //每页多少条　　默认８条
        var skip = (page-1)*limit 

        var where={
            fid:query.fid
        }
        Bid.countDocuments(where).then((num)=>{
            var total = Math.ceil(num/limit)
            Bid.find(where).populate({
                path: 'uid',
                select:'ip name nick photo'                
            }).limit(limit).skip(skip).then((data)=>{
                res.send({
                    status: 1,
                    message: '查询成功',
                    data:data,
                    total:total,
                    allnum:num,
                    size:limit
                });	           
            })
        })
    }

    async message(req,res,next){ //留言
        var query = req.body
        const user= JSON.parse(req.get("user")); 
        query.uid=user._id
        var message=new Message(query)
        message.save().then((data)=>{
            res.send({
                status: 1,
                message: '留言成功',
                data: data
            });	           
        })
    }    

    async readmessage(req,res,next){ //读取留言
        var query = req.body
        var page = query.page||1   //第几页　　　　默认第一页
        var limit = query.limit||8  //每页多少条　　默认８条
        var skip = (page-1)*limit 

        var where={
            fid:query.fid
        }        
        Message.countDocuments(where).then((num)=>{
            var total = Math.ceil(num/limit)
            Message.find(where).populate({
                path: 'uid',
                select:'ip name nick photo'                
            }).then((data)=>{
                res.send({
                    status: 1,
                    message: '查询成功',
                    data:data,
                    total:total,
                    allnum:num,
                    size:limit
                });	           
            })
        })
    }   
    
    async read(req,res,next){
        var query = req.body
        Problem.update(query,{$inc:{read:1}}).then((data)=>{
            res.send({
                status: 1,
                message: '阅读',
                data:data
            })  
        })          
    }
}

module.exports= new Problemclass()
