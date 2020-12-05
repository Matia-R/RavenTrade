var express = require('express');
var router = express.Router();
var authenticator = require('../public/js/authenticator.js');

/* GET stock-info page. */
router.get('/', function(req, res, next) {
  console.log("about to auth");
  if (authenticator.auth(req, next)) {
    res.render('stock-info', { title: 'Stock Info' });
  } else {
    res.send(401, "Not Authorized");
  }
});

router.get('/', (req, res, next) =>{
  //gets stock info, to display 
});

module.exports = router;
