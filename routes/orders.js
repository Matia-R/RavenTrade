var express = require('express');
var router = express.Router();
var model = require('../public/js/dynamics.js');
var authenticator = require('../public/js/authenticator.js');
const { isValidSymbol } = require('../public/js/dynamics.js');

/* GET orders page. */
router.get('/', function(req, res, next) {
  console.log("about to auth");
  if (authenticator.auth(req, next)) {
    res.render('orders', { title: 'Orders' });
  } else {
    res.send(401, "Not Authorized");
  }
});

router.post('/place-order', (req, res, next) =>{
  res.status(200);
  console.log(req.body.stockSymbol);
  console.log("got to post");
  if (model.isValidSymbol(req.body.stockSymbol)) {
    console.log("valid order");
    res.redirect("./portfolio");
  } else {
    res.redirect('./');
    window.confirm("Invalid Input");
  }
  //res.redirect('./');
  //res.send(201)
});

module.exports = router;
