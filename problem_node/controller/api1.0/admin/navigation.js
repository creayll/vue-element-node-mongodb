//分类
var Navigation=require('../../../model/navigation.js')

class Naviga{
	async read(req,res,next){
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

	async large(req,res,next){
		var query=req.body
		var _id=query._id
		var large=query.large
		if(_id){	
			console.log(_id)
			Navigation.updateOne({_id},{large}).then((data,err)=>{
				if(err){console.log(err)}
				res.send({
					code: 1,
					message: '更新数据成功',
					data: data
				});		
			})
		}else{			
			Navigation.findOne({large}).then((data)=>{
				if(data){
					res.send({
						code: 0,
						message: '已存在该数据',
						data: data
					});						
				}else{
					var naviga=new Navigation(query)
					naviga.save().then((data,err)=>{
						if(err){console.log(err)}
						res.send({
							code: 1,
							message: '添加成功',
							data: data
						});					
					})			
				}
			})				
		}		
	}
	
	async small(req,res,next){
		var query=req.body
		console.log(query)
		var large=query.large
		var small=query.small
		var _id=query._id
		if(_id){
			Navigation.updateOne({'small._id':_id},{'small.$.name':small}).then((data,err)=>{
				if(err){console.log(err)}
				res.send({
					code: 1,
					message: '修改成功',
					data: data
				});						
			})
		}else{
			Navigation.findOne({small:{$elemMatch:{name:small}}}).then((data)=>{
				if(data){
					res.send({
						code: 0,
						message: '已存在该数据',
						data: data
					});						
				}else{
					Navigation.updateOne({large},{$addToSet:{small:{name:small}}}).then((data,err)=>{
						if(err){console.log(err)}
						res.send({
							code: 1,
							message: '添加成功',
							data: data
						});					
					})				
				}
			})			
		}
	}	
}

module.exports=new Naviga()

