var express = require('express');
var router = express.Router();

/* GET stock-info page. */
router.get('/', function(req, res, next) {
  res.render('stock-info', { title: 'Stock Info' });
});

router.get('/', (req, res, next) =>{
  //gets stock info, to display 
});

module.exports = router;
