const User_list = require("../../../model/user_list.js");
var Problem=require('../../../model/problem.js')
var Bid=require('../../../model/bid.js')
const Teachers = require("../../../model/teachers.js");
const Collection = require("../../../model/collection.js");
const Follow = require("../../../model/follow.js");

var formidable = require('formidable');
var path = require('path');

class Personal{
    async personal(req, res, next){    
        let query=req.body
        console.log(query)
        User_list.updateOne({_id:query._id},query).then((data)=>{
            res.send({
                status: 1,
                message: '修改成功',
                data:data
            })        
        })     
    }

    async myforce(req, res, next){    //我的发布
        const user= JSON.parse(req.get("user")); 
        let query=req.body
        console.log(query)
        var page = query.page||1   //第几页　　　　默认第一页
        var limit = query.limit||8  //每页多少条　　默认８条
        var skip = (page-1)*limit   
        Problem.count({user_id:user._id,state:query.state}).then((num)=>{   //state　为０时下架　为１时上架　为２时已被投标
            var total = Math.ceil(num/limit)
            Problem.find({user_id:user._id,state:query.state}).limit(limit).skip(skip).then((data)=>{
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

    async Upperlower(req,res,next){　//切换上下架
        let query=req.body
        Problem.updateOne({_id:query._id},{state:query.state}).then((data)=>{
            res.send({
                status: 1,
                message: '操作成功',
                data:data
            })                    
        })
    }

    async deleteitem(req,res,next){ //删除我的发布
        let query=req.body
        Problem.deleteOne(query).then((data)=>{
            res.send({
                status: 1,
                message: '删除成功',
                data:data
            })                    
        })
    }   

    async updata(req,res,next){ //删除我的发布
        const user= JSON.parse(req.get("user")); 
		var form = formidable.IncomingForm({
			encoding: 'utf-8', //上传编码
			uploadDir: "public/photo/", //上传目录，指的是服务器的路径，如果不存在将会报错。
			keepExtensions: true, //保留后缀
			maxFieldsSize: 2 * 1024 * 1024 //byte//最大可上传大小
		});
		var allFile = [];
		
		form.on('file', function(filed, file) {
				allFile.push([filed, file]); //收集传过来的所有文件
			})
			.parse(req, function(err, fields, files) {
				if(err) {console.log(err)}				
                var img='/'+allFile[0][1].path.split("public/")[1]
                console.log(img)
                
                User_list.updateOne({_id:user._id},{photo:img}).then((data)=>{
                    var data = {
                        status: 1,
                        messege: '修改成功',
                        data:data,
                        img: img
                    }
                    res.send(data);							
                })
			});        
    } 
    
    async mybid(req,res,next){
        const user= JSON.parse(req.get("user")); 
        let query=req.body
        var page = query.page||1   //第几页　　　　默认第一页
        var limit = query.limit||8  //每页多少条　　默认８条
        var skip = (page-1)*limit    
        var where={uid:user._id,state:query.state}
        console.log(where)
        Bid.countDocuments(where).then((num)=>{
            var total = Math.ceil(num/limit)
            Bid.find(where).populate({
                path: 'fid'
            }).populate({
                path: 'uid'
            }).limit(limit).skip(skip).then((data)=>{
                res.send({
                    status: 1,
                    message: '我的投标查询成功',
                    data:data,
                    total:total,
                    allnum:num,
                    size:limit                    
                });	           
            })           
        })
    }

    async myapprentice(req,res,next){   //我的徒弟
        const user= JSON.parse(req.get("user")); 
        let query=req.body
        var state=query.state
        var page = query.page||1   //第几页　　　　默认第一页
        var limit = query.limit||8  //每页多少条　　默认８条
        var skip = (page-1)*limit    
        var where={tid:user._id,state}    
        Teachers.countDocuments(where).then((num)=>{
            var total = Math.ceil(num/limit)
            Teachers.find(where).populate({
                path: 'uid'
            }).limit().skip(skip).then((data)=>{           
                res.send({
                    status: 1,
                    message: '我的徒弟查询成功',
                    data:data,
                    total:total,
                    allnum:num,
                    size:limit                    
                });	           
            })           
        })
    }

    async myteacher(req,res,next){   //我的老师
        const user= JSON.parse(req.get("user")); 
        let query=req.body
        var page = query.page||1   //第几页　　　　默认第一页
        var limit = query.limit||8  //每页多少条　　默认８条
        var skip = (page-1)*limit    
        //type 0我的老师　　１过期的老师
        let type=query.type
        let now = new Date().getTime()
        var where={uid:user._id,state:0}  
        if(type==0){
            where.Effective={$gte:now}
        }else{
            where.Effective={$lt:now}
        }
           
        Teachers.countDocuments(where).then((num)=>{
            var total = Math.ceil(num/limit)
            Teachers.find(where).populate({
                path: 'tid'
            }).limit().skip(skip).then((data)=>{           
                res.send({
                    status: 1,
                    message: '我的老师查询成功',
                    data:data,
                    total:total,
                    allnum:num,
                    size:limit                    
                });	           
            })           
        })
    }   

    async Apprentice(req,res,next){  //同意拜师
        let query=req.body
        let type=query.type
        let state=query.state

        let now = new Date();
        let month = now.getMonth()+1;
        let year  = now.getFullYear();
        let day  = now.getDay();
        var hour = now.getHours();//得到小时
        var minu = now.getMinutes();//得到分钟
        var sec = now.getSeconds();//得到秒
　　     var MS = now.getMilliseconds();//获取毫秒       

        
        if(type=='oneprice'){ //一个月
            var Effective=new Date(year,month+1,day,hour,minu,sec,MS).getTime()
        }else if(type=='threeprice'){   //三个月
            var Effective=new Date(year,month+3,day,hour,minu,sec,MS).getTime()
        }else if(type=='halfyearprice'){　//半年
            var Effective=new Date(year,month+6,day,hour,minu,sec,MS).getTime()
        }else{　//一年
            var Effective=new Date(year+1,month,day,hour,minu,sec,MS).getTime()
        }
        console.log(Effective)
        let where={
            _id:query._id
        }
        Teachers.updateOne(where,{Effective,state}).then((data)=>{
            res.send({
                status: 1,
                message: '操作成功',
                data:data                
            });	             
        })
    }

    async mycollection(req,res,next){　//我的收藏
        const user= JSON.parse(req.get("user")); 
        let query=req.body
        var page = query.page||1   //第几页　　　　默认第一页
        var limit = query.limit||8  //每页多少条　　默认８条
        var skip = (page-1)*limit      
        var where={
            uid:user._id
        }
        Collection.countDocuments(where).then((num)=>{
            var total = Math.ceil(num/limit)
            Collection.find(where).populate({
                path: 'fid'
            }).populate({
                path: 'uid'
            }).limit(limit).skip(skip).then((data)=>{
                res.send({
                    status: 1,
                    message: '我的收藏查询成功',
                    data:data,
                    total:total,
                    allnum:num,
                    size:limit                    
                });	           
            })           
        })
    }

    async readfollow(req,res,next){ //我的关注
        const user= JSON.parse(req.get("user")); 
        let query=req.body
        var page = query.page||1   //第几页　　　　默认第一页
        var limit = query.limit||8  //每页多少条　　默认８条
        var skip = (page-1)*limit      
        var where={
            uid:user._id
        }
        Follow.countDocuments(where).then((num)=>{
            var total = Math.ceil(num/limit)
            Follow.find(where).populate({
                path: 'fid'
            }).populate({
                path: 'uid'
            }).limit(limit).skip(skip).then((data)=>{
                res.send({
                    status: 1,
                    message: '我的关注查询成功',
                    data:data,
                    total:total,
                    allnum:num,
                    size:limit                    
                });	           
            })           
        })        
    }

    async addfollow(req,res,next){　//关注
        const user= JSON.parse(req.get("user")); 
        let query=req.body
        var type=query.type
        var where={
            uid:user._id,
            fid:query.fid
        }
        if(type==1){ //添加
            var follow=new Follow(where)
            follow.save().then((data)=>{
                res.send({
                    status: 1,
                    message: '关注成功',
                    data:data           
                });	              
            })
        }else{ //删除
            Follow.deleteOne(where).then((data)=>{
                res.send({
                    status: 1,
                    message: '取消关注成功',
                    data:data           
                });	                
            })
        }
    }

}

module.exports= new Personal()
