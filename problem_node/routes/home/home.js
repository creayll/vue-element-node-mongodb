//首页
const config = require('../../config');
const api=config.api;
const express = require('express');
const router = express.Router();
const Index = require('../../controller/'+api+'/home/index');

router.get('/bannerread', Index.bannerread);
router.get('/copyrightread', Index.copyrightread);

module.exports = router
