var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var order = new Schema({
    topping: String,
    size: String,
    crust: String,
    quantity: String,
    firstname: String,
    lastname: String,
    address: String,
    comment: String
});

var orderScheam = new Schema({
    orderID: {
        type: 'string'
    },
    'order[size]': {
        type: 'string'
    },
    'order[crust]': {
        type: 'string'
    },
    'order[topping][]': {
        type: 'array',
        items: [Object]
    },
    'order[quantity]': {
        type: 'string'
    },
    'order[firstname]': {
        type: 'string'
    },
    'order[lastname]': {
        type: 'string'
    },
    'order[address]': {
        type: 'string'
    },
    'order[phone]': {
        type: 'string'
    },
    'order[comment]': {
        type: 'string'
    },
    price: {
        type: 'string'
    },
    tax: {
        type: 'string'
    }
});
module.exports = mongoose.model('Orders', orderScheam);