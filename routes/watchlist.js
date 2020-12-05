var express = require('express');
var router = express.Router();
var authenticator = require('../public/js/authenticator.js');

/* GET watchlist page. */
router.get('/', function(req, res, next) {
  console.log("about to auth");
  if (authenticator.auth(req, next)) {
    res.render('watchlist', { title: 'Watchlists' });
  } else {
    res.send(401, "Not Authorized");
  }
});

router.post('/', (req, res, next) =>{
  //creates new watchlist 
});

router.post('/', (req, res, next) =>{
  //adds stock to a watchlist 
});

router.delete('/', (req, res, next) =>{
  //removes stock from a watchlist 
});

router.delete('/', (req, res, next) =>{
  //deletes watchlist 
});

router.get('/', (req, res, next) =>{
  //displays chosen watchlist 
});

module.exports = router;
