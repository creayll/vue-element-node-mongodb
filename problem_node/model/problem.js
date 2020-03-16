var mongoose=require('mongoose')
var Schema=mongoose.Schema

var Problem=new Schema({
	user_id:{type:Schema.ObjectId,ref:'user_list'},	//发布人ip
	title:'String',
	content:'String',
	price:Number,	//价钱
	read:{type:Number,default:0},	//阅读量
	state:{type:Number,default:0},	//0上架  １下架   2已被投标　３被解决
	timeplacement:Date,	//置顶初始时间   往后计算3天取消置顶
	istimeplacement:Boolean,	//前端传来的值　后台要用来判断　这里没有这个会报错　
	isCollection:Boolean, //用于给前段判断是否收藏
	isBid:Boolean, //用于给前段判断是否投标
	large_id:Schema.ObjectId,	//大类id   
	small_id:Schema.ObjectId,	//小类id
	Invitation:Array,	//邀请人id数组
	isforce:{type:Boolean,default:false}, //是否强制下架　
	Winning:{type:Schema.ObjectId,ref:'user_list'},	//中标人
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
