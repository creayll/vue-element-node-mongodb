var mongoose=require('mongoose')
var Schema=mongoose.Schema

var Problem=new Schema({
	user_id:{type:Schema.ObjectId,ref:'user_list'},	//发布人ip
	title:'String',
	content:'String',
	price:Number,	//价钱
	read:Number,	//阅读量
	state:Number,	//0下架  1上架   2已被投标
	isplacement:Number,	// 为1时置顶   
	timeplacement:Date,	//置顶初始时间   往后计算3天取消置顶
	large_id:Schema.ObjectId,	//大类id   
	small_id:Schema.ObjectId,	//小类id
	creatAt:{
		type:Date,
		default:Date.now(),
	},
	updataAt:{
		type:Date,
		default:Date.now()
	}
})

module.exports=mongoose.model('problem',Problem)
