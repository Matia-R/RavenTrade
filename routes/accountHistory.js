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

router.get('/', (req, res, next) =>{
  //gets filtered list of account history by date
});

router.get('/', (req, res, next) =>{
  //gets filtered list of account history by action/type
});

router.get('/', (req, res, next) =>{
  //gets list with filters cleared
});

module.exports = router;
