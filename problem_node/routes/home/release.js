//发布问题
const config = require('../../config');
const api=config.api;
const express = require('express');
const router = express.Router();
const Release = require('../../controller/'+api+'/home/release');

router.get('/Releaselist', Release.Releaselist);    
router.post('/issue', Release.issue);
router.post('/likeuserlist', Release.likeuserlist);

module.exports = router