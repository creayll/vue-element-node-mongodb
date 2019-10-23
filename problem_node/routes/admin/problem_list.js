//问题
const config = require('../../config');
const api=config.api;
const express = require('express');
const router = express.Router();
const Problem = require('../../controller/'+api+'/admin/problem_list');

router.get('/read', Problem.read);	
router.post('/add', Problem.add);	

module.exports = router