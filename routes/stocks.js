var express = require('express');
var router = express.Router();
var model = require('../public/js/dynamics.js');
var authenticator = require('../public/js/authenticator.js');

stocks = {
  allStocks: model.database
}

/* GET stocks page. */
router.get('/', function(req, res, next) {
  console.log("about to auth");
  if (authenticator.auth(req, next)) {
    res.render('stocks', { title: 'Stocks' });
  } else {
    res.send(401, "Not Authorized");
  }
});

router.get('/', (req, res, next) =>{
  //redirects to stock info page  
});

router.get('/', (req, res, next) =>{
  //get filtered list of stocks 
});

router.post('/', (req, res, next) =>{
  //creates alert for clicked stock 
});

router.post('/', (req, res, next) =>{
  //adds clicked stock to watchlist 
});

router.post('/', (req, res, next) =>{
  //makes new order of stock 
});

module.exports = router;
