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
  if (model.isValidSymbol(req.body.stockSymbol)) {
    var symbol = req.body.stockSymbol;
    var threshold = req.body.threshold;
    var numShares = req.body.numShares;
    console.log('Here');
    var typeOrderString = req.body.buySell;
    console.log('Got Past: '+typeOrderString);
    var expiry = false;
    var stock = model.findStock(String(symbol));
    var price = stock.price;
    var typeorder = true;
    if (typeOrderString == 'sell') {
      typeorder = false;
    }
    if (Number(price) <= Number(threshold)) {
      var checkValid = model.getCurrUser().makeOrder(symbol, typeorder, price, numShares, expiry, stock);
      if (checkValid === 0) {
        model.getCurrUser().orderCompleted(model.getCurrUser().orders[0]);
        console.log("Order completed!");
        if (typeorder) {
          model.getCurrUser().logEventBS(model.getCurrDate(), 0, numShares, price, symbol);
        }
        else {
          model.getCurrUser().logEventBS(model.getCurrDate(), 1, numShares, price, symbol);
        }
        res.redirect("../portfolio");
      }
      else {
        console.log("Insufficient Funds!");
        res.redirect('./');
      }
    }
    else {
      console.log("Price is more then maximum willing to pay!");
      res.redirect('./');
    }
  } else {
    res.redirect('./');
  }
});

module.exports = router;
