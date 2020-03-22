var mongoose=require('mongoose')
var Schema=mongoose.Schema

var Bid=new Schema({
    uid:{type:Schema.ObjectId,ref:'user_list'},　//收藏人id
    fid:{type:Schema.ObjectId,ref:'problem'}, //投标的问题id
    price:'String',
    isbid:{type:Boolean,default:false}, //是否中标
	createAt:{
        type:Date,
        default:Date.now()
	} 
})

module.exports=mongoose.model('bid',Bid)
