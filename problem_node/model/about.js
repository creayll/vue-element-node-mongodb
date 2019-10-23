var mongoose=require('mongoose')
var Schema=mongoose.Schema

var About=new Schema({
	phone:'String',
	email:'String',
	introduction:'String'
})

module.exports=mongoose.model('about',About)
