var mongoose=require('mongoose')
var Schema=mongoose.Schema

var User_role=new Schema({
	user_id:{type:Schema.ObjectId,ref:'user_list_admin'},
	role_arr:Array,
	auth_arr:Array
})

module.exports=mongoose.model('user_role',User_role)