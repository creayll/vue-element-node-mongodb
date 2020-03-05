//登录
const config = require('../../config');
const api=config.api;
const express = require('express');
const router = express.Router();
const Login = require('../../controller/'+api+'/admin/login');

router.post('/', Login.login);
router.post('/register', Login.register);
module.exports = router