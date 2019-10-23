var mongoose=require('mongoose')
var Schema=mongoose.Schema

var User_list=new Schema({
	ip:'String',
	nick:'String',		//昵称
	name:'String',		//账号
	psd:'String',		//密码
	type:Number,		//1==vip 0==普通
	address:'String',	//地址
	photo:'String',		//头像	
	phone:'String',		//电话
	email:'String',		//邮箱
	qq:'String',		//QQ	
	token:'String',
	createAt:{
        type:Date,
        default:Date.now()
	},
	updataAt:{
		type:Date,
		default:Date.now()
	}
})

User_list.pre('updateMany', function(next) {
	this.updateMany({},{$set:{updateAt: new Date()}});	
	next();
});


module.exports=mongoose.model("user_list",User_list)