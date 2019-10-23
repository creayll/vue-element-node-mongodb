//首页
const config = require('../../config');
const api=config.api;
const express = require('express');
const router = express.Router();
const Index = require('../../controller/'+api+'/admin/index');

router.get('/banner', Index.banner);	
router.post('/bannersave', Index.bannersave);
router.post('/copyrightupdata', Index.copyrightupdata);
router.post('/copyrightread', Index.copyrightread);
module.exports = router
