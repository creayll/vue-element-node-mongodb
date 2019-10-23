//注册
const config = require('../../config');
const api=config.api;
const express = require('express');
const router = express.Router();
const Register = require('../../controller/'+api+'/admin/register');

router.post('/', Register.register);

module.exports = router