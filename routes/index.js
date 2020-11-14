var express = require('express');
var router = express.Router();
const model = require('../public/js/dynamics.js');

/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Login' });
});

router.post('/', (req, res, next) =>{
  console.log("check");
  res.status(200);
  //check auth, prompt login again if invalid
  if (model.verifyCredentials(req.body.username, req.body.password)) {
    res.redirect("./portfolio");
  } else {
    res.redirect('./');
  }
});

module.exports = router;
