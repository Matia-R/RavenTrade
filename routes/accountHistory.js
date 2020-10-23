var express = require('express');
var router = express.Router();

/* GET account history page. */
router.get('/', function(req, res, next) {
  res.render('accountHistory', { title: 'My Account' });
});

module.exports = router;
