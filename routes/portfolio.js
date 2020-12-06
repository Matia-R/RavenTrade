var express = require('express');
var router = express.Router();
var model = require('../public/js/dynamics.js');
var authenticator = require('../public/js/authenticator.js');

/* GET home/portfolio page. */
router.get('/', function(req, res, next) {
  console.log("about to auth");
  user = {
    portfolioValue: model.getCurrUser().portfolioValue,
    portfolioBalance: model.getCurrUser().balance,
    portfolio: model.getCurrUser().userStocks
  }
  if (authenticator.auth(req, next)) {
    res.render('portfolio', { title: 'Portfolio', userInfo: user });
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

router.patch('/deposit', (req, res, next) => {
  model.depositBtn();
  user = {
    portfolioValue: model.getCurrUser().portfolioValue,
    portfolioBalance: model.getCurrUser().balance,
    portfolio: model.getCurrUser().userStocks
  }
  res.status(201);
  res.send("Patched");
});

router.patch('/withdraw', (req, res, next) => {
  model.withdrawBtn();
  user = {
    portfolioValue: model.getCurrUser().portfolioValue,
    portfolioBalance: model.getCurrUser().balance,
    portfolio: model.getCurrUser().userStocks
  }
  res.status(201);
  res.send("Patched");
  //res.redirect("./portfolio");
});




module.exports = router;
