var mongoose=require('mongoose')
var Schema=mongoose.Schema

var Collection=new Schema({
    uid:{type:Schema.ObjectId,ref:'user_list'},　//收藏人id
    fid:{type:Schema.ObjectId,ref:'problem'}, //收藏的问题id
	createAt:{
        type:Date,
        default:Date.now()
	} 
})

module.exports=mongoose.model('collection',Collection)
