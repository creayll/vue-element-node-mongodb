var formidable = require('formidable');
var path = require('path');
var moment = require('moment');

const Banner = require("../../../model/banner.js");
const Copyright = require("../../../model/copyright.js");
var User_list=require('../../../model/user_list.js')

const commonbase = require('../../../prototype/commonbase');

const log4js= require('../../../utils/log_config')
const logger = log4js.getLogger()//根据需要获取logger
const errlogger = log4js.getLogger('err')
const othlogger = log4js.getLogger('oth')



class Index extends commonbase {
	constructor() {
		super()
		//		this.banner = this.banner.bind(this)	//改变this指向才能调用check
	}

	async banner(req, res, next) { 	//查看图片
		Banner.find().then((data)=>{
			var user=req.cookies.user
//			var info={
//				_id:user._id,
//				name:user.name,
//				action:'查看banner',
//				time:Date.now()
//			}
			logger.addContext('user', user._id+user.name);
			logger.info('查看banner');
			var data = {
				code: 1,
				data: data
			}
			res.send(data);				
		})
	}

	async bannersave(req, res, next) { //修改和增加图片
		var form = formidable.IncomingForm({
			encoding: 'utf-8', //上传编码
			uploadDir: "public/upload/", //上传目录，指的是服务器的路径，如果不存在将会报错。
			keepExtensions: true, //保留后缀
			maxFieldsSize: 2 * 1024 * 1024 //byte//最大可上传大小
		});
		var allFile = [];
		
		form.on('file', function(filed, file) {
				allFile.push([filed, file]); //收集传过来的所有文件
			})
			.parse(req, function(err, fields, files) {
				if(err) {console.log(err)}				
				var id=fields._id
				if(id){	//修改图片
					console.log(allFile)
					var img=allFile[0][1].path.split('public\\')[1]
					console.log('img' + allFile[0][1].path)
					Banner.updateOne(fields,{img:img}).then((data)=>{
						var data = {
							code: 1,
							messege: '修改成功',
							data:data,
							img: img
						}
						res.send(data);							
					})
				}else{	//添加图片
					var arr=[]
					allFile.forEach(function(file, index) {
						arr.push({img:file[1].path.split("public\\")[1]})
					});	
					console.log(arr)					
					Banner.insertMany(arr,(err,data)=>{
						if(err) {console.log(err)}
						var data = {
							code: 1,
							messege: '上传成功',
							data: data
						}
						res.send(data);					
					})						
				}	
			});
	}
	
	async copyrightread(req, res, next) { //读取版权
		Copyright.findOne().then((data)=>{
			res.send({
				code: 1,
				message: '读取版权成功',
				data:data
			})				
		})
	}
	
	async copyrightupdata(req, res, next) { //更新版权
		let query = req.body	
		Copyright.findOne().then((data)=>{
			if(data){
				Copyright.updateOne({},query).then((data)=>{
					res.send({
						code: 1,
						message: '更新版权成功',
						data:data
					})				
				})				
			}else{
				var copyright=new Copyright(query)
				copyright.save(copyright).then((dacopyrightta)=>{
					res.send({
						code: 1,
						message: '更新版权成功',
						data:data
					})	
				})
			}			
		})			
	}
	
	async userStatistics(req, res, next) { //用户统计
		var t=6
		var subtract=moment().subtract(t-1, "months")
		var mouth5=subtract.format("YYYY-MM")
		var Effective=new Date(mouth5)
		User_list.aggregate(
			[{ 
				$match : { createAt : { $gt : Effective } } 
			},
			{
				$project : {
					year : {$year : "$createAt"}, 
					month : {$month : "$createAt"}
				}
			},
			{   $group : {
					_id : {year : "$year", month : "$month"}, 
					count : {$sum : 1}
				}
			},
			{
				$sort: {"_id": 1}
		    }]
		   ).then((data)=>{
				console.log(data)			
			   	var time=[]
				var num=[]
				let now = new Date();
				let month = now.getMonth();
				let year  = now.getFullYear();

				for(var i=0;i<t;i++){
					now.setFullYear(year);
					now.setMonth(month - i);										
					var imonth = (now.getMonth()+1)<10?("0"+(now.getMonth()+1)):(now.getMonth()+1);
					var iyear  = now.getFullYear();		
					time.unshift(iyear+"-"+imonth)	
				}

				time.forEach((item,j)=>{
					var has = data.filter((list,i)=>{
						return (list._id.year+"-"+(list._id.month<10?("0"+list._id.month):list._id.month))==item
					})
					if(has.length>0){
						num.push(has[0].count)
					}else{
						num.push(0)
					}
				})
				res.send({
					code: 1,
					message: '用户统计',
					data:{
						num:num,
						time:time
					}
				})				
		})
	}
}

module.exports = new Index()