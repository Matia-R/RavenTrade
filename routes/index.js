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
  req.session.loggedin = false;
  //check auth, prompt login again if invalid
  if (model.verifyCredentials(req.body.username, req.body.password)) {
    console.log("check2");
    req.session.loggedin = true;
    console.log("check3");
    req.session.username = req.body.username;
    console.log("check4");
    //res.status(200).send("Logged in");
    console.log("check5");
    res.redirect("./portfolio");
    console.log("check6");
  } else {
    //res.status(401).send("Not authorized. Invalid password.");
    res.redirect('./');
  }
});

module.exports = router;
