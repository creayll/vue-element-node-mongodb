//关于
const config = require('../../config');
const api=config.api;
const express = require('express');
const router = express.Router();
const About = require('../../controller/'+api+'/home/about');

router.get('/read', About.read);	

module.exports = router