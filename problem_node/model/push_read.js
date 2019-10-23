var mongoose=require('mongoose')
var Schema=mongoose.Schema

var Push_read=new Schema({
	push_id:{type:Schema.ObjectId,ref:'push'},
	isread:Boolean
})

module.exports=mongoose.model('push_read',Push_read)