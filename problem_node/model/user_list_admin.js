var mongoose=require('mongoose')
var Schema=mongoose.Schema

var User_list_admin=new Schema({
	name:'String',	//账号
	psd:'String',	//密码
	role:'String',	//角色
	phone:'String',	//电话
	isProhibit:{type:Boolean,default:false},			//是否禁用   默认不禁用
	ip:'String',
	token:'String',
	createAt:{
        type:Date,
        default:Date.now()
	},
	updataAt:{
		type:Date,
		default:Date.now()
	}
})

User_list_admin.pre('updateMany', function(next) {
	this.updateMany({},{$set:{updateAt: new Date()}});	
	next();
});


module.exports=mongoose.model("user_list_admin",User_list_admin)