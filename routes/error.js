var express = require('express');
var router = express.Router();

/* GET create-account page. */
router.get('/', function(req, res, next) {
  res.render('error', { title: 'Error' });
});

module.exports = router;
