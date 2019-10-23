var mongoose=require("mongoose")
var Schema=mongoose.Schema

var Banner=new Schema({
	img:	{type: String},
    createAt:{
        type:Date,
        default:Date.now()
    },
    updateAt:{
        type:Date,
        default:Date.now()
    }
})


Banner.pre('updateMany', function(next) {
	this.updateMany({},{$set:{updateAt: new Date()}});	
	next();
});

module.exports=mongoose.model("banner",Banner)
