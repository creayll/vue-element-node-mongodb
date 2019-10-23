//权限
const config = require('../../config');
const api=config.api;
const express = require('express');
const router = express.Router();
const Jurisdiction = require('../../controller/'+api+'/admin/Jurisdiction');

router.get('/authread', Jurisdiction.authread);	 //权限读取
router.get('/roleread', Jurisdiction.roleread);  //添加角色
router.post('/addrole', Jurisdiction.addrole);  //添加角色
router.get('/adminread', Jurisdiction.adminread);//管理员读取
router.post('/addadmin', Jurisdiction.addadmin);//添加管理员
router.post('/read_one_admin', Jurisdiction.read_one_admin);//单个管理员读取


module.exports = router