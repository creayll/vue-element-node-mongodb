//推送消息
const config = require('../../config');
const api=config.api;
const express = require('express');
const router = express.Router();
const Push = require('../../controller/'+api+'/admin/push');

router.get('/read', Push.read);	
router.post('/save', Push.save);	

module.exports = router