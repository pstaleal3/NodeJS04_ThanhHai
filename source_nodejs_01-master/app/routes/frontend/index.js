var express = require('express');
var router = express.Router();

// router.use('/', require('./home'));
router.use('/', require('./../backend/dashboard'));

module.exports = router;
