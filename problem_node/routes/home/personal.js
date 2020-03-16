const config = require('../../config');
const api=config.api;
const express = require('express');
const router = express.Router();
const Personal = require('../../controller/'+api+'/home/personal');

router.post('/', Personal.personal);
router.post('/myforce', Personal.myforce);
router.post('/deleteitem', Personal.deleteitem);
router.post('/Upperlower', Personal.Upperlower);
router.post('/updata', Personal.updata);

module.exports = router