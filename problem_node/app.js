
const createError = require('http-errors');
const express = require('express');
// const router = express.Router();
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();

 
const log4js= require('./utils/log_config')
const logger2 = log4js.getLogger()//根据需要获取logger

log4js.useLogger(app,logger2)  // 把每次请求的信息写入日志 

//easy push
//client.push().setPlatform(JPush.ALL)
//  .setAudience(JPush.ALL)
//  .setNotification('Hi, JPush', JPush.ios('ios alert', 'happy', 5))
//  .send()
//  .then(function(result) {
//      console.log(result)
//  }).catch(function(err) {
//      console.log(err)
//  })



app.use(express.static(path.join(__dirname, 'public')));

const db =require('./mongodb/db.js');
db()


var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/public')); 

app.all("*",function(req,res,next){
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin",req.headers.origin);
    //允许的header类型
    res.header("Access-Control-Allow-Headers","user, token, Origin, X-Requested-With, Content-Type, Accept");
    //跨域允许的请求方式 
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
    // 设置cookie跨域
    res.header('Access-Control-Allow-Credentials', 'true');
    if (req.method.toLowerCase() == 'options')
        res.send(200);  //让options尝试请求快速结束
    else
        next();
})

const home =require('./routes/home.js');
const admin =require('./routes/admin.js');
home(app)	//前端路由
admin(app)	//后端路由


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
