'use strict';

module.exports = ()=>{
	var mongoose = require('mongoose');
	var chalk = require('chalk');  //使输出不再单调,添加文字背景什么的,改变字体颜色什么的
	const config = require('../config');
	mongoose.connect(config.mongodb, {useNewUrlParser:true});
	mongoose.Promise = global.Promise;
	
	const db = mongoose.connection;
	
	db.once('open' ,() => { 
		console.log(chalk.green('连接数据库成功'));
	})
	
	db.on('error', function(error) {
	    console.error(
	      chalk.red('Error in MongoDb connection: ' + error)
	    );
	    mongoose.disconnect();
	});
	
	db.on('close', function() {
	    console.log(
	      chalk.red('数据库断开，重新连接数据库')
	    );
	    mongoose.connect(config.mongodb, {server:{auto_reconnect:true}});
	});
}
