var express = require('express');
var router = express.Router();
var model = require('../public/js/dynamics.js');
var authenticator = require('../public/js/authenticator.js');

/* GET stocks page. */
router.get('/', function(req, res, next) {
  stock = {
    allStocks: model.getStocks()
  }
  console.log("about to auth");
  if (authenticator.auth(req, next)) {
    res.render('stocks', { title: 'Stocks', stockInfo: stock });
  } else {
    res.send(401, "Not Authorized");
  }
});

router.get('/', (req, res, next) =>{
  //redirects to stock info page  
});

router.post('/filter', (req, res, next) =>{
  //get filtered list of stocks 
  var searchStock = req.body.searchbox;
  stock = {
    allStocks: model.getFilteredStocks(searchStock)
  }
  if (authenticator.auth(req, next)) {
    res.render('stocks', { title: 'Stocks', stockInfo: stock });
  } else {
    res.send(401, "Not Authorized");
  }
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
