var express = require('express');
var router = express.Router();

/* GET stocks page. */
router.get('/', function(req, res, next) {
  res.render('stocks', { title: 'Express' });
});

module.exports = router;
