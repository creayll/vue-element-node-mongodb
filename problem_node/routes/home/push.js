//推送消息
const config = require('../../config');
const api=config.api;
const express = require('express');
const router = express.Router();
const Push = require('../../controller/'+api+'/home/push');

router.get('/querynum', Push.querynum);    
router.post('/findMessage', Push.findMessage);    
router.post('/readMessagedetail', Push.readMessagedetail);    
router.post('/deleteMany', Push.deleteMany);    

module.exports = router