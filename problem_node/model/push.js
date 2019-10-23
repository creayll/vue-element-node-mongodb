var mongoose=require('mongoose')
var Schema=mongoose.Schema

var Push=new Schema({
	uid:{type:Schema.ObjectId,ref:'user_list_admin'},
	title:String,
	content:String,
	grouptype:Array,//推送群组类型   1==vip, 0==普通   -1==则为推送指定用户	
	arr_Appoint_id:Array,	//指定用户id数组
	creatAt:{
		type:Date,
		default:Date.now()
	}
})

module.exports=mongoose.model('push',Push)
