//分类
var Navigation=require('../../../model/navigation.js')
var Problem=require('../../../model/problem.js')
const User_list = require("../../../model/user_list.js");

class Release{
    //大分类，小分类
	async Releaselist(req,res,next){
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
    
    //发布问题 
    async issue(req,res,next){
        var query = req.body
        const user= JSON.parse(req.get("user")); 
        var istimeplacement=query.istimeplacement //是否置顶
        if(istimeplacement){
            console.log(istimeplacement)
            console.log(Date.now())
            console.log(Date.now()+3*1000*60*60*24)
            query.timeplacement=Date.now()+3*1000*60*60*24
        }
        
        query.user_id=user._id
        Problem.insertMany(query).then((data)=>{
            res.send({
                code: 1,
                message: '插入数据成功',
                data: data
            });	           
        })
    }

    //模糊查询人
    async likeuserlist(req,res,next){
        var uip = req.body.uip
        User_list.find({ip:{$regex: uip, $options: '^' }}).then((data)=>{
            res.send({
                code: 1,
                message: '模糊查询成功',
                data: data
            });	              
        })
    }    
    //置顶
    async placement(req,res,next){

    }
}

module.exports= new Release()