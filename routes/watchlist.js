var express = require('express');
var router = express.Router();

/* GET watchlist page. */
router.get('/', function(req, res, next) {
  res.render('watchlist', { title: 'Watchlists' });
});

module.exports = router;
