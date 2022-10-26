var express = require('express');
var router = express.Router();

const middleAuthentication = require(__path_middleware + 'auth');

router.use('/' ,require('./dashboard'));
router.use('/dashboard', require('./dashboard'));
router.use('/sliders', require('./sliders'));
router.use('/users', require('./users'));
router.use('/categories', require('./categories'));
router.use('/articles', require('./articles'));
router.use('/menu', require('./menu'));
router.use('/settings', require('./settings'));
router.use('/products', require('./products'));
router.use('/attributes', require('./attributes'));
module.exports = router;
