const User_list = require("../../../model/user_list.js");
var Problem=require('../../../model/problem.js')
var Bid=require('../../../model/bid.js')

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
        var where={uid:user._id}
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
}

module.exports= new Personal()
