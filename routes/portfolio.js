var express = require('express');
var router = express.Router();
var authenticator = require('../public/js/authenticator.js');

/* GET home/portfolio page. */
router.get('/', function(req, res, next) {
  console.log("about to auth");
  if (authenticator.auth(req, next)) {
    res.render('portfolio', { title: 'Portfolio' });
  } else {
    res.send(401, "Not Authorized");
  }
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
