var About=require('../../../model/about.js')

class Aboutcontent{
	async read(req,res,next){
		About.findOne().then((data)=>{
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
	async update(req,res,next){
		var query=req.body
		About.updateOne({},query).then((data,err)=>{
			if(err){console.log(err)}
			res.send({
				code: 1,
				message: '更新数据成功',
				data: data
			});		
		})
	}		
}

module.exports=new Aboutcontent()
