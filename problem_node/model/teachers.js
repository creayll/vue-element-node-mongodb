var mongoose=require('mongoose')
var Schema=mongoose.Schema

var Teachers=new Schema({
    uid:{type:Schema.ObjectId,ref:'user_list'},
    tid:{type:Schema.ObjectId,ref:'user_list'}, //师傅id
    type:'String',　//拜师是拜的哪种的 分一个月，二个月等
	createAt:{
        type:Date,
        default:Date.now()
	} 
})

module.exports=mongoose.model('teachers',Teachers)
