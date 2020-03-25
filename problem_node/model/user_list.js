var mongoose=require('mongoose')
var Schema=mongoose.Schema

var User_list=new Schema({
	ip:'String',
	nick:'String',		//昵称
	name:'String',		//账号
	psd:'String',		//密码
	type:Number,		//1==vip 0==普通
	Be_good_at:Array,//擅长
	address:'String',	//地址
	des:'String',	//简介
	photo:{type:String,default:'3ea6beec64369c2642b92c6726f1epng.png'}, //头像
	phone:'String',		//电话
	email:'String',		//邮箱
	qq:'String',		//QQ	
	work:'String',		//工作	
	Blog:'String',		//博客	
	Activity_time1:Date,		//活动时间１	
	Activity_time2:Date,		//活动时间２	

	oneprice:Number, 		//一个月多少钱
	threeprice:Number,		//三个月多少钱
	halfyearprice:Number,	//半年多少钱
	yearprice:Number,		//一个月多少钱
	ismyTeachers:Boolean, //用于判断是否是我的师傅　
	isFollow:Boolean, //用于判断是否关注
	radio:'String',
	delivery:{type:Boolean,default:false}, //是否允许拜师
	Apprenticenum:{type:Number,default:0}, //收徒数
	Solvenum:{type:Number,default:0}, //解决问题数


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