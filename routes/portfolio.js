var express = require('express');
var router = express.Router();

/* GET home/portfolio page. */
router.get('/', function(req, res, next) {
  res.render('portfolio', { title: 'Portfolio' });
});

router.post('/', (req, res, next) =>{
  //redirects to watchlist page
});

router.post('/', (req, res, next) =>{
  //redirects to stocks page
});

router.post('/', (req, res, next) =>{
  //redirects to orders page
});

router.patch('/', (req, res, next) =>{
  //deposits funds
});

router.patch('/', (req, res, next) =>{
  //withdraws funds
});




module.exports = router;
