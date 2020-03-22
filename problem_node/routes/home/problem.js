//问题
const config = require('../../config');
const api=config.api;
const express = require('express');
const router = express.Router();
const Problem = require('../../controller/'+api+'/home/problem');

router.post('/', Problem.Problemlist);
router.get('/Navigationread', Problem.Navigationread);
router.post('/Collectionx', Problem.Collectionx);
router.post('/Bidx', Problem.Bidx);
router.post('/readbid', Problem.readbid);  //读取某个问题投标的人
router.post('/message', Problem.message);   //留言 
router.post('/readmessage', Problem.readmessage);   //读取留言
router.post('/read', Problem.read);   //读取留言

module.exports = router
