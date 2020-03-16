//拜师
const config = require('../../config');
const api=config.api;
const express = require('express');
const router = express.Router();
const Teachers = require('../../controller/'+api+'/home/teachers');

router.post('/Teacherslist', Teachers.Teacherslist);   //我要拜师列表
router.post('/Apprentice', Teachers.Apprentice);   //拜师 
// router.post('/ismyTeachers', Teachers.ismyTeachers);   //判断是不是我的拜师 


module.exports = router