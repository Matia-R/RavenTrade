var express = require('express');
var router = express.Router();

/* GET alerts page. */
router.get('/', function(req, res, next) {
  res.render('alerts', { title: 'My Alerts' });
});

module.exports = router;
