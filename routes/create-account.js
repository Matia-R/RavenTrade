var express = require('express');
var router = express.Router();

/* GET create-account page. */
router.get('/', function(req, res, next) {
  res.render('create-account', { title: 'Create Account' });
});

module.exports = router;
