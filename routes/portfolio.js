var express = require('express');
var router = express.Router();
var model = require('../public/js/dynamics.js');
var authenticator = require('../public/js/authenticator.js');

//document.getElementById('withdraw-btn').addEventListener('click', fetch('../withdraw', { method: 'PATCH'}) );

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
  model.getCurrUser().deposit(100);
  model.getCurrUser().logEventDW(model.getCurrDate(), 3, 100);
  user = {
    portfolioValue: model.getCurrUser().portfolioValue,
    portfolioBalance: model.getCurrUser().balance,
    portfolio: model.getCurrUser().userStocks
  }
  res.status(201);
  res.send("Patched");
});

router.patch('/withdraw', (req, res, next) => {
  model.getCurrUser().withdraw(100);
  model.getCurrUser().logEventDW(model.getCurrDate(), 2, 100);
  user = {
    portfolioValue: model.getCurrUser().portfolioValue,
    portfolioBalance: model.getCurrUser().balance,
    portfolio: model.getCurrUser().userStocks
  }
  res.status(201);
  res.send("Patched");
});




module.exports = router;
