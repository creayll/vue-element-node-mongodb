//关于
const config = require('../../config');
const api=config.api;
const express = require('express');
const router = express.Router();
const About = require('../../controller/'+api+'/admin/about');

router.get('/read', About.read);	
router.post('/update', About.update);	

module.exports = router