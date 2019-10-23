var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var AuthSchema = new Schema({          
	authname:String,	//权限名字
	auth:String			//权限字段
});

module.exports = mongoose.model('Auth',AuthSchema);