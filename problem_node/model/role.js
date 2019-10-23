var mongoose=require('mongoose')
var Schema=mongoose.Schema

var Role=new Schema({
	name:'String',
	auth_arr:Array
})

module.exports=mongoose.model('role',Role)
