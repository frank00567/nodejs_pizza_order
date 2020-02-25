var express = require('express');
const price = require('./PriceCalculator');
var router = express.Router();
var Orders = require('../models/Orders');
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: "Assignment 2"
    });
});

router.get('/list', function (req, res, next) {
    res.render('list', {
        title: "Assignment 2"
    });
});

router.get('/api/orders', function (req, res) {
    Orders.find({}, function (err, orders) {
        res.json(orders);
    }).limit(100);
});

router.post('/api/orders', function (req, res, next) {
    console.log(req.body.search);
    Orders.find({}, function (err, orders) {
        console.log(orders);
        res.json(orders);
    }).or([{
        'order[address]': {
            $regex: req.body.search
        }
    }, {
        'order[phone]': {
            $regex: req.body.search
        }
    }]);
});

router.post('/api/orders/save', function (req, res) {
    console.log(req.body);
    var orders = new Orders(req.body);
    orders.save((err) => {
        res.sendStatus(200);
    });
});
module.exports = router;