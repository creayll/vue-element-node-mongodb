const User_list_admin = require("../../../model/user_list_admin.js");
var Role=require('../../../model/role.js')
var User_role=require('../../../model/user_role.js')
var Auth=require('../../../model/auth.js')
const crypto = require("crypto");
var async=require("async");


class Jurisdiction{
	async authread(req,res,next){		//权限列表
		Auth.find().then((data)=>{
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
	
	async addrole(req,res,next){		//添加角色
		var query=req.body
		var name=query.name	
		Role.findOne({name}).then((data)=>{
			if(data){
				res.send({
					code: 0,
					message: '已有此角色',
					data: data
				});					
			}else{
				var role=new Role(query)
				role.save().then((data)=>{
					res.send({
						code: 1,
						message: '添加角色成功',
						data: data
					});										
				})
			}
		})
	}
	
	async roleread(req, res, next){		//角色读取
		Role.find().then((data)=>{
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
	
	async adminread(req, res, next){		//管理员读取
	  	User_role.find().populate({
				path: 'user_id',
				select:'ip isProhibit name phone'
			}).then((data)=>{	
				async.forEachOf(data,(item, key2, callback1)=>{
					var arr=[]
					async.forEachOf(item.role_arr,(list, key2, callback2)=>{
						Role.findOne({name:list}).then((result)=>{	
							arr=arr.concat(result.auth_arr)							
							callback2()
						})							
					}, err => {
					    var auth_arr=[]
					    for (var i=0;i<arr.length;i++) {
					    	if(auth_arr.indexOf(arr[i])==-1){
					    		auth_arr.push(arr[i])
					    	}
					    }
					    item.auth_arr=auth_arr
					    callback1()					   
					})					
				}, err => {
					res.send({
						code: 1,
						message: '读取成功',
						data:data
					})						
				})
	  	})
	}
	
	
	async read_one_admin(req, res, next){		//添加管理
		var query=req.body
		console.log(query)
		User_role.findOne(query).populate({
				path: 'user_id',
			}).then((data)=>{
				res.send({
					code: 1,
					message: '读取成功',
					data:data
				})				
		})
	}
	
	
	async addadmin(req, res, next){		//添加管理
		var query=req.body
		let _id = query._id;
	  	let name = query.name;
	  	let psd = query.pass;
	  	let role_arr=query.role_arr
	  	let phone=query.phone
	  	let md5 = crypto.createHash("md5");	
	  	let md5psd = md5.update(psd).digest("hex");
		if(_id){
			User_list_admin.updateMany({_id},{name,psd,phone}).then(()=>{
				User_role.updateMany({user_id:_id},{role_arr}).then((result)=>{
					res.send({
						code: 1,
						message: '修改成功',
						data:result
					})						
				})
			})
		}else{
		  	User_list_admin.findOne({name}).then((data)=>{
		  		if(data){
					res.send({
						code: 0,
						message: '此账号已被注册',
					})		  			
		  		}else{
				  	User_list_admin.countDocuments().then((num)=>{	
				  		var num= num.toString()	  		
					  	if(num.length<8){		  				  		
							var num =num.padStart(8,'0')
					  	}else{
					  		num++
					  	}
						var user_list_admin=new User_list_admin({
							name:name,
							psd:md5psd,
							ip:num,
							phone:phone
						})
						user_list_admin.save().then((data)=>{
							var user_id=data._id
							var user_role=new User_role({role_arr,user_id})						
							user_role.save().then((data)=>{
								res.send({
									code: 1,
									message: '注册成功',
									data:data
								})								
							})		
						})		  			
				  	})	  			
		  		}
		  	})	 			
		}	
	}
}







module.exports= new Jurisdiction()