var express = require('express');
var router = express.Router();

/* GET stock-info page. */
router.get('/', function(req, res, next) {
  res.render('stock-info', { title: 'Express' });
});

module.exports = router;
