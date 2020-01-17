//推送消息
const config = require('../../config');
const api=config.api;
const express = require('express');
const router = express.Router();
const Push = require('../../controller/'+api+'/admin/push');

router.get('/querynum', Push.querynum);    
module.exports = router