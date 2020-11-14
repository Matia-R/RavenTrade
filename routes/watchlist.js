var express = require('express');
var router = express.Router();

/* GET watchlist page. */
router.get('/', function(req, res, next) {
  res.render('watchlist', { title: 'Watchlists' });
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
