var express = require('express');
var router = express.Router();

// router.use('/', require('./home'));
router.use('/', require('./home'));
router.use('/rss', require('./rss'));
module.exports = router;
