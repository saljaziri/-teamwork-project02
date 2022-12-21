
const express = require('express');

const router = express.Router();

indexController = require('../controllers/index');

router.get('/', indexController.index_get);


module.exports = router;