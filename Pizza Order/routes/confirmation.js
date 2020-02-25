const fs = require('fs');
const price = require('./PriceCalculator');
var express = require('express');
var router = express.Router();
var pizzaJson = require('./pizza.json');
var Order = require('../models/Order');
var Orders = require('../models/Orders');
let orderID = 100000;
router.get('/', function (req, res, next) {
    res.render('confirmation', {
        title: "Assignment 1"
    });
});
router.post('/', function (req, res) {
    var orderJSON = req.body;
    var order = new Order(orderJSON);
    orderID++;

    price.setJSONData(pizzaJson);
    price.setOrderData(orderJSON);
    return res.json({
        orderID: orderID,
        order: order,
        price: price.getTotal(),
        tax: price.getTax()
    });
});

module.exports = router;