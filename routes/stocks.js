var express = require('express');
var router = express.Router();

/* GET stocks page. */
router.get('/', function(req, res, next) {
  res.render('stocks', { title: 'Stocks' });
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
