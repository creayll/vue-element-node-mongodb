//首页
const config = require('../../config');
const api=config.api;
const express = require('express');
const router = express.Router();
const Index = require('../../controller/'+api+'/home/index');

router.get('/banner', Index.banner);
router.get('/recommend', Index.recommend);

module.exports = router
