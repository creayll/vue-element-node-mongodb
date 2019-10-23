//关于
const config = require('../../config');
const api=config.api;
const express = require('express');
const router = express.Router();
const Navigation = require('../../controller/'+api+'/admin/navigation');

router.get('/read', Navigation.read);	
router.post('/large', Navigation.large);	//添加大类
router.post('/small', Navigation.small);	//添加大类
module.exports = router