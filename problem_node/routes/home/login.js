//登录
const config = require('../../config');
const api=config.api;
const express = require('express');
const router = express.Router();
const Login = require('../../controller/'+api+'/home/login');

router.get('/', Login.login);

module.exports = router