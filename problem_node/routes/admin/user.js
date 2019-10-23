//用户列表
const config = require('../../config');
const api=config.api;
const express = require('express');
const router = express.Router();
const User = require('../../controller/'+api+'/admin/user');

router.get('/read', User.read);	
router.post('/find', User.find);

module.exports = router