var mongoose=require('mongoose')
var Schema=mongoose.Schema

var Copyright=new Schema({
	copyright:'String'  //版权
})

module.exports=mongoose.model('copyright',Copyright)
