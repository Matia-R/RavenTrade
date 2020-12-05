var express = require('express');
var router = express.Router();
var authenticator = require('../public/js/authenticator.js');

/* GET orders page. */
router.get('/', function(req, res, next) {
  console.log("about to auth");
  if (authenticator.auth(req, next)) {
    res.render('orders', { title: 'Orders' });
  } else {
    res.send(401, "Not Authorized");
  }
});

router.post('/', (req, res, next) =>{
  //creates new order
});

module.exports = router;
