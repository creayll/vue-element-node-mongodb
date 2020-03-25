var mongoose=require('mongoose')
var Schema=mongoose.Schema

var Teachers=new Schema({
    uid:{type:Schema.ObjectId,ref:'user_list'},
    tid:{type:Schema.ObjectId,ref:'user_list'}, //师傅id
    type:'String',　//拜师是拜的哪种的 分一个月，三个月等
    Effective:Date, //有效时间
    state:{type:Number,default:1},	//0同意，１待同意　２拒绝
	createAt:{
        type:Date,
        default:Date.now()
	} 
})

module.exports=mongoose.model('teachers',Teachers)
