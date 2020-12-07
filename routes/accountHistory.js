var express = require('express');
var router = express.Router();
var authenticator = require('../public/js/authenticator.js');
var model = require('../public/js/dynamics.js'); 

/* GET account history page. */
router.get('/', function(req, res, next) {
  history = {
    logs: model.getCurrUser().logsToString()
  }
  console.log("about to auth");
  if (authenticator.auth(req, next)) {
    res.render('accountHistory', { title: 'My Account', accHis: history });
  } else {
    res.send(401, "Not Authorized");
  }
});

router.patch('/filterByAction', (req, res, next) =>{
  //gets filtered list of account history by action/type
  model.getCurrUser().filterByEvent();
  history = {
    logs: model.getCurrUser().logsToString()
  }
  res.status(201);
  res.send("Patched");
});

router.patch('/clearFilters', (req, res, next) =>{
  //gets unfiltered list of account history 
  model.getCurrUser().clearFilters();
  history = {
    logs: model.getCurrUser().logsToString()
  }
  res.status(201);
  res.send("Patched");
});

module.exports = router;
