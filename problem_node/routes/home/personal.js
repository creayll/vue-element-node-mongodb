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
router.post('/mybid', Personal.mybid);
router.post('/myapprentice', Personal.myapprentice);
router.post('/myteacher', Personal.myteacher);
router.post('/Apprentice', Personal.Apprentice);
router.post('/mycollection', Personal.mycollection);
router.post('/addfollow', Personal.addfollow);
router.post('/readfollow', Personal.readfollow);

module.exports = router