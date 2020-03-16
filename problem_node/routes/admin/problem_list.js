//问题
const config = require('../../config');
const api=config.api;
const express = require('express');
const router = express.Router();
const Problem = require('../../controller/'+api+'/admin/problem_list');

router.post('/read', Problem.read);	 
router.post('/find', Problem.find);	
router.post('/isforce', Problem.isforce);	
router.post('/delete', Problem.delete);	

module.exports = router