//导航分类名称
var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var navigationSchema = new Schema({         	
   	large:String,
   	small:[{
   		name:String
   	}],
    createAt:{
        type:Date,
        default:Date.now()
    },
    updateAt:{
        type:Date,
        default:Date.now()
    }   	
});

navigationSchema.pre('updateMany', function(next) {
	this.updateMany({},{$set:{updateAt: new Date()}});	
	next();
});


module.exports = mongoose.model('navigation',navigationSchema);	
