var express = require('express');
var router = express.Router();
var pizzaJson = require('./pizza.json');

router.get('/',function(req,res,next){
   res.jsonp(pizzaJson); 
});

module.exports = router;