var mongoose=require('mongoose')
var Schema=mongoose.Schema

var Follow=new Schema({
    uid:{type:Schema.ObjectId,ref:'user_list'},　//关注人id
    fid:{type:Schema.ObjectId,ref:'problem'}　//被关系人id
})

module.exports=mongoose.model('follow',Follow)
