var Problem=require('../../../model/problem.js')

class Problem_list{
	async read(req,res,next){
		Problem.find().populate({
				path: 'user_id',
				select:'name ip'
			}).then((data)=>{
			res.send({
				status: 1,
				message: '读取数据成功',
				data:data
			})			
		})
	}
	async add(req,res,next){
//		var problem_list=new Problem({
//			title:'11111',
//			content:'1111',
//			price:21,
//			read:212,
//			state:1,	//0下架  1上架   2已被投标
//			isplacement:1,	// 为1时置顶   			
//		})
//		problem_list.save((err,data)=>{
//			res.send({
//				status: 1,
//				message: 'problem_listread',	
//				data:data
//			})
//		})
	}	
}

module.exports= new Problem_list()
