var express = require('express');
var router = express.Router();

/* GET alerts page. */
router.get('/', function(req, res, next) {
  res.render('alerts', { title: 'My Alerts' });
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
