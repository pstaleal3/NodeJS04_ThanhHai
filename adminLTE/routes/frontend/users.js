var express = require('express');
var router = express.Router();
var usersModel = require('./../../schemas/users');
router.post('/', function(req, res, next) {
  usersModel.create(req.body, (err, response) => {
    res.send('success');
  })
});
module.exports = router;
