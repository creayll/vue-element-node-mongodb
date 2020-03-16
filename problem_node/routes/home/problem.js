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

module.exports = router
