var express = require('express');
var router = express.Router();

/* GET account history page. */
router.get('/', function(req, res, next) {
  res.render('accountHistory', { title: 'My Account' });
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
