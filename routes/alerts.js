var express = require('express');
var router = express.Router();
var model = require('../public/js/dynamics.js');
var authenticator = require('../public/js/authenticator.js');

/* GET alerts page. */
router.get('/', function(req, res, next) {
  alerts = {
    allAlerts: model.getCurrUser().alerts
  }
  console.log("about to auth");
  if (authenticator.auth(req, next)) {
    res.render('alerts', { title: 'My Alerts', alertInfo: alerts });
  } else {
    res.send(401, "Not Authorized");
  }
});

router.post('/create', (req, res, next) =>{
  //creates alert 
  res.status(200);
  if (model.isValidSymbol(req.body.alertSymbol)) {
    var symbol = req.body.alertSymbol;
    var activeString = req.body.actinact;
    var alertVal = req.body.alertValue;
    var increaseString = req.body.incdec;
    var active = true;
    if (activeString === "inactive") {
      active = false;
    }
    var increase = true;
    if (increaseString === "decrease") {
      increase = false;
    }
    model.getCurrUser().createAlert(active, symbol, alertVal, increase);
    res.redirect("../alerts");
  }
  else {
    res.redirect('./');
  }
});

router.delete('/delete-all', (req, res, next) =>{
  //deletes alert 
  res.status(202);
  model.getCurrUser().deleteAlerts();
  res.redirect("../alerts");
});

module.exports = router;
