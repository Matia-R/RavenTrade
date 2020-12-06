var express = require('express');
var router = express.Router();
var model = require('../public/js/dynamics.js');
var authenticator = require('../public/js/authenticator.js');

alerts = {
  allAlerts: model.getCurrUser().alerts
}

/* GET alerts page. */
router.get('/', function(req, res, next) {
  console.log("about to auth");
  if (authenticator.auth(req, next)) {
    res.render('alerts', { title: 'My Alerts', alertInfo: alerts });
  } else {
    res.send(401, "Not Authorized");
  }
});

router.patch('/', (req, res, next) =>{
  //edits alerts description 
});

router.patch('/', (req, res, next) =>{
  //edits alerts state 
});

router.post('/', (req, res, next) =>{
  //creates alert 
});

router.delete('/', (req, res, next) =>{
  //deletes alert 
});

module.exports = router;
