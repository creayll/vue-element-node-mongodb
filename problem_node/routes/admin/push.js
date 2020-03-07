//推送消息
const config = require('../../config');
const api=config.api;
const express = require('express');
const router = express.Router();
const Push = require('../../controller/'+api+'/admin/push');

router.post('/read', Push.read);	
router.post('/save', Push.save);	
router.post('/save_personal', Push.save_personal);    
router.post('/findone', Push.findone);    
module.exports = router