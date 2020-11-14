var express = require('express');
var router = express.Router();
const model = require('../public/js/dynamics.js');

/* GET create-account page. */
router.get('/', function(req, res, next) {
  res.render('create-account', { title: 'Create Account' });
});

router.post('/', (req, res, next) =>{
  console.log("check");
  res.status(200);
  model.createAccount(req.body.username, req.body.password);
  res.redirect("./");
});

module.exports = router;
